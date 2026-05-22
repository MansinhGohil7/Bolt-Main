import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

const Contact = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form Handlers
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.budget.trim()) {
      newErrors.budget = 'Budget range is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us what's in your mind.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.name,
        budget: formData.budget,
        workEmail: formData.email,
        phoneNumber: formData.phone,
        message: formData.message
      };

      await fetch('https://script.google.com/macros/s/AKfycbzTrq1CXAtki4WcOu-HyuPttN-w7hr1V3_WsCSfLP92Mr9LEM-P8q8JTmIf5cH2oz-g/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      setIsSuccess(true);
      setFormData({
        name: '',
        budget: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Framer Motion Animation Configs
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#e5e2e1] relative font-sans">
      {/* Main Content Area */}
      <motion.main 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-36 pb-24 relative z-10"
      >
        
        {/* Hero Section */}
        <section className="mb-16 md:mb-20 max-w-3xl">
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-[8px] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-caption text-caption text-on-surface-variant uppercase tracking-widest text-[10px] font-medium">
              All Systems Operational
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="font-display-lg text-display-lg text-on-surface mb-6 font-semibold tracking-tighter"
          >
            Connect With Us.
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl"
          >
            Engage with our architectural engineering team. Whether you require enterprise scaling solutions or technical consultation, we are ready to deploy.
          </motion.p>
        </section>

        {/* Grid Layout for Form and Contact Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          
          {/* Service Request Form Container */}
          <motion.div 
            variants={fadeInUp}
            className="lg:col-span-7 bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] rounded-[24px] p-8 md:p-12 shadow-[0_24px_64px_rgba(0,0,0,0.6)] relative overflow-hidden z-20 min-h-[580px] flex flex-col justify-between"
          >
            {/* Animated Success Overlay */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#131313] z-30 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full scale-150 animate-pulse" />
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="relative w-24 h-24 rounded-full border-2 border-emerald-500/30 flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-emerald-400 text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </motion.div>
                  </div>
                  <h3 className="font-display-lg text-headline-lg text-white mb-3 tracking-tight font-semibold">
                    Request Initialized
                  </h3>
                  <p className="font-body-md text-[#c2c6d8] text-center max-w-sm">
                    Architectural protocols engaged. Our engineering team will synchronize within 4 hours.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-xs uppercase tracking-[0.2em] text-[#b0c6ff] hover:text-white transition-colors border-b border-[#b0c6ff]/30 pb-1 font-semibold"
                  >
                    Close Protocol
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <div className="flex items-center gap-3 mb-12">
                <div className="h-[2px] w-12 bg-[#b0c6ff]" />
                <h2 className="font-display text-sm font-bold text-white tracking-widest uppercase">
                  Service Request Protocol
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                  {/* Full Name */}
                  <div className="relative group flex flex-col">
                    <input 
                      type="text" 
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className={`peer w-full bg-transparent border-0 border-b py-3 focus:ring-0 transition-all duration-300 text-white placeholder-transparent text-body-md ${
                        errors.name ? 'border-error focus:border-error' : 'border-white/20 focus:border-[#b0c6ff]'
                      }`}
                    />
                    <label 
                      htmlFor="name" 
                      className={`absolute left-0 -top-4 text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#8c90a1] peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] pointer-events-none font-medium ${
                        errors.name ? 'text-error peer-focus:text-error' : 'text-[#c2c6d8] peer-focus:text-[#b0c6ff]'
                      }`}
                    >
                      Full Name *
                    </label>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b0c6ff] transition-all duration-500 group-focus-within:w-full shadow-[0_0_12px_rgba(176,198,255,0.8)]" />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p 
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[#ffb4ab] text-xs mt-2 flex items-center gap-1 font-medium"
                        >
                          <span className="material-symbols-outlined text-sm">error</span> {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Budget */}
                  <div className="relative group flex flex-col">
                    <input 
                      type="text" 
                      id="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="Budget"
                      className={`peer w-full bg-transparent border-0 border-b py-3 focus:ring-0 transition-all duration-300 text-white placeholder-transparent text-body-md ${
                        errors.budget ? 'border-error focus:border-error' : 'border-white/20 focus:border-[#b0c6ff]'
                      }`}
                    />
                    <label 
                      htmlFor="budget" 
                      className={`absolute left-0 -top-4 text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#8c90a1] peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] pointer-events-none font-medium ${
                        errors.budget ? 'text-error peer-focus:text-error' : 'text-[#c2c6d8] peer-focus:text-[#b0c6ff]'
                      }`}
                    >
                      Budget *
                    </label>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b0c6ff] transition-all duration-500 group-focus-within:w-full shadow-[0_0_12px_rgba(176,198,255,0.8)]" />
                    <AnimatePresence>
                      {errors.budget && (
                        <motion.p 
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[#ffb4ab] text-xs mt-2 flex items-center gap-1 font-medium"
                        >
                          <span className="material-symbols-outlined text-sm">error</span> {errors.budget}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                  {/* Email */}
                  <div className="relative group flex flex-col">
                    <input 
                      type="email" 
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Work Email"
                      className={`peer w-full bg-transparent border-0 border-b py-3 focus:ring-0 transition-all duration-300 text-white placeholder-transparent text-body-md ${
                        errors.email ? 'border-error focus:border-error' : 'border-white/20 focus:border-[#b0c6ff]'
                      }`}
                    />
                    <label 
                      htmlFor="email" 
                      className={`absolute left-0 -top-4 text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#8c90a1] peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] pointer-events-none font-medium ${
                        errors.email ? 'text-error peer-focus:text-error' : 'text-[#c2c6d8] peer-focus:text-[#b0c6ff]'
                      }`}
                    >
                      Work Email *
                    </label>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b0c6ff] transition-all duration-500 group-focus-within:w-full shadow-[0_0_12px_rgba(176,198,255,0.8)]" />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[#ffb4ab] text-xs mt-2 flex items-center gap-1 font-medium"
                        >
                          <span className="material-symbols-outlined text-sm">error</span> {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone */}
                  <div className="relative group flex flex-col">
                    <input 
                      type="tel" 
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={`peer w-full bg-transparent border-0 border-b py-3 focus:ring-0 transition-all duration-300 text-white placeholder-transparent text-body-md ${
                        errors.phone ? 'border-error focus:border-error' : 'border-white/20 focus:border-[#b0c6ff]'
                      }`}
                    />
                    <label 
                      htmlFor="phone" 
                      className={`absolute left-0 -top-4 text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#8c90a1] peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] pointer-events-none font-medium ${
                        errors.phone ? 'text-error peer-focus:text-error' : 'text-[#c2c6d8] peer-focus:text-[#b0c6ff]'
                      }`}
                    >
                      Phone Number *
                    </label>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b0c6ff] transition-all duration-500 group-focus-within:w-full shadow-[0_0_12px_rgba(176,198,255,0.8)]" />
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.p 
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[#ffb4ab] text-xs mt-2 flex items-center gap-1 font-medium"
                        >
                          <span className="material-symbols-outlined text-sm">error</span> {errors.phone}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Textarea Description */}
                <div className="relative group flex flex-col">
                  <textarea 
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Project Details"
                    className={`peer w-full bg-transparent border-0 border-b py-3 focus:ring-0 transition-all duration-300 text-white placeholder-transparent resize-none min-h-[120px] text-body-md ${
                      errors.message ? 'border-error focus:border-error' : 'border-white/20 focus:border-[#b0c6ff]'
                    }`}
                  />
                  <label 
                    htmlFor="message" 
                    className={`absolute left-0 -top-4 text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#8c90a1] peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] pointer-events-none font-medium ${
                      errors.message ? 'text-error peer-focus:text-error' : 'text-[#c2c6d8] peer-focus:text-[#b0c6ff]'
                    }`}
                  >
                    What's in your mind? *
                  </label>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b0c6ff] transition-all duration-500 group-focus-within:w-full shadow-[0_0_12px_rgba(176,198,255,0.8)]" />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[#ffb4ab] text-xs mt-2 flex items-center gap-1 font-medium"
                      >
                        <span className="material-symbols-outlined text-sm">error</span> {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="flex flex-col">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8c90a1] mb-2 font-medium">Expect Response</p>
                    <p className="font-display text-sm text-white flex items-center gap-2 font-semibold">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      &nbsp;&lt; 04 HOURS
                    </p>
                  </div>

                  <motion.button 
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto bg-primary/10 text-primary border border-primary/30 py-4 px-10 rounded-[16px] font-label-md text-label-md uppercase tracking-widest hover:bg-primary hover:text-on-primary hover:shadow-[0_0_24px_rgba(176,198,255,0.35)] transition-all text-center backdrop-blur-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-semibold"
                  >
                    {isSubmitting ? 'DEPLOYING REQUEST...' : "LET'S CONNECT"}
                    <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Contact Channels Panel */}
          <div className="lg:col-span-5 flex flex-col gap-gutter z-20 h-full">
            {/* Email card */}
            <motion.a 
              href="mailto:gohilmaan301@gmail.com"
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="flex-1 bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] rounded-[24px] p-8 group hover:border-[#b0c6ff]/40 hover:bg-[#1E1E1E] cursor-pointer flex justify-between items-start shadow-[0_12px_32px_rgba(0,0,0,0.3)]"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#b0c6ff] group-hover:bg-[#b0c6ff]/20 group-hover:text-white transition-all duration-300 mb-6 border border-white/5">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <h3 className="font-label-md text-label-md text-[#c2c6d8] uppercase tracking-wider mb-2 text-[10px] font-semibold tracking-widest">
                  Technical Support
                </h3>
                <p className="font-headline-md text-lg text-white group-hover:text-[#b0c6ff] transition-colors duration-300 break-all font-bold">
                  gohilmaan301@gmail.com
                </p>
              </div>
              <span className="material-symbols-outlined text-[#c2c6d8] opacity-50 group-hover:opacity-100 group-hover:text-[#b0c6ff] transition-all duration-300">
                open_in_new
              </span>
            </motion.a>

            {/* Phone card */}
            <motion.a 
              href="tel:8849952182"
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="flex-1 bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] rounded-[24px] p-8 group hover:border-[#b0c6ff]/40 hover:bg-[#1E1E1E] cursor-pointer flex justify-between items-start shadow-[0_12px_32px_rgba(0,0,0,0.3)]"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#b0c6ff] group-hover:bg-[#b0c6ff]/20 group-hover:text-white transition-all duration-300 mb-6 border border-white/5">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <h3 className="font-label-md text-label-md text-[#c2c6d8] uppercase tracking-wider mb-2 text-[10px] font-semibold tracking-widest">
                  Direct Line (Urgent)
                </h3>
                <p className="font-headline-md text-lg text-white group-hover:text-[#b0c6ff] transition-colors duration-300 break-all font-bold">
                  +91 88499 52182
                </p>
              </div>
              <span className="material-symbols-outlined text-[#c2c6d8] opacity-50 group-hover:opacity-100 group-hover:text-[#b0c6ff] transition-all duration-300">
                open_in_new
              </span>
            </motion.a>

            {/* Location Location Card */}
            <motion.a 
              href="https://www.google.com/maps/search/?api=1&query=Bhavnagar%2C+Gujarat%2C+India"
              target="_blank" 
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative flex-1 bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] rounded-[24px] overflow-hidden group cursor-pointer hover:border-[#b0c6ff]/40 shadow-[0_12px_32px_rgba(0,0,0,0.3)] flex flex-col justify-between p-8"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity transition-opacity duration-500 group-hover:opacity-35"
                style={{ 
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida/ADBb0uhCUAaIGj8Dd4abhIwb3a4GQX8ETQmOvm4N9Fy1SqeWWm5ezKkiRPQkCyo5qyqsvuS-VQPboIioX0TVGly8BoXdlZmtAZ4WD08_98Z3ncWPit0KRcLr-Qv6oXBrU2d1zEPHM1BUtqJJKyUjt0B9Illf6D5-No8RCdYxaR28uHF_jPAMrWLwI-sfzJBrsz4ZPre207z1UZHnZ7tJ5DOSc75wHPNec4g3HUd2SzUF9VK2rYhp9fkFBEM_OF4')" 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/60 to-transparent z-0" />
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#b0c6ff] group-hover:bg-[#b0c6ff]/20 group-hover:text-white transition-all duration-300 border border-white/5">
                  <span className="material-symbols-outlined">explore</span>
                </div>
                <span className="material-symbols-outlined text-[#c2c6d8] opacity-50 group-hover:opacity-100 group-hover:text-[#b0c6ff] transition-all duration-300">
                  open_in_new
                </span>
              </div>

              <div className="relative z-10 w-full">
                <h3 className="font-label-md text-label-md text-[#c2c6d8] uppercase tracking-wider mb-2 text-[10px] font-semibold tracking-widest">
                  Global Headquarters
                </h3>
                <p className="font-body-md text-body-md text-white flex items-center gap-2 group-hover:text-[#b0c6ff] transition-colors font-bold text-base">
                  <span className="material-symbols-outlined text-[20px] text-[#b0c6ff]">location_on</span>
                  Bhavnagar, Gujarat, India.
                </p>
              </div>
            </motion.a>

          </div>

        </div>

      </motion.main>

      {/* Same Global Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
