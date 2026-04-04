import { create } from 'zustand';
import type { Task } from '../../../shared/src/competitive-gameplay/task.model.ts';

type MatchStore = {
    matchTask: Task | null;
    setMatchTask: (data: Task) => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
    matchTask: null,
    setMatchTask: (data: Task) => set({ matchTask: data }),
}));
