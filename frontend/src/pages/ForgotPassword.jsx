import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide an email.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Password reset link sent to your email.');
        setError('');
      } else {
        setError(data.error || 'Failed to send reset email.');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

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
              Forgot Password
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Enter your email to receive a password reset link.
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

            <motion.div layout variants={itemVariants} className="flex flex-col gap-2">
              <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant text-xs" htmlFor="email">Email</label>
              <div className="saas-input p-3 border-b border-outline-variant focus-within:border-primary transition-colors">
                <input 
                  className="w-full bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 p-0" 
                  id="email" 
                  placeholder="jane@bolttools.com" 
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); setSuccess(''); }}
                />
              </div>
            </motion.div>

            <motion.div layout variants={itemVariants} className="mt-6">
              <button 
                type="submit"
                className="w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded uppercase tracking-widest hover:brightness-110 hover:shadow-[0_0_20px_rgba(176,198,255,0.3)] transition-all"
              >
                Send Reset Link
              </button>
            </motion.div>
          </form>
          
          <motion.div layout variants={itemVariants} className="mt-8 text-center">
            <p className="font-caption text-caption text-on-surface-variant">
              Remember your password?{' '}
              <Link 
                to="/signup" 
                className="text-primary hover:text-primary-fixed transition-colors underline underline-offset-4 font-label-md bg-transparent border-none p-0 cursor-pointer"
              >
                Log in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
    <Footer />
    </>
  );
};

export default ForgotPassword;
