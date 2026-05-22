import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

// ✅ Live Google Apps Script endpoint — Client Request sheet
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbw3uNkRWLjevkKnmi118UNgF-El3wi2hGbtFVdC2mqqY_VY3BZLfykAOL-LYn7Zemoq/exec';

const BoltCarrier = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ fullName: '', email: '', githubUrl: '' });
  const [fieldErrors, setFieldErrors] = useState({ fullName: '', email: '', githubUrl: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isValidUrl   = (val) => {
    try { new URL(val); return true; } catch { return false; }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear field error as user types
    setFieldErrors(prev => ({ ...prev, [id]: '' }));
  };

  // Convert file to Base64 string using FileReader
  const readFileAsBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Remove the "data:*/*;base64," prefix — Apps Script only wants the raw Base64
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setSubmitMessage('');

    // ── Per-field validation ─────────────────────────────────
    const errors = { fullName: '', email: '', githubUrl: '' };
    let hasError = false;

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required.';
      hasError = true;
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
      hasError = true;
    } else if (!isValidEmail(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
      hasError = true;
    }
    if (!formData.githubUrl.trim()) {
      errors.githubUrl = 'Portfolio / GitHub URL is required.';
      hasError = true;
    } else if (!isValidUrl(formData.githubUrl.trim())) {
      errors.githubUrl = 'Please enter a valid URL (e.g. https://github.com/you).';
      hasError = true;
    }
    if (!selectedFile) {
      setFileError('Please upload your Resume / CV (PDF or image).');
      hasError = true;
    }

    setFieldErrors(errors);
    if (hasError) return;

    setIsSubmitting(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        const base64Content = dataUrl.split(',')[1]; // Strips metadata header cleanly

        const payloadData = {
          fullName: formData.fullName,
          emailAddress: formData.email,
          portfolioUrl: formData.githubUrl,
          fileName: selectedFile.name,
          fileType: selectedFile.type,
          fileData: base64Content
        };

        fetch('https://script.google.com/macros/s/AKfycbw3uNkRWLjevkKnmi118UNgF-El3wi2hGbtFVdC2mqqY_VY3BZLfykAOL-LYn7Zemoq/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payloadData)
        })
        .then(response => {
          // Toggle your UI success banner state here
          setSubmitStatus('success');
          setSubmitMessage("Application submitted! We'll be in touch soon.");
          setFormData({ fullName: '', email: '', githubUrl: '' });
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
          setIsSubmitting(false);
          console.log("Data packet safely accepted by Google Sheet!");
        })
        .catch(err => {
          console.error("Network routing error:", err);
          setSubmitStatus('error');
          setSubmitMessage('Submission failed. Please check your connection and try again.');
          setIsSubmitting(false);
        });
      };
      reader.onerror = (err) => {
        console.error("FileReader crash:", err);
        setSubmitStatus('error');
        setSubmitMessage('Failed to read file.');
        setIsSubmitting(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus('error');
      setSubmitMessage('An unexpected error occurred.');
      setIsSubmitting(false);
    }
  };

  const validateAndSetFile = (file) => {
    setFileError('');
    if (!file) return;
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ];
    if (!allowedTypes.includes(file.type)) {
      setFileError('Only PDF or image files (JPG, PNG, WEBP) are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File must be under 5MB.');
      return;
    }
    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    validateAndSetFile(e.target.files[0]);
  };

  const handleDropZoneClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSetFile(e.dataTransfer.files[0]);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setFileError('');
    fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <>
      <main className="flex-grow pt-32 pb-32 flex flex-col gap-y-[128px] md:gap-y-[160px]">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 md:grid-cols-12 gap-gutter"
        >
          <div className="col-span-1 md:col-span-8 md:col-start-3 text-center flex flex-col items-center gap-8">
            <h1 className="font-display-lg text-display-lg text-on-surface">
              Join the Future of DevTools
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              We build brutalist, high-performance architecture for the world's most demanding engineering teams. If you value precision over decoration, build with us.
            </p>
          </div>
        </motion.section>

        {/* Why Bolt? Bento Grid */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.2 }}
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full"
        >
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16 md:col-span-12">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Why Bolt?</h2>
            <div className="h-px w-24 bg-primary-container"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] p-8 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)] transition-all duration-300 group flex flex-col gap-6">
              <span className="material-symbols-outlined text-4xl text-primary-container group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>
                rocket_launch
              </span>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">High Impact</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Ship code that directly dictates the velocity of top-tier SaaS companies. No middle management, just raw output.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] p-8 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)] transition-all duration-300 group flex flex-col gap-6">
              <span className="material-symbols-outlined text-4xl text-primary-container group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>
                terminal
              </span>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Deep Engineering</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Tackle complex systems programming, compiler optimization, and distributed state management.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] p-8 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)] transition-all duration-300 group flex flex-col gap-6">
              <span className="material-symbols-outlined text-4xl text-primary-container group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>
                forum
              </span>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Radical Candor</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  A culture of immediate, direct feedback. We leave egos at the door to build the optimal solution.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Application Form Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 md:grid-cols-12 gap-gutter"
        >
          <div className="md:col-span-8 md:col-start-3 bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] p-8 md:p-16">
            <div className="mb-12">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Apply Now</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Submit your coordinates. We'll initiate contact.</p>
            </div>
            <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant" htmlFor="fullName">
                  Full Name <span className="text-error">*</span>
                </label>
                <input
                  className={`w-full bg-transparent border-0 border-b px-0 py-2 text-on-surface font-body-lg text-body-lg transition-colors placeholder:text-outline focus:ring-0 ${
                    fieldErrors.fullName ? 'border-error focus:border-error' : 'border-outline-variant focus:border-primary-container'
                  }`}
                  id="fullName" placeholder="Jane Doe" type="text"
                  value={formData.fullName} onChange={handleChange}
                />
                {fieldErrors.fullName && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    className="text-error font-caption text-caption mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">error</span>{fieldErrors.fullName}
                  </motion.p>
                )}
              </div>
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant" htmlFor="email">
                  Email Address <span className="text-error">*</span>
                </label>
                <input
                  className={`w-full bg-transparent border-0 border-b px-0 py-2 text-on-surface font-body-lg text-body-lg transition-colors placeholder:text-outline focus:ring-0 ${
                    fieldErrors.email ? 'border-error focus:border-error' : 'border-outline-variant focus:border-primary-container'
                  }`}
                  id="email" placeholder="jane@example.com" type="email"
                  value={formData.email} onChange={handleChange}
                />
                {fieldErrors.email && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    className="text-error font-caption text-caption mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">error</span>{fieldErrors.email}
                  </motion.p>
                )}
              </div>
              {/* Portfolio/GitHub */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant" htmlFor="githubUrl">
                  Portfolio / GitHub URL <span className="text-error">*</span>
                </label>
                <input
                  className={`w-full bg-transparent border-0 border-b px-0 py-2 text-on-surface font-body-lg text-body-lg transition-colors placeholder:text-outline focus:ring-0 ${
                    fieldErrors.githubUrl ? 'border-error focus:border-error' : 'border-outline-variant focus:border-primary-container'
                  }`}
                  id="githubUrl" placeholder="https://github.com/janedoe" type="url"
                  value={formData.githubUrl} onChange={handleChange}
                />
                {fieldErrors.githubUrl && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                    className="text-error font-caption text-caption mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">error</span>{fieldErrors.githubUrl}
                  </motion.p>
                )}
              </div>

              {/* CV Upload */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant">
                  Resume / CV <span className="text-error">*</span>
                </label>

                {/* Hidden native file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  id="cvUpload"
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.gif"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Interactive drop zone */}
                <div
                  onClick={handleDropZoneClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`mt-2 border-2 border-dashed transition-all duration-300 p-10 flex flex-col items-center justify-center text-center cursor-pointer rounded-[16px] group select-none
                    ${isDragging
                      ? 'border-primary bg-primary/10 shadow-[0_0_24px_rgba(176,198,255,0.15)]'
                      : selectedFile
                        ? 'border-primary/50 bg-primary/5'
                        : 'border-outline-variant bg-surface-container-low hover:border-primary/40 hover:bg-surface-container-high'
                    }`}
                >
                  {selectedFile ? (
                    /* ── File selected state ── */
                    <div className="flex flex-col items-center gap-4 w-full">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-primary">description</span>
                      </div>
                      <div className="text-center">
                        <p className="font-body-md text-body-md text-on-surface font-semibold truncate max-w-[260px]">{selectedFile.name}</p>
                        <p className="font-caption text-caption text-on-surface-variant mt-1">{formatFileSize(selectedFile.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="flex items-center gap-2 text-error/70 hover:text-error font-label-md text-label-md uppercase tracking-widest text-xs transition-colors border border-error/20 hover:border-error/50 px-4 py-2 rounded-[10px] hover:bg-error/5"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        Remove
                      </button>
                    </div>
                  ) : (
                    /* ── Empty / drag state ── */
                    <>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300
                        ${isDragging
                          ? 'bg-primary/20 border border-primary/40'
                          : 'bg-surface-container border border-outline-variant group-hover:border-primary/40 group-hover:bg-primary/10'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-3xl transition-colors duration-300 ${isDragging ? 'text-primary' : 'text-outline group-hover:text-primary'}`}>
                          {isDragging ? 'download' : 'upload_file'}
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface mb-1">
                        {isDragging ? 'Drop your file here' : 'Click to upload or drag & drop'}
                      </p>
                      <p className="font-caption text-caption text-on-surface-variant">PDF or Image (JPG, PNG, WEBP) · Max 5MB</p>
                    </>
                  )}
                </div>

                {/* Validation error */}
                {fileError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error font-caption text-caption mt-1"
                  >
                    {fileError}
                  </motion.p>
                )}
              </div>

              {/* Status feedback */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`px-5 py-4 rounded-[12px] font-label-md text-label-md border ${
                    submitStatus === 'success'
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-error/10 border-error/30 text-error'
                  }`}
                >
                  {submitMessage}
                </motion.div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-primary/10 text-primary border border-primary/30 py-4 px-10 rounded-[16px] font-label-md text-label-md uppercase tracking-widest hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(176,198,255,0.3)] transition-all text-center backdrop-blur-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Submitting...
                    </span>
                  ) : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </motion.section>
      </main>

      <Footer />
    </>
  );
};

export default BoltCarrier;
