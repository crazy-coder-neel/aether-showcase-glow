import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  ConnectionLineType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'framer-motion';
import { useGameStore, type LevelNode } from '@/store/useGameStore';
import { LevelNodeComponent } from '@/components/graph/LevelNode';
import { LevelModal } from '@/components/graph/LevelModal';
import { CyberBackground } from '@/components/graph/CyberBackground';
import { Zap, Target, Trophy, Shield } from 'lucide-react';

const nodeTypes = { levelNode: LevelNodeComponent };

// Build a hierarchical layout: compute tier for each node based on parentIds
function buildHierarchy(levels: LevelNode[]) {
  const tiers: Map<string, number> = new Map();

  // BFS to assign tiers
  const queue: string[] = [];
  levels.forEach((l) => {
    if (!l.parentIds || l.parentIds.length === 0) {
      tiers.set(l.id, 0);
      queue.push(l.id);
    }
  });

  while (queue.length > 0) {
    const id = queue.shift()!;
    const tier = tiers.get(id)!;
    levels.forEach((l) => {
      if (l.parentIds?.includes(id)) {
        const existing = tiers.get(l.id);
        const newTier = tier + 1;
        if (existing === undefined || newTier > existing) {
          tiers.set(l.id, newTier);
        }
        if (!queue.includes(l.id)) queue.push(l.id);
      }
    });
  }

  return tiers;
}

export default function Dashboard() {
  const { levels, user } = useGameStore();
  const [selectedNode, setSelectedNode] = useState<LevelNode | null>(null);

  const handleNodeClick = useCallback((node: LevelNode) => {
    setSelectedNode(node);
  }, []);

  const nodes: Node[] = useMemo(() => {
    const tiers = buildHierarchy(levels);
    const tierGroups: Map<number, LevelNode[]> = new Map();

    levels.forEach((l) => {
      const tier = tiers.get(l.id) ?? 0;
      if (!tierGroups.has(tier)) tierGroups.set(tier, []);
      tierGroups.get(tier)!.push(l);
    });

    const yGap = 220;
    const xGap = 220;

    const result: Node[] = [];
    tierGroups.forEach((group, tier) => {
      const totalWidth = (group.length - 1) * xGap;
      const startX = -totalWidth / 2;

      group.forEach((level, i) => {
        result.push({
          id: level.id,
          type: 'levelNode',
          position: { x: startX + i * xGap, y: tier * yGap },
          data: { ...level, onClick: handleNodeClick },
        });
      });
    });

    return result;
  }, [levels, handleNodeClick]);

  const edges: Edge[] = useMemo(() => {
    const edgeList: Edge[] = [];
    levels.forEach((level) => {
      (level.parentIds || []).forEach((parentId) => {
        const parent = levels.find((l) => l.id === parentId);
        const isActive = parent?.status === 'completed' || level.status === 'current';
        const isCompleted = parent?.status === 'completed' && level.status === 'completed';
        edgeList.push({
          id: `e${parentId}-${level.id}`,
          source: parentId,
          target: level.id,
          type: 'smoothstep',
          animated: level.status === 'current',
          style: {
            stroke: isCompleted
              ? 'hsl(150, 100%, 50%)'
              : isActive
                ? 'hsl(180, 100%, 50%)'
                : 'hsl(225, 100%, 40%)',
            strokeWidth: isCompleted ? 3 : 2,
            opacity: level.status === 'locked' && parent?.status !== 'completed' ? 0.15 : 0.7,
          },
        });
      });
    });
    return edgeList;
  }, [levels]);

  const completedCount = levels.filter((l) => l.status === 'completed').length;
  const progressPercent = Math.round((completedCount / levels.length) * 100);

  const stats = [
    { icon: Target, label: 'Progress', value: `${completedCount}/${levels.length}`, color: 'text-primary', glow: 'neon-border' },
    { icon: Zap, label: 'Score', value: user.score.toLocaleString(), color: 'text-accent', glow: 'neon-border-cyan' },
    { icon: Trophy, label: 'Rank', value: '#4', color: 'text-secondary', glow: 'neon-border-purple' },
    { icon: Shield, label: 'Status', value: progressPercent === 100 ? 'ELITE' : 'ACTIVE', color: 'text-neon-green', glow: 'neon-border' },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-2xl font-bold neon-text-blue tracking-wider"
          >
            MISSION CONTROL
          </motion.h1>
          <p className="text-muted-foreground font-body text-sm mt-1">
            Navigate the skill tree • Complete challenges • Level up
          </p>
          {/* Progress bar */}
          <div className="mt-3 w-64">
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
              <span>PROGRESS</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-neon-green"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`glass-card ${stat.glow} px-4 py-3 flex items-center gap-3`}
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <p className="text-[10px] text-muted-foreground font-mono uppercase">{stat.label}</p>
                <p className={`font-display font-bold text-sm ${stat.color}`}>{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Graph with cyber background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-card neon-border overflow-hidden relative"
        style={{ height: 'calc(100vh - 220px)' }}
      >
        {/* Canvas background effects */}
        <CyberBackground />

        {/* Horizontal scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(180 100% 50% / 0.3), transparent)' }}
          animate={{ y: [0, 600, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          fitViewOptions={{ padding: 0.4 }}
          nodesDraggable={false}
          nodesConnectable={false}
          panOnDrag
          zoomOnScroll
          minZoom={0.3}
          maxZoom={1.8}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        >
          <Background color="hsl(225, 100%, 60%)" gap={50} size={1} style={{ opacity: 0.04 }} />
          <Controls />
        </ReactFlow>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-5 text-xs font-mono text-muted-foreground"
      >
        {[
          { color: 'bg-neon-green', label: 'Completed' },
          { color: 'bg-accent', label: 'Current / Active' },
          { color: 'bg-primary', label: 'Code Challenge' },
          { color: 'bg-secondary', label: 'QR Task' },
          { color: 'bg-muted', label: 'Locked' },
        ].map((item) => (
          <span key={item.label} className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-sm`} />
            {item.label}
          </span>
        ))}
      </motion.div>

      {/* Modal */}
      {selectedNode && <LevelModal node={selectedNode} onClose={() => setSelectedNode(null)} />}
    </div>
  );
}
