import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { useGameStore } from '@/store/useGameStore';

export const MainLayout = () => {
  const { isAuthenticated, sidebarOpen } = useGameStore();

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen cyber-grid">
      <Sidebar />
      <motion.main
        animate={{ marginLeft: sidebarOpen ? 240 : 72 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="min-h-screen"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 lg:p-8"
        >
          <Outlet />
        </motion.div>
      </motion.main>
    </div>
  );
};
