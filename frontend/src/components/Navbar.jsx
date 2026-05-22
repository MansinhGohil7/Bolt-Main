import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
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
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user for navbar:', error);
      }
    };
    
    fetchUser();
  }, [location.pathname]);

  // Hide the global Navbar on the dedicated Admin layout
  if (location.pathname === '/admin') {
    return null;
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full z-50 glass-nav h-20 transition-all duration-300 ease-in-out"
    >
      <div className="max-w-container-max mx-auto px-margin-desktop flex justify-between items-center h-full">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Bolt Tools Logo" className="w-8 h-8 object-contain rounded" />
            <span className="font-headline-md text-headline-md font-bold text-on-background dark:text-on-background tracking-tight tracking-[0.1em] font-extrabold">Bolt Tools</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-sm font-semibold tracking-wide transition-all duration-300 relative pb-1.5 ${
                isActive 
                  ? "text-white drop-shadow-[0_0_10px_rgba(176,198,255,0.75)] after:content-[''] after:absolute after:bottom-0 after:left-[10%] after:right-[10%] after:h-[2.5px] after:rounded-full after:bg-gradient-to-r after:from-primary after:to-primary-container after:shadow-[0_0_12px_rgba(176,198,255,0.95)]" 
                  : "text-[#8c90a1] hover:text-white"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/bolt-carriers" 
            className={({ isActive }) => 
              `text-sm font-semibold tracking-wide transition-all duration-300 relative pb-1.5 ${
                isActive 
                  ? "text-white drop-shadow-[0_0_10px_rgba(176,198,255,0.75)] after:content-[''] after:absolute after:bottom-0 after:left-[10%] after:right-[10%] after:h-[2.5px] after:rounded-full after:bg-gradient-to-r after:from-primary after:to-primary-container after:shadow-[0_0_12px_rgba(176,198,255,0.95)]" 
                  : "text-[#8c90a1] hover:text-white"
              }`
            }
          >
            BoltCarriers
          </NavLink>
          <NavLink 
            to="/our-tools" 
            className={({ isActive }) => 
              `text-sm font-semibold tracking-wide transition-all duration-300 relative pb-1.5 ${
                isActive 
                  ? "text-white drop-shadow-[0_0_10px_rgba(176,198,255,0.75)] after:content-[''] after:absolute after:bottom-0 after:left-[10%] after:right-[10%] after:h-[2.5px] after:rounded-full after:bg-gradient-to-r after:from-primary after:to-primary-container after:shadow-[0_0_12px_rgba(176,198,255,0.95)]" 
                  : "text-[#8c90a1] hover:text-white"
              }`
            }
          >
            Our Tools
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `text-sm font-semibold tracking-wide transition-all duration-300 relative pb-1.5 ${
                isActive 
                  ? "text-white drop-shadow-[0_0_10px_rgba(176,198,255,0.75)] after:content-[''] after:absolute after:bottom-0 after:left-[10%] after:right-[10%] after:h-[2.5px] after:rounded-full after:bg-gradient-to-r after:from-primary after:to-primary-container after:shadow-[0_0_12px_rgba(176,198,255,0.95)]" 
                  : "text-[#8c90a1] hover:text-white"
              }`
            }
          >
            Contact
          </NavLink>
          {user && user.email !== 'BoltMain7@bolt.in' && (
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `text-sm font-semibold tracking-wide transition-all duration-300 relative pb-1.5 ${
                  isActive 
                    ? "text-white drop-shadow-[0_0_10px_rgba(176,198,255,0.75)] after:content-[''] after:absolute after:bottom-0 after:left-[10%] after:right-[10%] after:h-[2.5px] after:rounded-full after:bg-gradient-to-r after:from-primary after:to-primary-container after:shadow-[0_0_12px_rgba(176,198,255,0.95)]" 
                    : "text-[#8c90a1] hover:text-white"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
          {user && user.email === 'BoltMain7@bolt.in' && (
            <NavLink 
              to="/admin" 
              className={({ isActive }) => 
                `text-sm font-semibold tracking-wide transition-all duration-300 relative pb-1.5 ${
                  isActive 
                    ? "text-white drop-shadow-[0_0_10px_rgba(176,198,255,0.75)] after:content-[''] after:absolute after:bottom-0 after:left-[10%] after:right-[10%] after:h-[2.5px] after:rounded-full after:bg-gradient-to-r after:from-primary after:to-primary-container after:shadow-[0_0_12px_rgba(176,198,255,0.95)]" 
                    : "text-[#8c90a1] hover:text-white"
                }`
              }
            >
              Admin Panel
            </NavLink>
          )}
        </div>
        
        <div className="hidden md:flex items-center">
          {user ? (
            <div className="flex items-center gap-6">
              {/* Notification Bell */}
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-on-surface-variant hover:text-primary transition-colors relative cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border border-surface"></span>
              </button>
              
              {/* Vertical Divider */}
              <div className="h-6 w-px bg-outline-variant"></div>

              {/* User Profile Block */}
              <div className="flex items-center gap-3 cursor-pointer group relative" onClick={() => navigate(user.email === 'BoltMain7@bolt.in' ? '/admin' : '/dashboard')}>
                <div className="text-right hidden lg:block">
                  <div className="font-label-md text-label-md text-on-surface">{user.fullName || user.email.split('@')[0]}</div>
                  <div className={`font-caption text-caption ${user.email === 'BoltMain7@bolt.in' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                    {user.email === 'BoltMain7@bolt.in' ? 'Administrator' : 'User'}
                  </div>
                </div>
                <div className="w-8 h-8 rounded bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden">
                  {user.profilePhoto ? (
                    <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/signup?mode=login">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary/10 text-primary border border-primary/30 px-6 py-3 font-label-md text-label-md rounded-[16px] hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(176,198,255,0.3)] transition-all text-center backdrop-blur-sm cursor-pointer"
                >
                  Login
                </motion.div>
              </Link>
              <Link to="/signup?mode=signup">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary/10 text-primary border border-primary/30 px-6 py-3 font-label-md text-label-md rounded-[16px] hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(176,198,255,0.3)] transition-all text-center backdrop-blur-sm cursor-pointer"
                >
                  Sign Up
                </motion.div>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-20 left-0 w-full glass-nav border-t border-outline-variant bg-surface/95 backdrop-blur-xl shadow-lg overflow-hidden z-40"
          >
            <div className="flex flex-col px-margin-mobile py-6 gap-3">
              <NavLink 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={({ isActive }) => 
                  `px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 border ${
                    isActive 
                      ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(176,198,255,0.1)]" 
                      : "text-[#8c90a1] hover:text-white hover:bg-white/5 border-transparent"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/bolt-carriers" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={({ isActive }) => 
                  `px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 border ${
                    isActive 
                      ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(176,198,255,0.1)]" 
                      : "text-[#8c90a1] hover:text-white hover:bg-white/5 border-transparent"
                  }`
                }
              >
                BoltCarriers
              </NavLink>
              <NavLink 
                to="/our-tools" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={({ isActive }) => 
                  `px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 border ${
                    isActive 
                      ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(176,198,255,0.1)]" 
                      : "text-[#8c90a1] hover:text-white hover:bg-white/5 border-transparent"
                  }`
                }
              >
                Our Tools
              </NavLink>
              <NavLink 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={({ isActive }) => 
                  `px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 border ${
                    isActive 
                      ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(176,198,255,0.1)]" 
                      : "text-[#8c90a1] hover:text-white hover:bg-white/5 border-transparent"
                  }`
                }
              >
                Contact
              </NavLink>
              
              {user && user.email !== 'BoltMain7@bolt.in' && (
                <NavLink 
                  to="/dashboard" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 border ${
                      isActive 
                        ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(176,198,255,0.1)]" 
                        : "text-[#8c90a1] hover:text-white hover:bg-white/5 border-transparent"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}
              {user && user.email === 'BoltMain7@bolt.in' && (
                <NavLink 
                  to="/admin" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 border ${
                      isActive 
                        ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(176,198,255,0.1)]" 
                        : "text-[#8c90a1] hover:text-white hover:bg-white/5 border-transparent"
                    }`
                  }
                >
                  Admin Panel
                </NavLink>
              )}
              
              <div className="h-px w-full bg-outline-variant"></div>

              {user ? (
                <div className="flex items-center justify-between cursor-pointer" onClick={() => { setIsMobileMenuOpen(false); navigate(user.email === 'BoltMain7@bolt.in' ? '/admin' : '/dashboard'); }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden">
                      {user.profilePhoto ? (
                        <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      )}
                    </div>
                    <div>
                      <div className="font-label-md text-label-md text-on-surface">{user.fullName || user.email.split('@')[0]}</div>
                      <div className={`font-caption text-caption ${user.email === 'BoltMain7@bolt.in' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                        {user.email === 'BoltMain7@bolt.in' ? 'Administrator' : 'User'}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link to="/signup?mode=login" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="w-full text-center bg-primary/10 text-primary border border-primary/30 px-6 py-3 font-label-md text-label-md rounded-[16px] hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(176,198,255,0.3)] transition-all cursor-pointer">Login</div>
                  </Link>
                  <Link to="/signup?mode=signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="w-full text-center bg-primary/10 text-primary border border-primary/30 px-6 py-3 font-label-md text-label-md rounded-[16px] hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(176,198,255,0.3)] transition-all cursor-pointer">Sign Up</div>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
