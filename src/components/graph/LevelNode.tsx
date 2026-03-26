import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Lock, Code, QrCode, CheckCircle } from 'lucide-react';
import type { LevelNode as LevelNodeType } from '@/store/useGameStore';

type LevelNodeData = LevelNodeType & { onClick: (node: LevelNodeType) => void };

const statusConfig = {
  locked: { ring: 'border-muted/30', bg: 'bg-surface', glow: '', icon: Lock, iconColor: 'text-muted-foreground' },
  unlocked: { ring: 'border-primary/50', bg: 'bg-surface-light', glow: 'glow-blue', icon: Code, iconColor: 'text-primary' },
  current: { ring: 'border-accent/60', bg: 'bg-accent/10', glow: '', icon: Code, iconColor: 'text-accent' },
  completed: { ring: 'border-neon-green/50', bg: 'bg-neon-green/5', glow: 'glow-cyan', icon: CheckCircle, iconColor: 'text-neon-green' },
};

export const LevelNodeComponent = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as LevelNodeData;
  const { status, type, label, onClick } = nodeData;
  const config = statusConfig[status];
  const TypeIcon = type === 'cp' ? Code : QrCode;
  const StatusIcon = config.icon;
  const isCurrent = status === 'current';
  const isLocked = status === 'locked';

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-primary/50 !border-0 !w-2 !h-2" />
      <motion.div
        whileHover={!isLocked ? { scale: 1.1 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : {}}
        onClick={() => !isLocked && onClick(nodeData)}
        className={`relative cursor-pointer select-none`}
      >
        {isCurrent && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-accent/40"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <div className={`w-28 h-28 rounded-2xl border-2 ${config.ring} ${config.bg} ${config.glow} flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${isLocked ? 'opacity-40' : ''}`}>
          <div className={`w-8 h-8 rounded-lg ${type === 'cp' ? 'bg-primary/20' : 'bg-secondary/20'} flex items-center justify-center`}>
            {isLocked ? <Lock className="w-4 h-4 text-muted-foreground" /> : <TypeIcon className={`w-4 h-4 ${type === 'cp' ? 'text-primary' : 'text-secondary'}`} />}
          </div>
          <span className="font-display text-[10px] font-bold text-foreground/80">{label}</span>
          <span className={`text-[9px] font-mono ${config.iconColor} flex items-center gap-1`}>
            <StatusIcon className="w-3 h-3" />
            {status === 'completed' ? 'DONE' : status === 'current' ? 'ACTIVE' : type === 'cp' ? 'CODE' : 'QR'}
          </span>
        </div>
      </motion.div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary/50 !border-0 !w-2 !h-2" />
    </>
  );
});

LevelNodeComponent.displayName = 'LevelNodeComponent';
