import React, { useEffect, useRef } from 'react';

const GlobalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles = [];

    const initParticles = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      // Calculate particle count dynamically based on screen real estate
      const particleCount = Math.floor((width * height) / 22000);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.3 + 0.4,
          alpha: Math.random() * 0.45 + 0.05
        });
      }
    };

    let animationFrameId;
    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around screen edges smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(176, 198, 255, ${p.alpha})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(drawParticles);
    };

    initParticles();
    drawParticles();

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Background Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Pulsing Ambient Glows for Live Depth */}
      <div className="absolute top-[10%] left-[-15%] w-[50vw] h-[50vw] bg-radial-gradient from-primary/10 to-transparent rounded-full filter blur-[130px] pointer-events-none animate-pulse duration-[9000ms]" />
      <div className="absolute bottom-[20%] right-[-15%] w-[60vw] h-[60vw] bg-radial-gradient from-primary/5 to-transparent rounded-full filter blur-[160px] pointer-events-none animate-pulse duration-[11000ms]" />
    </div>
  );
};

export default GlobalBackground;
