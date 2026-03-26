import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'framer-motion';
import { useGameStore, type LevelNode } from '@/store/useGameStore';
import { LevelNodeComponent } from '@/components/graph/LevelNode';
import { LevelModal } from '@/components/graph/LevelModal';
import { Zap, Target, Trophy } from 'lucide-react';

const nodeTypes = { levelNode: LevelNodeComponent };

export default function Dashboard() {
  const { levels, user } = useGameStore();
  const [selectedNode, setSelectedNode] = useState<LevelNode | null>(null);

  const handleNodeClick = useCallback((node: LevelNode) => {
    setSelectedNode(node);
  }, []);

  const nodes: Node[] = useMemo(() => {
    const cols = 3;
    const xGap = 200;
    const yGap = 180;
    const startX = 150;

    return levels.map((level, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const xOffset = row % 2 === 1 ? (cols - 1 - col) : col; // zigzag
      return {
        id: level.id,
        type: 'levelNode',
        position: { x: startX + xOffset * xGap, y: 60 + row * yGap },
        data: { ...level, onClick: handleNodeClick },
      };
    });
  }, [levels, handleNodeClick]);

  const edges: Edge[] = useMemo(() =>
    levels.slice(0, -1).map((level, i) => ({
      id: `e${level.id}-${levels[i + 1].id}`,
      source: level.id,
      target: levels[i + 1].id,
      animated: level.status === 'current' || levels[i + 1].status === 'current',
      style: {
        stroke: level.status === 'completed' ? 'hsl(150, 100%, 50%)' : 'hsl(225, 100%, 60%)',
        strokeWidth: 2,
        opacity: level.status === 'locked' ? 0.2 : 0.6,
      },
    })),
    [levels]
  );

  const stats = [
    { icon: Target, label: 'Level', value: `${user.levelsCompleted}/${user.totalLevels}`, color: 'text-primary', glow: 'neon-border' },
    { icon: Zap, label: 'Score', value: user.score.toLocaleString(), color: 'text-accent', glow: 'neon-border-cyan' },
    { icon: Trophy, label: 'Rank', value: '#4', color: 'text-secondary', glow: 'neon-border-purple' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold neon-text-blue">MISSION CONTROL</h1>
          <p className="text-muted-foreground font-body text-sm">Navigate the skill tree • Complete challenges</p>
        </div>
        <div className="flex gap-3">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
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

      {/* Graph */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card neon-border overflow-hidden"
        style={{ height: 'calc(100vh - 200px)' }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          nodesDraggable={false}
          nodesConnectable={false}
          panOnDrag
          zoomOnScroll
          minZoom={0.5}
          maxZoom={1.5}
        >
          <Background color="hsl(225, 100%, 60%)" gap={40} size={1} style={{ opacity: 0.08 }} />
          <Controls />
        </ReactFlow>
      </motion.div>

      {/* Modal */}
      {selectedNode && <LevelModal node={selectedNode} onClose={() => setSelectedNode(null)} />}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
        {[
          { color: 'bg-neon-green', label: 'Completed' },
          { color: 'bg-accent', label: 'Current' },
          { color: 'bg-primary', label: 'Code Challenge' },
          { color: 'bg-secondary', label: 'QR Task' },
          { color: 'bg-muted', label: 'Locked' },
        ].map((item) => (
          <span key={item.label} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
