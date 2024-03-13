import { Board } from "@/types";
import { create } from "zustand";

type State = {
  showSidebar: boolean;
  activeBoard: Board | null;
  openNavbarMenu:boolean;
};

type Action = {
  setShowSidebar: (showSidebar: State["showSidebar"]) => void;
  setActiveBoard: (activeBoard: Board) => void;
  setOpenNavbarMenu:(openNavbarMenu:State['openNavbarMenu']) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useSidebarStore = create<State & Action>((set) => ({
  showSidebar: false,
  openNavbarMenu:false,
  activeBoard: null,
  setShowSidebar: (showSidebar) => set(() => ({ showSidebar })),
  setOpenNavbarMenu:(openNavbarMenu) => set(() => ({openNavbarMenu})),
  setActiveBoard: (activeBoard) => set(() => ({ activeBoard })),
}));
