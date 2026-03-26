import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Trophy, User, LogOut, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const Sidebar = () => {
  const { sidebarOpen, toggleSidebar, logout } = useGameStore();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 240 : 72 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col glass-card border-r border-border/50 rounded-none"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 h-16 border-b border-border/30">
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
          className="w-10 h-10 rounded-lg bg-primary/20 neon-border flex items-center justify-center shrink-0"
        >
          <Zap className="w-5 h-5 text-primary" />
        </motion.div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-display text-sm font-bold neon-text-blue whitespace-nowrap"
            >
              CYBERQUEST
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-primary/15 neon-border text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-light'
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'group-hover:text-accent'}`} />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-body font-semibold text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-border/30 space-y-1">
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { logout(); navigate('/'); }}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-neon-pink hover:bg-neon-pink/10 transition-all"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-body font-semibold text-sm">
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
        >
          {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </motion.button>
      </div>
    </motion.aside>
  );
};
