
import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';

const AmbientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Responsive particle count and size based on screen width
    const getParticleCount = () => {
      return isMobile ? 35 : 80; // Fewer particles on mobile
    };
    
    // Create particles
    const particleCount = getParticleCount();
    const particles: {
      x: number;
      y: number;
      radius: number; 
      color: string;
      xSpeed: number;
      ySpeed: number;
      pulse: number;
      pulseSpeed: number;
      opacity: number;
    }[] = [];
    
    // Determine color palette based on theme
    const colorPalette = theme === 'dark' 
      ? ['rgba(0, 119, 182, 0.2)', 'rgba(42, 157, 143, 0.2)', 'rgba(233, 196, 106, 0.2)', 'rgba(100, 200, 255, 0.2)']
      : ['rgba(0, 119, 182, 0.1)', 'rgba(42, 157, 143, 0.1)', 'rgba(233, 196, 106, 0.1)', 'rgba(100, 200, 255, 0.1)'];
    
    // Create particles with size based on mobile detection
    for (let i = 0; i < particleCount; i++) {
      const size = isMobile ? Math.random() * 3 + 1 : Math.random() * 5 + 1.5; // Smaller particles on mobile
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: size,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        xSpeed: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5), // Slower movement on mobile
        ySpeed: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        pulse: 0,
        pulseSpeed: 0.01 + Math.random() * 0.02, // Gentler pulse
        opacity: Math.random() * 0.4 + 0.1 // Lower opacity for subtlety
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.xSpeed;
        particle.y += particle.ySpeed;
        
        // Pulse effect
        particle.pulse += particle.pulseSpeed;
        const pulseFactor = Math.sin(particle.pulse) * 0.4 + 1; // Reduced pulse intensity
        
        // Wrap around edges instead of bouncing
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        
        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        // Draw glow
        const glow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 1.5 * pulseFactor
        );
        
        const color = particle.color.slice(0, -4); // Remove the opacity value
        glow.addColorStop(0, color + "0.4)");
        glow.addColorStop(1, color + "0)");
        
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 1.5 * pulseFactor, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw core
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * pulseFactor, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
      
      // Draw connecting lines between nearby particles
      // Limit the connection distance on mobile
      const connectionDistance = isMobile ? 70 : 100;
      
      ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';
      ctx.lineWidth = isMobile ? 0.3 : 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) { // Only connect nearby particles
            ctx.globalAlpha = (1 - distance / connectionDistance) * (isMobile ? 0.1 : 0.2);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [theme, isMobile]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 -z-10 w-full h-full pointer-events-none"
    />
  );
};

export default AmbientBackground;
