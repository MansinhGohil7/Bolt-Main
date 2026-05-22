import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signup');
        return;
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        if (data.success) {
          setUser(data.data);
          setFullName(data.data.fullName || '');
          setProfilePhoto(data.data.profilePhoto || '');
        } else {
          localStorage.removeItem('token');
          navigate('/signup');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    
    fetchUser();
  }, [navigate]);

  // Framer Motion Animation Configs
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e] text-[#e5e2e1] relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[8000ms]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[10000ms]"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <span className="text-sm font-medium tracking-widest text-[#8c90a1] uppercase">Initializing Environment...</span>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signup');
    window.location.reload(); // To update the navbar
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setSaveStatus({ type: 'error', message: 'Image size should be less than 2MB' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result);
      setSaveStatus({ type: '', message: '' });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = async () => {
    setSaveStatus({ type: 'loading', message: 'Saving changes...' });
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ fullName, profilePhoto })
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.data);
        setSaveStatus({ type: 'success', message: 'Profile updated successfully!' });
        setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000);
      } else {
        setSaveStatus({ type: 'error', message: data.error || 'Failed to save changes.' });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveStatus({ type: 'error', message: 'Network error. Please try again.' });
    }
  };

  return (
    <>
      <motion.main 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="flex-grow pt-36 pb-32 min-h-screen relative overflow-hidden bg-transparent text-[#e5e2e1]"
      >
        {/* Pulsing Ambient Glows for Live Depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[130px] pointer-events-none animate-pulse duration-[9000ms] z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[160px] pointer-events-none animate-pulse duration-[11000ms] z-0" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
          <motion.div 
            variants={fadeInUp}
            className="mb-12"
          >
            <h1 className="text-white text-4xl md:text-[64px] font-semibold leading-[1.1] tracking-[-0.04em] mb-4">
              Welcome back, <span className="text-primary font-bold">{user.fullName || user.email.split('@')[0]}</span>
            </h1>
            <p className="text-[#c2c6d8] text-[18px] max-w-2xl leading-relaxed">
              Manage your engineering environment, security protocols, and cloud toolset configurations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Personal Information */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.005, border: '1px solid rgba(176, 198, 255, 0.25)', boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="lg:col-span-2 glass-card rounded-[24px] p-8 md:p-10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
              <h2 className="text-[#8c90a1] text-xs uppercase tracking-widest font-semibold mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col justify-end">
                  <label className="text-[#8c90a1] text-xs uppercase tracking-widest font-medium block mb-2">Full Name</label>
                  <div className="border-b border-outline-variant/30 pb-3 text-white text-xl md:text-2xl font-medium tracking-tight">
                    {user.fullName || user.email.split('@')[0]}
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <label className="text-[#8c90a1] text-xs uppercase tracking-widest font-medium block mb-2">Email</label>
                  <div className="border-b border-outline-variant/30 pb-3 text-white text-xl md:text-2xl font-medium tracking-tight break-all">
                    {user.email}
                  </div>
                </div>
                 <div className="flex flex-col justify-end md:col-span-2">
                  <label className="text-[#8c90a1] text-xs uppercase tracking-widest font-medium block mb-2">Account ID</label>
                  <div className="border-b border-outline-variant/30 pb-3 text-white text-lg md:text-xl font-medium font-mono tracking-wider break-all">
                    {user._id.toUpperCase()}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Profile Settings */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.005, border: '1px solid rgba(176, 198, 255, 0.25)', boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="lg:col-span-1 glass-card rounded-[24px] p-8 md:p-10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
              <h2 className="text-[#8c90a1] text-xs uppercase tracking-widest font-semibold mb-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Profile Settings
              </h2>
              
              <div className="mb-6">
                <label className="text-[#8c90a1] text-xs uppercase tracking-widest font-medium block mb-2">Change Username</label>
                <div className="saas-input p-3 border-b border-outline-variant/30 focus-within:border-primary transition-all duration-300">
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-transparent border-none outline-none font-body-md text-body-md text-white placeholder:text-on-surface-variant/50 focus:ring-0 p-0"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="text-[#8c90a1] text-xs uppercase tracking-widest font-medium block mb-2">Update Profile Photo</label>
                <div className="flex items-center gap-4">
                  {profilePhoto ? (
                    <img 
                      src={profilePhoto} 
                      alt="Profile" 
                      className="w-12 h-12 rounded-xl object-cover border border-[#2E2E2E]"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-black/40 border border-outline-variant/30 rounded-xl flex items-center justify-center text-[#8c90a1]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                  )}
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="bg-transparent border border-outline-variant/50 text-white px-4 py-2 rounded-lg text-sm hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    Upload New
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-8 pb-8 border-b border-outline-variant/30">
                <div>
                  <div className="text-white text-sm font-medium">System Notifications</div>
                  <div className="text-[#8c90a1] text-xs">Enable alerts & updates</div>
                </div>
                <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer transition-colors duration-300">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-[#002d6f] rounded-full"></div>
                </div>
              </div>

              {saveStatus.message && (
                <div className={`mb-6 text-xs font-medium p-3 rounded-lg border transition-all duration-300 ${
                  saveStatus.type === 'error' ? 'bg-error/15 border-error/30 text-error' : 
                  saveStatus.type === 'success' ? 'bg-primary/15 border-primary/30 text-primary' : 'text-[#8c90a1] border-outline-variant/30 bg-black/20'
                }`}>
                  {saveStatus.message}
                </div>
              )}

              <button 
                onClick={handleSaveChanges}
                className="w-full bg-primary/10 text-primary border border-primary/30 py-4 rounded-[16px] font-label-md text-label-md uppercase tracking-widest hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(176,198,255,0.3)] transition-all text-center backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.15)] cursor-pointer"
              >
                Save Changes
              </button>

              <div className="mt-8 pt-6 border-t border-outline-variant/30 flex justify-center">
                <button 
                  onClick={handleLogout} 
                  className="text-[#ffb4ab] hover:text-[#ff897a] text-sm font-medium flex items-center gap-2 hover:underline transition-colors duration-300 cursor-pointer"
                >
                  Sign Out 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
};

export default Dashboard;
