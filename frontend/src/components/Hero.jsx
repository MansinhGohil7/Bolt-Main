import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative pt-48 pb-32 md:pt-64 md:pb-64 overflow-hidden">
      <div className="mesh-bg">
        <motion.div 
          className="mesh-blob-1"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="mesh-blob-2"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.span variants={itemVariants} className="inline-block py-1 px-3 rounded-full border border-primary/30 bg-primary/10 text-primary font-label-md text-label-md mb-6 backdrop-blur-sm">v2.0 Beta Now Available</motion.span>
            <motion.h1 variants={itemVariants} className="font-display-lg text-display-lg gradient-text mb-6 tracking-tighter leading-tight drop-shadow-sm">
              Built for Speed.<br />Engineered for Scale.
            </motion.h1>
            <motion.p variants={itemVariants} className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-12 opacity-90 leading-relaxed">
              The next generation of high-performance developer tools. <strong className="text-on-surface font-semibold">Streamline deployment</strong>, synchronize state globally, and secure API infrastructure at the edge.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/signup" className="bg-primary/10 text-primary border border-primary/30 px-8 py-4 rounded-[16px] font-label-md text-label-md uppercase tracking-wider hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(176,198,255,0.3)] transition-all text-center backdrop-blur-sm">Start Developing</Link>
              <Link to="/our-tools" className="glass-panel px-8 py-4 rounded font-label-md text-label-md uppercase tracking-wider hover:bg-white/10 transition-all text-center">View tools</Link>
            </motion.div>
          </div>
          <motion.div 
            className="w-full md:w-1/2 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative w-full aspect-square max-w-lg">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full mix-blend-screen opacity-50"></div>
              <motion.img 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full object-contain hero-mask drop-shadow-[0_0_80px_rgba(0,112,255,0.2)] relative z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZossh8Y-YHe8yAh_Fb2VslmR-9-CJNgVdLaX0PSGhsKj9KLzv8hZUz9HcVh8B8dqkx_yL3Ou0AvQqQdjgn1hjekH-OjKgwHl2MqU8DX3S3vEMEOFFjiE2NaHoRU0BHpfBK-i0J2WVN_OU717syQYbiPKQnDK5AfTbwtnHv24U9SCmlx-GsedMYZQtwx6TlMAbHzf4q7MspW9fnoZFnVhEDjhlNdRrs6gbISChhIEDyqtgUA1K_oJ6Xc6TNHsged3qc7AMgnjAVW8v" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
