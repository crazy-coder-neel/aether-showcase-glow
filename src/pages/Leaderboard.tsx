import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { Trophy, Medal, Star, TrendingUp } from 'lucide-react';

const rankColors = ['neon-text-cyan', 'neon-text-purple', 'neon-text-pink'];
const rankGlows = ['neon-border-cyan', 'neon-border-purple', ''];
const rankIcons = [Trophy, Medal, Star];

export default function Leaderboard() {
  const { leaderboard } = useGameStore();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-display text-2xl font-bold neon-text-blue">LEADERBOARD</h1>
        <p className="text-muted-foreground font-body text-sm">Top agents ranked by score</p>
      </div>

      {/* Top 3 */}
      <div className="grid grid-cols-3 gap-4">
        {leaderboard.slice(0, 3).map((entry, i) => {
          const Icon = rankIcons[i];
          return (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`glass-card ${rankGlows[i] || 'neon-border'} p-5 text-center relative overflow-hidden ${i === 0 ? 'row-span-1 -mt-2' : ''}`}
            >
              <motion.div
                className="absolute inset-0 opacity-5"
                style={{ background: `radial-gradient(circle at 50% 0%, currentColor, transparent 70%)` }}
              />
              <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center bg-surface-light border border-border/50 ${rankColors[i]}`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-3xl mb-2">{entry.avatar}</p>
              <p className={`font-display font-bold text-sm ${rankColors[i]}`}>{entry.username}</p>
              <p className="font-display text-xl font-bold text-foreground mt-1">{entry.score.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground font-mono mt-1">{entry.levelsCompleted} levels</p>
            </motion.div>
          );
        })}
      </div>

      {/* Rest of leaderboard */}
      <div className="glass-card neon-border overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_100px_100px] gap-4 p-4 border-b border-border/30 text-xs font-mono text-muted-foreground uppercase">
          <span>Rank</span><span>Agent</span><span className="text-right">Score</span><span className="text-right">Levels</span>
        </div>
        {leaderboard.slice(3).map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            whileHover={{ backgroundColor: 'hsl(225, 100%, 60%, 0.05)' }}
            className="grid grid-cols-[60px_1fr_100px_100px] gap-4 p-4 border-b border-border/20 items-center"
          >
            <span className="font-display font-bold text-muted-foreground">#{entry.rank}</span>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{entry.avatar}</span>
              <div>
                <p className="font-display font-semibold text-sm text-foreground">{entry.username}</p>
                <p className="text-xs text-muted-foreground font-mono">@{entry.hackerrankUsername}</p>
              </div>
            </div>
            <p className="text-right font-display font-bold text-sm text-primary">{entry.score.toLocaleString()}</p>
            <div className="text-right flex items-center justify-end gap-1">
              <TrendingUp className="w-3 h-3 text-neon-green" />
              <span className="font-mono text-sm text-foreground">{entry.levelsCompleted}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
