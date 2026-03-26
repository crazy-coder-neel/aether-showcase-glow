import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import { useGameStore } from '@/store/useGameStore';
import { Zap, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

const FloatingOrb = ({ delay, x, y, color }: { delay: number; x: string; y: string; color: string }) => (
  <motion.div
    className={`absolute w-64 h-64 rounded-full blur-[100px] opacity-20 ${color}`}
    style={{ left: x, top: y }}
    animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
    transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const { login, signup, isAuthenticated } = useGameStore();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) login(form.email, form.password);
    else signup(form.username, form.email, form.password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden cyber-grid">
      {/* Background orbs */}
      <FloatingOrb delay={0} x="10%" y="20%" color="bg-primary" />
      <FloatingOrb delay={1} x="70%" y="60%" color="bg-secondary" />
      <FloatingOrb delay={2} x="80%" y="10%" color="bg-accent" />
      <FloatingOrb delay={1.5} x="20%" y="70%" color="bg-neon-pink" />

      {/* Scan line */}
      <motion.div
        className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{ y: ['-100vh', '100vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-4 relative z-10"
      >
        <div className="glass-card neon-border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/20 neon-border flex items-center justify-center"
            >
              <Zap className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="font-display text-2xl font-bold neon-text-blue">CYBERQUEST</h1>
            <p className="text-muted-foreground font-body mt-1 text-sm">
              {isLogin ? 'Access your terminal' : 'Initialize new agent'}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex gap-1 p-1 rounded-lg bg-surface mb-6">
            {['Login', 'Sign Up'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setIsLogin(i === 0)}
                className={`flex-1 py-2 rounded-md text-sm font-display font-semibold transition-all duration-300 ${
                  (i === 0) === isLogin
                    ? 'bg-primary/20 text-primary neon-border'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="username"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      placeholder="Agent codename"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface border border-border/50 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-blue transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                placeholder="Encrypted email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface border border-border/50 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-blue transition-all"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Access key"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-surface border border-border/50 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:glow-blue transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 rounded-lg font-display font-bold text-sm bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground glow-blue hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)] transition-shadow flex items-center justify-center gap-2 bg-[length:200%_100%] animate-glow-shift"
            >
              {isLogin ? 'INITIALIZE SESSION' : 'CREATE AGENT'}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          {/* Bottom text */}
          <p className="text-center text-xs text-muted-foreground mt-6 font-mono">
            {'>'} SECURE CONNECTION ESTABLISHED_
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>|</motion.span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
