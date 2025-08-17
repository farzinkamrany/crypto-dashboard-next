import { create } from 'zustand';

type State = {
  vsCurrency: 'usd'|'eur'|'irr';
  search: string;
  setVsCurrency: (c: 'usd'|'eur'|'irr') => void;
  setSearch: (s: string) => void;
}

export const useUIStore = create<State>((set) => ({
  vsCurrency: 'usd',
  search: '',
  setVsCurrency: (vsCurrency) => set({ vsCurrency }),
  setSearch: (search) => set({ search }),
}));
