import { create } from 'zustand';

export interface LevelNode {
  id: string;
  label: string;
  type: 'cp' | 'qr';
  status: 'locked' | 'unlocked' | 'current' | 'completed';
  description?: string;
  problemUrl?: string;
  qrPassword?: string;
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

const mockLevels: LevelNode[] = [
  { id: '1', label: 'Level 1', type: 'cp', status: 'completed', description: 'Two Sum - Find two numbers that add up to target', problemUrl: 'https://hackerrank.com' },
  { id: '2', label: 'Level 2', type: 'qr', status: 'completed', description: 'Scan the QR code at the library entrance', qrPassword: 'CYBER2024' },
  { id: '3', label: 'Level 3', type: 'cp', status: 'current', description: 'Binary Search - Find element in sorted array', problemUrl: 'https://hackerrank.com' },
  { id: '4', label: 'Level 4', type: 'qr', status: 'locked', description: 'Find the QR code hidden in the CS lab', qrPassword: 'NEON42' },
  { id: '5', label: 'Level 5', type: 'cp', status: 'locked', description: 'Graph Traversal - BFS shortest path', problemUrl: 'https://hackerrank.com' },
  { id: '6', label: 'Level 6', type: 'qr', status: 'locked', description: 'Scan QR at the rooftop observatory', qrPassword: 'HACK99' },
  { id: '7', label: 'Level 7', type: 'cp', status: 'locked', description: 'Dynamic Programming - Longest subsequence', problemUrl: 'https://hackerrank.com' },
  { id: '8', label: 'Level 8', type: 'qr', status: 'locked', description: 'Hidden QR in the main auditorium', qrPassword: 'GLITCH' },
  { id: '9', label: 'Level 9', type: 'cp', status: 'locked', description: 'Segment Tree - Range query optimization', problemUrl: 'https://hackerrank.com' },
  { id: '10', label: 'Level 10', type: 'qr', status: 'locked', description: 'Final QR - The grand reveal', qrPassword: 'WINNER' },
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
      const nextIdx = levels.findIndex((l) => l.id === id) + 1;
      if (nextIdx < levels.length && levels[nextIdx].status === 'locked') {
        levels[nextIdx] = { ...levels[nextIdx], status: 'current' };
      }
      const completed = levels.filter((l) => l.status === 'completed').length;
      return { levels, user: { ...s.user, levelsCompleted: completed, score: completed * 1000 + 200 } };
    }),
}));
