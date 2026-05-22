import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import Footer from '../components/Footer';
import { API_URL } from '../config';

const Signup = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(() => {
    const query = new URLSearchParams(location.search);
    return query.get('mode') === 'login';
  });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setIsLogin(query.get('mode') === 'login');
    setError('');
    setSuccess('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }, [location]);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!isLogin) {
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Create password and Confirm password must match.');
        return;
      }
      
      try {
        const response = await fetch(`${API_URL}/api/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password
          })
        });
        const data = await response.json();
        
        if (data.success) {
          setSuccess('Account created successfully! Booting workspace...');
          localStorage.setItem('token', data.token);
          setTimeout(() => navigate('/'), 1500);
        } else {
          setError(data.error || 'Failed to sign up.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    } else {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields.');
        return;
      }
      
      try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
        const data = await response.json();
        
        if (data.success) {
          setSuccess('Authentication successful! Connecting node...');
          localStorage.setItem('token', data.token);
          setTimeout(() => navigate('/'), 1500);
        } else {
          setError(data.error || 'Invalid credentials.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential })
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Authentication successful! Connecting node...');
        localStorage.setItem('token', data.token);
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(data.error || 'Google auth failed.');
      }
    } catch (err) {
      setError('Google authentication failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed.');
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleGoogleSuccess({ credential: tokenResponse.access_token });
    },
    onError: handleGoogleError
  });

  return (
    <>
      <main className="flex-grow pt-32 pb-32 min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
      </div>
      
      <div className="max-w-md w-full mx-auto px-margin-mobile relative z-10">
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] p-10 md:p-12 rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <motion.div layout variants={itemVariants} className="text-center mb-10">
            <h1 className="font-display-lg text-display-lg text-on-surface mb-3 text-[32px] md:text-[40px]">
              {isLogin ? 'Log in' : 'Sign up'}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Join the Bolt ecosystem in less than 30 seconds.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  key="error-msg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-error/15 border border-error/30 text-error px-4 py-3 rounded text-caption font-label-md overflow-hidden"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  key="success-msg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-primary/15 border border-primary/30 text-primary px-4 py-3 rounded text-caption font-label-md overflow-hidden"
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {!isLogin && (
                <motion.div 
                  key="fullName-field"
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-2 overflow-hidden"
                >
                  <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant text-xs" htmlFor="fullName">Full Name</label>
                  <div className="saas-input p-3 border-b border-outline-variant focus-within:border-primary transition-colors">
                    <input 
                      className="w-full bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 p-0" 
                      id="fullName" 
                      placeholder="Jane Doe" 
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div layout variants={itemVariants} className="flex flex-col gap-2">
              <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant text-xs" htmlFor="email">Email</label>
              <div className="saas-input p-3 border-b border-outline-variant focus-within:border-primary transition-colors">
                <input 
                  className="w-full bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 p-0" 
                  id="email" 
                  placeholder="jane@bolttools.com" 
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </motion.div>
            
            <motion.div layout variants={itemVariants} className="flex flex-col gap-2">
              <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant text-xs" htmlFor="password">
                {isLogin ? 'Password' : 'Create password'}
              </label>
              <div className="saas-input p-3 border-b border-outline-variant focus-within:border-primary transition-colors flex items-center justify-between gap-3">
                <input 
                  className="flex-grow bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 p-0" 
                  id="password" 
                  placeholder="••••••••" 
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none p-1 cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>

            <AnimatePresence initial={false}>
              {!isLogin && (
                <motion.div 
                  key="confirmPassword-field"
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-2 overflow-hidden"
                >
                  <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant text-xs" htmlFor="confirmPassword">Confirm password</label>
                  <div className="saas-input p-3 border-b border-outline-variant focus-within:border-primary transition-colors flex items-center justify-between gap-3">
                    <input 
                      className="flex-grow bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 p-0" 
                      id="confirmPassword" 
                      placeholder="••••••••" 
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none p-1 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div layout variants={itemVariants} className="mt-6 flex flex-col gap-3">
              <button 
                type="submit"
                className="w-full bg-primary/10 text-primary border border-primary/30 py-4 rounded-[16px] font-label-md text-label-md uppercase tracking-widest hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(176,198,255,0.3)] transition-all text-center backdrop-blur-sm"
              >
                {isLogin ? 'Log in' : 'Signup'}
              </button>
              
              <AnimatePresence>
                {isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-center"
                  >
                    <Link to="/forgot-password" className="font-caption text-caption text-primary hover:text-primary-fixed transition-colors underline underline-offset-4">
                      Forgot your password?
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.div layout variants={itemVariants} className="relative flex items-center py-4">
              <div className="flex-grow border-t border-outline-variant"></div>
              <span className="flex-shrink-0 mx-4 font-caption text-caption text-on-surface-variant uppercase tracking-widest">or integrate</span>
              <div className="flex-grow border-t border-outline-variant"></div>
            </motion.div>

            <motion.div layout variants={itemVariants} className="flex flex-col gap-4 items-center justify-center w-full">
              <button 
                type="button"
                onClick={() => loginWithGoogle()}
                className="w-full bg-surface-container/20 text-on-surface border border-outline-variant py-4 rounded-[16px] font-label-md text-label-md uppercase tracking-widest hover:bg-surface-container/60 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(176,198,255,0.1)] transition-all text-center backdrop-blur-sm flex items-center justify-center gap-3 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </motion.div>
          </form>
          
          <motion.div layout variants={itemVariants} className="mt-8 text-center">
            <p className="font-caption text-caption text-on-surface-variant">
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <button 
                    onClick={toggleMode} 
                    className="text-primary hover:text-primary-fixed transition-colors underline underline-offset-4 font-label-md bg-transparent border-none p-0 cursor-pointer"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Already have account?{' '}
                  <button 
                    onClick={toggleMode} 
                    className="text-primary hover:text-primary-fixed transition-colors underline underline-offset-4 font-label-md bg-transparent border-none p-0 cursor-pointer"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
    <Footer />
    </>
  );
};

export default Signup;
