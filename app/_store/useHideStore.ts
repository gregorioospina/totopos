import { create } from "zustand";

interface HideState {
	hide: boolean;
	setHide: (hide: boolean) => void;
}

export const useHideStore = create<HideState>((set) => ({
	hide: true,
	setHide: (hide) => set({ hide }),
}));
