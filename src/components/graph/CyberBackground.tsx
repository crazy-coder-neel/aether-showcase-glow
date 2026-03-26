import { useEffect, useRef } from 'react';

// Matrix rain + floating particles drawn on canvas
export const CyberBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    // Matrix rain columns
    const fontSize = 14;
    const cols = Math.floor(w() / fontSize) + 1;
    const drops: number[] = Array(cols).fill(0).map(() => Math.random() * -100);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF><{}[]';

    // Floating particles
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      hue: Math.random() > 0.5 ? 225 : 180,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());

      // Matrix rain
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < cols; i++) {
        if (Math.random() > 0.97) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          
          // Leading char bright
          ctx.fillStyle = `hsla(150, 100%, 60%, 0.7)`;
          ctx.fillText(char, x, y);
          
          // Trail chars dimmer
          for (let t = 1; t < 6; t++) {
            ctx.fillStyle = `hsla(150, 100%, 50%, ${0.1 - t * 0.015})`;
            const tc = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(tc, x, y - t * fontSize);
          }
        }

        drops[i] += 0.3;
        if (drops[i] * fontSize > h() && Math.random() > 0.99) {
          drops[i] = 0;
        }
      }

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w()) p.vx *= -1;
        if (p.y < 0 || p.y > h()) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, 0.4)`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 60%, 0.15)`);
        grad.addColorStop(1, `hsla(${p.hue}, 100%, 60%, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(225, 100%, 60%, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};
