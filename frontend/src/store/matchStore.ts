import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TaskDto } from '@funcode/shared';

type MatchStore = {
    matchTask: TaskDto | null;
    setMatchTask: (data: TaskDto) => void;
}

export const useMatchStore = create<MatchStore>()(
    persist(
        (set) => ({
            matchTask: null,
            setMatchTask: (data: TaskDto) => set({ matchTask: data }),
        }),
        {
            name: 'matchStore',
        }
    )
);
