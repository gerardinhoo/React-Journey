// src/store/rosterStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Player } from '../types';

type RosterState = {
  players: Player[];
  addPlayer: (p: Omit<Player, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePlayer: (id: string, patch: Partial<Omit<Player, 'id'>>) => void;
  removePlayer: (id: string) => void;
  reset: () => void;
};

function uuid() {
  // @ts-ignore
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? // @ts-ignore
      crypto.randomUUID()
    : 'pl-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Only create the storage wrapper on the client
const storage =
  typeof window !== 'undefined'
    ? createJSONStorage<RosterState>(() => window.localStorage)
    : undefined;

export const useRoster = create<RosterState>()(
  persist(
    (set, get) => ({
      players: [],
      addPlayer: (p) => {
        const now = Date.now();
        const newPlayer: Player = {
          ...p,
          id: uuid(),
          createdAt: now,
          updatedAt: now,
        };
        set({ players: [...get().players, newPlayer] });
      },
      updatePlayer: (id, patch) => {
        set({
          players: get().players.map((pl) =>
            pl.id === id ? { ...pl, ...patch, updatedAt: Date.now() } : pl
          ),
        });
      },
      removePlayer: (id) => {
        set({ players: get().players.filter((pl) => pl.id !== id) });
      },
      reset: () => set({ players: [] }),
    }),
    {
      name: 'soccer_roster_v1',
      storage,
      version: 1,
    }
  )
);
