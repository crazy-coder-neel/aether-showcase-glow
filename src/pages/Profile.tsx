import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { User, Zap, Target, Trophy, Code, QrCode, ExternalLink } from 'lucide-react';

export default function Profile() {
  const { user, levels } = useGameStore();
  const completedLevels = levels.filter((l) => l.status === 'completed');
  const cpCompleted = completedLevels.filter((l) => l.type === 'cp').length;
  const qrCompleted = completedLevels.filter((l) => l.type === 'qr').length;
  const progress = (user.levelsCompleted / user.totalLevels) * 100;

  const stats = [
    { icon: Target, label: 'Levels Done', value: `${user.levelsCompleted}/${user.totalLevels}`, color: 'text-primary', border: 'neon-border' },
    { icon: Zap, label: 'Total Score', value: user.score.toLocaleString(), color: 'text-accent', border: 'neon-border-cyan' },
    { icon: Code, label: 'CP Solved', value: cpCompleted, color: 'text-primary', border: 'neon-border' },
    { icon: QrCode, label: 'QR Scanned', value: qrCompleted, color: 'text-secondary', border: 'neon-border-purple' },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="font-display text-2xl font-bold neon-text-blue">AGENT PROFILE</h1>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card neon-border p-6 flex items-center gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-20 h-20 rounded-2xl bg-primary/20 neon-border flex items-center justify-center text-4xl shrink-0"
        >
          {user.avatar}
        </motion.div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-xl font-bold text-foreground">{user.username}</h2>
          <p className="text-muted-foreground font-mono text-sm">{user.email}</p>
          <a
            href={`https://hackerrank.com/${user.hackerrankUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:text-primary-light text-xs font-mono mt-1 transition-colors"
          >
            @{user.hackerrankUsername} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display text-3xl font-bold neon-text-cyan">{user.score}</p>
          <p className="text-xs text-muted-foreground font-mono">TOTAL XP</p>
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card neon-border-cyan p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="font-display text-sm font-bold text-accent">MISSION PROGRESS</p>
          <p className="font-mono text-sm text-foreground">{Math.round(progress)}%</p>
        </div>
        <div className="w-full h-3 rounded-full bg-surface overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary glow-cyan"
          />
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`glass-card ${stat.border} p-4 text-center`}
          >
            <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
            <p className={`font-display text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-[10px] text-muted-foreground font-mono uppercase mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Level History */}
      <div className="glass-card neon-border p-5">
        <h3 className="font-display text-sm font-bold neon-text-blue mb-4">COMPLETION LOG</h3>
        <div className="space-y-2">
          {levels.map((level, i) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-lg ${level.status === 'completed' ? 'bg-neon-green/5 border border-neon-green/20' : level.status === 'current' ? 'bg-accent/5 border border-accent/20' : 'bg-surface/50 border border-border/20 opacity-40'}`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-display font-bold ${
                level.status === 'completed' ? 'bg-neon-green/20 text-neon-green' : level.status === 'current' ? 'bg-accent/20 text-accent' : 'bg-muted/20 text-muted-foreground'
              }`}>
                {level.id}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-sm text-foreground">{level.label}</p>
                <p className="text-xs text-muted-foreground font-mono truncate">{level.type === 'cp' ? 'Code Challenge' : 'QR Exploration'}</p>
              </div>
              <span className={`text-[10px] font-mono px-2 py-1 rounded-md ${
                level.status === 'completed' ? 'bg-neon-green/20 text-neon-green' : level.status === 'current' ? 'bg-accent/20 text-accent animate-pulse' : 'bg-muted/20 text-muted-foreground'
              }`}>
                {level.status.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
