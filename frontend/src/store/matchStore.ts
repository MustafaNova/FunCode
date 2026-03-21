import { create } from 'zustand';


export const useMatchStore = create((set) => ({
    matchTask: null,
    setMatchTask: (data: string) => set({ matchTask: data }),
}));
