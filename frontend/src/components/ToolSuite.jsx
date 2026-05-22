import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ToolSuite = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-32 relative z-10">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center md:text-left"
        >
          <span className="text-primary font-label-md text-label-md uppercase tracking-[0.2em] mb-4 block opacity-80">Core Platform</span>
          <h2 className="font-headline-lg text-headline-lg gradient-text inline-block">Our Tool Suite</h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Card 1: Bolt Media Downloader */}
          <motion.div variants={cardVariants} className="p-10 glass-card rounded-2xl glass-card-hover group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors"></div>
            <div className="mb-8 w-14 h-14 flex items-center justify-center text-primary icon-container rounded-xl">
              <span className="material-symbols-outlined text-3xl" data-icon="cloud_download">cloud_download</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-4 text-on-surface">Bolt Media Downloader</h3>
            <p className="text-on-surface-variant font-body-md text-body-md mb-8 opacity-80 leading-relaxed">High-fidelity, multi-platform media extraction pipeline. Download high-resolution videos, audio, and carousels from YouTube, Instagram, and more.</p>
            <Link to="/our-tools" className="flex items-center text-primary font-label-md text-label-md group-hover:translate-x-2 transition-transform cursor-pointer">
              Explore Downloader <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </Link>
          </motion.div>

          {/* Card 2: BoltCut */}
          <motion.div variants={cardVariants} className="p-10 glass-card rounded-2xl glass-card-hover group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors"></div>
            <div className="mb-8 w-14 h-14 flex items-center justify-center text-primary icon-container rounded-xl">
              <span className="material-symbols-outlined text-3xl" data-icon="content_cut">content_cut</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-4 text-on-surface">BoltCut</h3>
            <p className="text-on-surface-variant font-body-md text-body-md mb-8 opacity-80 leading-relaxed">Professional browser-side video editing and trimming tool powered by client-side FFmpeg WebAssembly. Crop, cut, and process media assets instantly.</p>
            <Link to="/our-tools" className="flex items-center text-primary font-label-md text-label-md group-hover:translate-x-2 transition-transform cursor-pointer">
              Explore Cut <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolSuite;
