const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const https = require('https');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const getGoogleUserInfo = (accessToken) => {
  return new Promise((resolve, reject) => {
    https.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
      (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      }
    ).on('error', (err) => {
      reject(err);
    });
  });
};

// ── DB HEALTH-CHECK MIDDLEWARE ─────────────────────────────
// Runs before EVERY route in this file. If Mongo is not
// connected (readyState !== 1), return 503 instantly instead
// of buffering for 10 seconds and timing out.
router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      error: 'Database connection lost. Please check backend logs.'
    });
  }
  next();
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
  res.status(statusCode).json({ success: true, token });
};

router.post('/signup', async (req, res) => {
  console.log('--- SIGNUP REQUEST START ---');
  console.log(`Global mongoose readyState: ${mongoose.connection.readyState}`);
  console.log(`Global mongoose DB name: ${mongoose.connection.name}`);
  console.log(`User model db readyState: ${User.db.readyState}`);
  console.log(`User model db name: ${User.db.name}`);
  
  try {
    const { fullName, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }
    user = await User.create({ fullName, email, password });
    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error('SIGNUP ERROR:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, error: 'Token is required' });
    }

    let email, name;

    // Check if the token is a JWT (ID Token) or an Access Token
    if (token.includes('.')) {
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.name;
    } else {
      const userInfo = await getGoogleUserInfo(token);
      if (!userInfo || !userInfo.email) {
        return res.status(400).json({ success: false, error: 'Invalid Google access token' });
      }
      email = userInfo.email;
      name = userInfo.name || userInfo.given_name || userInfo.email.split('@')[0];
    }

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = crypto.randomBytes(32).toString('hex');
      user = await User.create({
        fullName: name,
        email: email,
        password: randomPassword
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error('GOOGLE AUTH ERROR:', error);
    res.status(500).json({ success: false, error: 'Google authentication failed' });
  }
});

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const message = {
    from: `${process.env.EMAIL_USER}`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  await transporter.sendMail(message);
};

router.post('/forgotpassword', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ success: false, error: 'There is no user with that email' });
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
    
    try {
      await sendEmail({
        email: user.email,
        subject: 'Password reset token',
        message
      });
      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ success: false, error: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/resetpassword/:token', async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or expired token' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/me', async (req, res) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'No user found with this id' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }
});

router.put('/profile', async (req, res) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'No user found with this id' });
    }
    
    const { fullName, profilePhoto } = req.body;
    if (fullName !== undefined) user.fullName = fullName;
    if (profilePhoto !== undefined) user.profilePhoto = profilePhoto;
    
    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('PROFILE UPDATE ERROR:', error);
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

module.exports = router;
