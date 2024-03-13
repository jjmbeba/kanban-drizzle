import { Board } from "@/types";
import { create } from "zustand";

type State = {
  showSidebar: boolean;
  activeBoard: Board | null;
};

type Action = {
  setShowSidebar: (showSidebar: State["showSidebar"]) => void;
  setActiveBoard: (activeBoard: Board) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useSidebarStore = create<State & Action>((set) => ({
  showSidebar: false,
  activeBoard: null,
  setShowSidebar: (showSidebar) => set(() => ({ showSidebar })),
  setActiveBoard: (activeBoard) => set(() => ({ activeBoard })),
}));
