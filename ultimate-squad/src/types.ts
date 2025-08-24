export type Position = 'GK' | 'DF' | 'MD' | 'FW';

export interface Player {
  id: string;
  name: string;
  number: number;
  position: Position;
  team: string;
  createdAt: number;
  updatedAt: number;
}
