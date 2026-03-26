import { create } from 'zustand';

export interface LevelNode {
  id: string;
  label: string;
  type: 'cp' | 'qr';
  status: 'locked' | 'unlocked' | 'current' | 'completed';
  description?: string;
  problemUrl?: string;
  qrPassword?: string;
  parentIds?: string[];
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  score: number;
  levelsCompleted: number;
  hackerrankUsername: string;
}

interface GameState {
  user: {
    username: string;
    email: string;
    avatar: string;
    hackerrankUsername: string;
    score: number;
    levelsCompleted: number;
    totalLevels: number;
  };
  levels: LevelNode[];
  leaderboard: LeaderboardEntry[];
  isAuthenticated: boolean;
  sidebarOpen: boolean;
  login: (email: string, password: string) => void;
  signup: (username: string, email: string, password: string) => void;
  logout: () => void;
  toggleSidebar: () => void;
  completeLevel: (id: string) => void;
}

// Hierarchical tree: 1 root → 2 children → branches out
const mockLevels: LevelNode[] = [
  // Tier 0 (root)
  { id: '1', label: 'GENESIS', type: 'cp', status: 'completed', description: 'Two Sum - Find two numbers that add up to target', problemUrl: 'https://hackerrank.com', parentIds: [] },
  // Tier 1 (2 nodes)
  { id: '2', label: 'CIPHER', type: 'qr', status: 'completed', description: 'Scan the QR code at the library entrance', qrPassword: 'CYBER2024', parentIds: ['1'] },
  { id: '3', label: 'VECTOR', type: 'cp', status: 'current', description: 'Binary Search - Find element in sorted array', problemUrl: 'https://hackerrank.com', parentIds: ['1'] },
  // Tier 2 (3 nodes)
  { id: '4', label: 'MATRIX', type: 'qr', status: 'locked', description: 'Find the QR code hidden in the CS lab', qrPassword: 'NEON42', parentIds: ['2'] },
  { id: '5', label: 'NEXUS', type: 'cp', status: 'locked', description: 'Graph Traversal - BFS shortest path', problemUrl: 'https://hackerrank.com', parentIds: ['2', '3'] },
  { id: '6', label: 'PRISM', type: 'qr', status: 'locked', description: 'Scan QR at the rooftop observatory', qrPassword: 'HACK99', parentIds: ['3'] },
  // Tier 3 (4 nodes)
  { id: '7', label: 'PHANTOM', type: 'cp', status: 'locked', description: 'Dynamic Programming - Longest subsequence', problemUrl: 'https://hackerrank.com', parentIds: ['4'] },
  { id: '8', label: 'ECLIPSE', type: 'qr', status: 'locked', description: 'Hidden QR in the main auditorium', qrPassword: 'GLITCH', parentIds: ['4', '5'] },
  { id: '9', label: 'VORTEX', type: 'cp', status: 'locked', description: 'Segment Tree - Range query optimization', problemUrl: 'https://hackerrank.com', parentIds: ['5', '6'] },
  { id: '10', label: 'OMEGA', type: 'qr', status: 'locked', description: 'Final QR - The grand reveal', qrPassword: 'WINNER', parentIds: ['6'] },
];

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'CyberNinja', avatar: '🥷', score: 9500, levelsCompleted: 10, hackerrankUsername: 'cyberninja' },
  { rank: 2, username: 'NeonHacker', avatar: '👾', score: 8800, levelsCompleted: 9, hackerrankUsername: 'neonhacker' },
  { rank: 3, username: 'QuantumCoder', avatar: '🧬', score: 8200, levelsCompleted: 8, hackerrankUsername: 'quantumcoder' },
  { rank: 4, username: 'ByteStorm', avatar: '⚡', score: 7500, levelsCompleted: 7, hackerrankUsername: 'bytestorm' },
  { rank: 5, username: 'PixelPhantom', avatar: '👻', score: 6900, levelsCompleted: 7, hackerrankUsername: 'pixelphantom' },
  { rank: 6, username: 'ShadowByte', avatar: '🌑', score: 6200, levelsCompleted: 6, hackerrankUsername: 'shadowbyte' },
  { rank: 7, username: 'GlitchMaster', avatar: '🎮', score: 5500, levelsCompleted: 5, hackerrankUsername: 'glitchmaster' },
  { rank: 8, username: 'VoidRunner', avatar: '🚀', score: 4800, levelsCompleted: 5, hackerrankUsername: 'voidrunner' },
  { rank: 9, username: 'CryptoWolf', avatar: '🐺', score: 4100, levelsCompleted: 4, hackerrankUsername: 'cryptowolf' },
  { rank: 10, username: 'DataWraith', avatar: '💀', score: 3500, levelsCompleted: 3, hackerrankUsername: 'datawraith' },
];

export const useGameStore = create<GameState>((set) => ({
  user: {
    username: 'CyberAgent',
    email: 'agent@cyber.dev',
    avatar: '🤖',
    hackerrankUsername: 'cyberagent',
    score: 3200,
    levelsCompleted: 2,
    totalLevels: 10,
  },
  levels: mockLevels,
  leaderboard: mockLeaderboard,
  isAuthenticated: false,
  sidebarOpen: true,
  login: () => set({ isAuthenticated: true }),
  signup: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  completeLevel: (id) =>
    set((s) => {
      const levels = s.levels.map((l) => {
        if (l.id === id) return { ...l, status: 'completed' as const };
        return l;
      });
      // Unlock children whose all parents are completed
      const updated = levels.map((l) => {
        if (l.status !== 'locked') return l;
        const parents = l.parentIds || [];
        const allParentsDone = parents.length > 0 && parents.every(pid => {
          const parent = levels.find(p => p.id === pid);
          return parent?.status === 'completed';
        });
        if (allParentsDone) return { ...l, status: 'current' as const };
        return l;
      });
      const completed = updated.filter((l) => l.status === 'completed').length;
      return { levels: updated, user: { ...s.user, levelsCompleted: completed, score: completed * 1000 + 200 } };
    }),
}));
