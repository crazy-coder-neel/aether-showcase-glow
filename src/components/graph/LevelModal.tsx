import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, QrCode, Send, Lock, CheckCircle } from 'lucide-react';
import type { LevelNode } from '@/store/useGameStore';
import { useGameStore } from '@/store/useGameStore';

interface Props {
  node: LevelNode | null;
  onClose: () => void;
}

export const LevelModal = ({ node, onClose }: Props) => {
  const [qrInput, setQrInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const completeLevel = useGameStore((s) => s.completeLevel);

  if (!node) return null;

  const handleQrSubmit = () => {
    if (qrInput.toUpperCase() === node.qrPassword?.toUpperCase()) {
      setSuccess(true);
      setError('');
      completeLevel(node.id);
      setTimeout(onClose, 1500);
    } else {
      setError('Invalid password. Try again.');
    }
  };

  const handleCPSubmit = () => {
    setSuccess(true);
    completeLevel(node.id);
    setTimeout(onClose, 1500);
  };

  const isCp = node.type === 'cp';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-lg glass-card p-6 ${isCp ? 'neon-border' : 'neon-border-purple'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isCp ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                {isCp ? <span className="text-primary font-display text-sm">CP</span> : <QrCode className="w-5 h-5 text-secondary" />}
              </div>
              <div>
                <h2 className={`font-display font-bold ${isCp ? 'neon-text-blue' : 'neon-text-purple'}`}>{node.label}</h2>
                <p className="text-xs text-muted-foreground font-mono">{isCp ? 'CODING CHALLENGE' : 'EXPLORATION TASK'}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Description */}
          <p className="text-foreground/80 font-body mb-6 leading-relaxed">{node.description}</p>

          {success ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-neon-green mx-auto mb-4" />
              <p className="font-display text-neon-green font-bold text-lg">LEVEL COMPLETE!</p>
              <p className="text-muted-foreground font-mono text-sm mt-1">+1000 XP</p>
            </motion.div>
          ) : isCp ? (
            <div className="space-y-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={node.problemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary/20 border border-primary/30 text-primary font-display font-semibold text-sm hover:bg-primary/30 transition-all"
              >
                Solve on HackerRank <ExternalLink className="w-4 h-4" />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCPSubmit}
                className="w-full py-3 rounded-lg font-display font-bold text-sm bg-gradient-to-r from-primary to-accent text-primary-foreground glow-blue"
              >
                MARK AS COMPLETED
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="glass-card neon-border-cyan p-4 text-center">
                <QrCode className="w-12 h-12 text-accent mx-auto mb-2" />
                <p className="text-sm text-muted-foreground font-body">Scan the QR code and enter the password</p>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter QR password..."
                  value={qrInput}
                  onChange={(e) => { setQrInput(e.target.value); setError(''); }}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface border border-border/50 text-foreground font-mono uppercase tracking-wider placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 focus:glow-cyan transition-all"
                />
              </div>
              {error && <p className="text-neon-pink text-xs font-mono">{error}</p>}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleQrSubmit}
                className="w-full py-3 rounded-lg font-display font-bold text-sm bg-gradient-to-r from-secondary to-accent text-primary-foreground glow-purple flex items-center justify-center gap-2"
              >
                SUBMIT <Send className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
