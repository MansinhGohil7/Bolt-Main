import { motion } from 'framer-motion';

const Support = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Content Creator & YouTuber",
      company: "Sarah Creative Labs",
      avatar: "/avatar_sarah.png",
      gradient: "from-[#FF0080] to-[#7928CA]",
      rating: 5,
      tag: "Bolt Clear & ImageEnhancer",
      quote: "I've been using Bolt Clear to clean up watermarks from my visual drafts and Bolt ImageEnhancer to upscale my thumbnails to crisp 4K. It has completely transformed my creative workflow. The speed is absolute, and the quality is incredibly premium!"
    },
    {
      name: "Marcus Chen",
      role: "Digital Marketing Agency Founder",
      company: "Nexus Growth",
      avatar: "/avatar_marcus.png",
      gradient: "from-[#00DFD8] to-[#007CF0]",
      rating: 5,
      tag: "BoltHR & Platform Admin",
      quote: "Our marketing team manages hundreds of client assets daily. BoltHR lets us effortlessly sync our campaign team schedules, holidays, and timing details all in one beautiful dashboard, while Bolt Tools handles our daily file processes. An absolute game-changer!"
    },
    {
      name: "Elena Rostova",
      role: "Digital Artist & Creative Director",
      company: "Aetherial Design",
      avatar: "/avatar_elena.png",
      gradient: "from-[#FF4D4D] to-[#F9CB28]",
      rating: 5,
      tag: "UI/UX & Product Suite",
      quote: "The visual clarity and pure execution speed of Bolt Tools is phenomenal. Running these advanced tools right inside the browser with zero delay has simplified my creative pipeline. It is the perfect suite for creators who demand high-fidelity outputs."
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      {/* Pulsing Ambient Glows for Live Depth */}
      <div className="absolute top-1/2 left-[-10%] w-[40vw] h-[40vw] bg-radial-gradient from-primary/5 to-transparent rounded-full filter blur-[120px] pointer-events-none animate-pulse duration-[9000ms] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-radial-gradient from-secondary/5 to-transparent rounded-full filter blur-[150px] pointer-events-none animate-pulse duration-[11000ms] -z-10" />

      <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Heading Block */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col justify-center text-center lg:text-left"
          >
            <span className="text-primary font-label-md text-label-md uppercase tracking-[0.2em] mb-4 block opacity-80">Loved by Creators</span>
            <h2 className="font-display-lg text-4xl md:text-[56px] leading-[1.1] mb-6 tracking-tight text-white font-semibold">
              What Our Users Say.
            </h2>
            <p className="text-on-surface-variant font-body-lg text-body-lg mb-8 opacity-90 leading-relaxed max-w-lg mx-auto lg:mx-0">
              See how content creators, digital marketers, agency directors, and artists streamline their media workflows and run their businesses using the Bolt Tools suite.
            </p>
            <div className="flex items-center gap-4 text-on-surface-variant bg-white/5 p-4 rounded-xl border border-white/10 w-fit mx-auto lg:mx-0 backdrop-blur-sm">
              <span className="material-symbols-outlined text-primary">verified</span>
              <span className="font-label-md text-label-md text-xs uppercase tracking-wider">Trusted by 10,000+ Creators &amp; Users</span>
            </div>
          </motion.div>

          {/* Right Column: Bento Grid Testimonials */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
          >
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.015, border: '1px solid rgba(176, 198, 255, 0.3)', boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)' }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`glass-card rounded-[24px] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-300 min-h-[320px] ${
                  idx === 2 ? 'md:col-span-2' : ''
                }`}
              >
                {/* Floating quote background mark */}
                <span className="absolute top-6 right-8 text-outline-variant/15 text-[120px] font-serif pointer-events-none select-none leading-none">“</span>
                
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col gap-6">
                  {/* Rating Stars & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-primary">
                      {[...Array(t.rating)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[16px] fill-current">star</span>
                      ))}
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full">{t.tag}</span>
                  </div>

                  {/* Quote Text */}
                  <p className="text-on-surface text-[15px] md:text-[16px] leading-relaxed font-normal opacity-90 italic">
                    "{t.quote}"
                  </p>
                </div>

                {/* User Info Row */}
                <div className="relative z-10 flex items-center gap-4 mt-8 pt-6 border-t border-outline-variant/30">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    {/* Glowing outer gradient ring */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-tr ${t.gradient} opacity-40 blur-sm scale-110`} />
                    {/* Ring Border Wrapper */}
                    <div className={`w-full h-full rounded-xl bg-gradient-to-tr ${t.gradient} p-[1.5px] relative z-10 overflow-hidden`}>
                      <img 
                        src={t.avatar} 
                        alt={t.name} 
                        className="w-full h-full object-cover rounded-[10px] bg-[#1a1a1a]" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                      {t.name}
                      <span className="material-symbols-outlined text-primary text-[14px]" title="Verified User">verified</span>
                    </div>
                    <div className="font-caption text-caption text-on-surface-variant text-xs mt-0.5">
                      {t.role} @ <span className="text-white/80 font-medium">{t.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Support;
