import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const OurTools = () => {
  return (
    <>
      <main className="flex-grow pt-32 pb-32">
        {/* Hero Section */}
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-24"
        >
          <div className="max-w-3xl">
            <h1 className="font-display-lg text-display-lg text-on-surface mb-6">Our Tool Suite</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              A collection of high-performance, architecturally precise components designed for modern, distributed infrastructure. Engineered for scale, built for absolute control.
            </p>
          </div>
        </motion.header>
        
        {/* Tools Grid (Glassmorphism Bento Layout) */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ staggerChildren: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-gutter"
          >
            {/* Card 1: Bolt Media Downloader */}
            <a href="https://bolt-app-hazel.vercel.app/" target="_blank" rel="noopener noreferrer" className="block group">
              <motion.article 
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} 
                className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] p-8 md:p-12 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)] hover:border-primary/50 min-h-[400px] h-full cursor-pointer"
              >
                {/* Subtle Glow Effect */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-surface border border-outline-variant rounded">
                  <span className="material-symbols-outlined text-primary text-2xl" data-icon="cloud_download">cloud_download</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">Bolt Media Downloader</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">
                  High-fidelity, multi-platform media extraction pipeline. Download high-resolution videos, audio, and carousels from YouTube, Instagram, and more with sub-second processing and metadata preservation.
                </p>
                <div className="mb-10">
                  <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-widest border-b border-outline-variant pb-2 mb-4">Core Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5" data-icon="check">check</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">Multi-Platform Downloader (YouTube, Instagram)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5" data-icon="check">check</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">JSZip Compilation for Image Carousels</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5" data-icon="check">check</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">Sub-Second Serverless Bypass Pipelines</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto pt-6 border-t border-outline-variant/50">
                  <span className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors">
                    Launch Application
                    <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1" data-icon="arrow_forward">arrow_forward</span>
                  </span>
                </div>
              </motion.article>
            </a>
            
            {/* Card 2: BoltCut */}
            <a href="https://boltcut-app.vercel.app/" target="_blank" rel="noopener noreferrer" className="block group">
              <motion.article 
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} 
                className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#333333] p-8 md:p-12 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)] hover:border-primary/50 min-h-[400px] h-full cursor-pointer"
              >
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-tertiary-container/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-surface border border-outline-variant rounded">
                  <span className="material-symbols-outlined text-primary text-2xl" data-icon="content_cut">content_cut</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3">BoltCut</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">
                  Professional browser-side video editing and trimming tool powered by client-side FFmpeg WebAssembly. Crop, cut, and process media assets instantly with zero-latency desktop workflows.
                </p>
                <div className="mb-10">
                  <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-widest border-b border-outline-variant pb-2 mb-4">Core Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5" data-icon="check">check</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">Pure Client-Side Video Trimming (FFmpeg.wasm)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5" data-icon="check">check</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">Zero Server Latency or Privacy Overhead</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5" data-icon="check">check</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">PWA Enabled with Offline Frame Processing</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto pt-6 border-t border-outline-variant/50">
                  <span className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors">
                    Launch Application
                    <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1" data-icon="arrow_forward">arrow_forward</span>
                  </span>
                </div>
              </motion.article>
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default OurTools;
