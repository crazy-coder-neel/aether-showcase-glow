import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Lock, Code, QrCode, CheckCircle, Hexagon } from 'lucide-react';
import type { LevelNode as LevelNodeType } from '@/store/useGameStore';

type LevelNodeData = LevelNodeType & { onClick: (node: LevelNodeType) => void };

const statusConfig = {
  locked: { ring: 'border-muted/30', bg: 'bg-muted/10', glow: '', iconColor: 'text-muted-foreground' },
  unlocked: { ring: 'border-primary/60', bg: 'bg-primary/10', glow: 'glow-blue', iconColor: 'text-primary' },
  current: { ring: 'border-accent', bg: 'bg-accent/10', glow: 'glow-cyan', iconColor: 'text-accent' },
  completed: { ring: 'border-neon-green/60', bg: 'bg-neon-green/10', glow: 'glow-cyan', iconColor: 'text-neon-green' },
};

export const LevelNodeComponent = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as LevelNodeData;
  const { status, type, label, onClick } = nodeData;
  const config = statusConfig[status];
  const TypeIcon = type === 'cp' ? Code : QrCode;
  const isCurrent = status === 'current';
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-1 !h-1" />

      <motion.div
        whileHover={!isLocked ? { scale: 1.12, y: -4 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : {}}
        onClick={() => !isLocked && onClick(nodeData)}
        className="relative cursor-pointer select-none group"
      >
        {/* Outer pulse ring for current */}
        {isCurrent && (
          <motion.div
            className="absolute -inset-3 rounded-2xl border border-accent/30"
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        )}

        {/* Second pulse ring */}
        {isCurrent && (
          <motion.div
            className="absolute -inset-5 rounded-2xl border border-accent/15"
            animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
          />
        )}

        {/* Glow backdrop */}
        {!isLocked && (
          <div
            className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 ${
              isCompleted ? 'bg-neon-green/20' : isCurrent ? 'bg-accent/25' : 'bg-primary/15'
            } ${!isLocked ? 'opacity-60 group-hover:opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Main hexagonal-ish card */}
        <div
          className={`relative w-32 h-36 rounded-2xl border-2 ${config.ring} ${config.bg} ${config.glow}
            flex flex-col items-center justify-center gap-2 transition-all duration-300 backdrop-blur-sm
            ${isLocked ? 'opacity-35 grayscale' : ''}`}
        >
          {/* Top badge */}
          <div className={`absolute -top-2 px-3 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase tracking-widest
            ${isCompleted ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
              : isCurrent ? 'bg-accent/20 text-accent border border-accent/30'
              : isLocked ? 'bg-muted/20 text-muted-foreground border border-muted/30'
              : 'bg-primary/20 text-primary border border-primary/30'}`}
          >
            {isCompleted ? '✓ DONE' : isCurrent ? '● ACTIVE' : isLocked ? '🔒 LOCKED' : '○ READY'}
          </div>

          {/* Icon container */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center relative
            ${type === 'cp' ? 'bg-primary/15 border border-primary/20' : 'bg-secondary/15 border border-secondary/20'}`}
          >
            {isLocked ? (
              <Lock className="w-5 h-5 text-muted-foreground" />
            ) : (
              <motion.div
                animate={isCurrent ? { rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <TypeIcon className={`w-5 h-5 ${type === 'cp' ? 'text-primary' : 'text-secondary'}`} />
              </motion.div>
            )}

            {/* Completed checkmark overlay */}
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-neon-green/90 flex items-center justify-center"
              >
                <CheckCircle className="w-3 h-3 text-background" />
              </motion.div>
            )}
          </div>

          {/* Label */}
          <span className="font-display text-[11px] font-bold text-foreground/90 tracking-wide">{label}</span>

          {/* Type indicator */}
          <span className={`text-[9px] font-mono uppercase tracking-wider ${config.iconColor} flex items-center gap-1`}>
            <Hexagon className="w-2.5 h-2.5" />
            {type === 'cp' ? 'CODE' : 'QR SCAN'}
          </span>
        </div>
      </motion.div>

      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-1 !h-1" />
    </>
  );
});

LevelNodeComponent.displayName = 'LevelNodeComponent';
