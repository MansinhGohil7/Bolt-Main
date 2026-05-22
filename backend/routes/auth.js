const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const admin = require('firebase-admin');
const { OAuth2Client } = require('google-auth-library');
const https = require('https');
const db = require('../config/firebase');

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

const sendTokenResponse = (userId, statusCode, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
  res.status(statusCode).json({ success: true, token });
};

router.post('/signup', async (req, res) => {
  console.log('--- SIGNUP REQUEST START ---');
  try {
    const { fullName, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }
    const emailLower = email.toLowerCase();
    
    // Check if user exists in Firestore
    const userSnap = await db.collection("users").where("email", "==", emailLower).limit(1).get();
    if (!userSnap.empty) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }
    
    // Hash password manually since Mongoose hooks are gone
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new document reference (auto-ID)
    const userRef = db.collection("users").doc();
    await userRef.set({
      fullName: fullName || '',
      email: emailLower,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    });
    
    sendTokenResponse(userRef.id, 201, res);
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
    const emailLower = email.toLowerCase();
    
    // Fetch user by email
    const userSnap = await db.collection("users").where("email", "==", emailLower).limit(1).get();
    if (userSnap.empty) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    const userDoc = userSnap.docs[0];
    const userData = userDoc.data();
    
    // Compare password
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    sendTokenResponse(userDoc.id, 200, res);
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

    const emailLower = email.toLowerCase();
    
    // Check if user exists in Firestore
    const userSnap = await db.collection("users").where("email", "==", emailLower).limit(1).get();
    
    let userId;
    if (userSnap.empty) {
      // Create user
      const randomPassword = crypto.randomBytes(32).toString('hex');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);
      
      const userRef = db.collection("users").doc();
      await userRef.set({
        fullName: name || '',
        email: emailLower,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      });
      userId = userRef.id;
    } else {
      userId = userSnap.docs[0].id;
    }

    sendTokenResponse(userId, 200, res);
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
    const { email } = req.body;
    const emailLower = email.toLowerCase();
    
    const userSnap = await db.collection("users").where("email", "==", emailLower).limit(1).get();
    if (userSnap.empty) {
      return res.status(404).json({ success: false, error: 'There is no user with that email' });
    }
    
    const userDoc = userSnap.docs[0];
    
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 Minutes
    
    // Save to document
    await db.collection("users").doc(userDoc.id).update({
      resetPasswordToken,
      resetPasswordExpire
    });
    
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please open this link to reset it: \n\n ${resetUrl}`;
    
    try {
      await sendEmail({
        email: emailLower,
        subject: 'Password reset token',
        message
      });
      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      console.error(err);
      // Clear token fields on failure
      await db.collection("users").doc(userDoc.id).update({
        resetPasswordToken: admin.firestore.FieldValue.delete(),
        resetPasswordExpire: admin.firestore.FieldValue.delete()
      });
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

    // Query Firestore for matching token and non-expired window
    const userSnap = await db.collection("users")
      .where("resetPasswordToken", "==", resetPasswordToken)
      .where("resetPasswordExpire", ">", Date.now())
      .limit(1)
      .get();

    if (userSnap.empty) {
      return res.status(400).json({ success: false, error: 'Invalid or expired token' });
    }

    const userDoc = userSnap.docs[0];
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Update document and clear token fields
    await db.collection("users").doc(userDoc.id).update({
      password: hashedPassword,
      resetPasswordToken: admin.firestore.FieldValue.delete(),
      resetPasswordExpire: admin.firestore.FieldValue.delete()
    });

    sendTokenResponse(userDoc.id, 200, res);
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
    
    // Fetch from Firestore
    const userDoc = await db.collection("users").doc(decoded.id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ success: false, error: 'No user found with this id' });
    }
    
    const userData = userDoc.data();
    // Exclude password from response
    delete userData.password;
    
    res.status(200).json({ success: true, data: { id: userDoc.id, ...userData } });
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
    const userDoc = await db.collection("users").doc(decoded.id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ success: false, error: 'No user found with this id' });
    }
    
    const { fullName, profilePhoto } = req.body;
    const updateData = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (profilePhoto !== undefined) updateData.profilePhoto = profilePhoto;
    
    await db.collection("users").doc(decoded.id).update(updateData);
    
    const updatedUserDoc = await db.collection("users").doc(decoded.id).get();
    const updatedUserData = updatedUserDoc.data();
    delete updatedUserData.password;
    
    res.status(200).json({ success: true, data: { id: decoded.id, ...updatedUserData } });
  } catch (error) {
    console.error('PROFILE UPDATE ERROR:', error);
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

module.exports = router;
