import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ActiveScreen = {
    course: string | null,
    module: string | null,
    unlockedLevel: number,
};

type ActiveScreenStore = ActiveScreen & {
    setAC: (data: ActiveScreen) => void,
    unlockNextLevel: () => void,
};



export const useActiveScreen = create<ActiveScreenStore>()(
    persist(
        (set) => ({
            course: null,
            module: null,
            unlockedLevel: 0,
            setAC: (data: ActiveScreen) => set({
                course: data.course,
                module: data.module,
                unlockedLevel: data.unlockedLevel
            }),
            unlockNextLevel: () => set((state) => ({unlockedLevel: state.unlockedLevel + 1}))
        }),
        {
            name: 'active-screen-storage',
        },
    )
);
