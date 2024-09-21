import {create} from "zustand";

interface State {
  count: number;
  increase: () => void;
  decrease: () => void;
}

export const useStore = create<State>((set) => ({
  count: 0,
  increase: () => set((state: State) => ({count: state.count + 1})),
  decrease: () => set((state: State) => ({count: state.count - 1})),
}));
