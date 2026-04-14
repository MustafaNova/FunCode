import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task } from '@funcode/shared';

type MatchStore = {
    matchTask: Task | null;
    setMatchTask: (data: Task) => void;
}

export const useMatchStore = create<MatchStore>()(
    persist(
        (set) => ({
            matchTask: null,
            setMatchTask: (data: Task) => set({ matchTask: data }),
        }),
        {
            name: 'matchStore',
        }
    )
);
