import { create } from "zustand";

type State = {
  availableColumns?: {
    id: number;
    name: string;
  }[];
};

type Action = {
  setAvailableColumns: (availableColumns:State['availableColumns']) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useColumnsStore = create<State & Action>((set) => ({
  availableColumns: undefined,
  setAvailableColumns:(availableColumns) => set(() => ({
    availableColumns
  }))
}));
