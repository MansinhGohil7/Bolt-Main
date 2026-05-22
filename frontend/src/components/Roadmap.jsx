import { motion } from 'framer-motion';

const Roadmap = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent pointer-events-none"></div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-24"
        >
          <div className="max-w-2xl">
            <span className="text-primary font-label-md text-label-md uppercase tracking-[0.2em] mb-4 block opacity-80">The Future</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Upcoming Projects &amp; Roadmap</h2>
          </div>
        </motion.div>
        
        <div className="relative pt-8">
          <div className="absolute top-10 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-outline-variant/30 to-outline-variant/10 hidden md:block rounded-full"></div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10"
          >
            <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 group">
              <div className="w-5 h-5 rounded-full bg-primary ring-4 ring-background border-2 border-primary timeline-dot-active z-10 relative"></div>
              <div className="pt-4">
                <h4 className="font-label-md text-label-md text-primary mb-2 tracking-widest uppercase">Upcoming Project 1</h4>
                <p className="font-headline-md text-[20px] mb-3 text-on-surface group-hover:text-primary transition-colors">Bolt Clear</p>
                <p className="text-on-surface-variant text-caption leading-relaxed opacity-80">Frictionless watermark removal engine powered by precise serverless vision models.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 group">
              <div className="w-5 h-5 rounded-full bg-surface-variant ring-4 ring-background border-2 border-outline-variant z-10 relative group-hover:border-primary/50 transition-colors"></div>
              <div className="pt-4">
                <h4 className="font-label-md text-label-md text-on-surface-variant mb-2 tracking-widest uppercase">Upcoming Project 2</h4>
                <p className="font-headline-md text-[20px] mb-3 text-on-surface group-hover:text-primary/80 transition-colors">BoltHR</p>
                <p className="text-on-surface-variant text-caption leading-relaxed opacity-80">Unified workforce system to effortlessly manage employee holidays, attendance tracking, and work schedules.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 group">
              <div className="w-5 h-5 rounded-full bg-surface-variant ring-4 ring-background border-2 border-outline-variant z-10 relative group-hover:border-primary/50 transition-colors"></div>
              <div className="pt-4">
                <h4 className="font-label-md text-label-md text-on-surface-variant mb-2 tracking-widest uppercase">Upcoming Project 3</h4>
                <p className="font-headline-md text-[20px] mb-3 text-on-surface group-hover:text-primary/80 transition-colors">Bolt ImageEnhancer</p>
                <p className="text-on-surface-variant text-caption leading-relaxed opacity-80">AI-powered super-resolution pipeline upscaling standard images into premium 4K quality.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
