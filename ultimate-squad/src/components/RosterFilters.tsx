import type { Position } from '../types';

type Props = {
  position: 'ALL' | Position;
  setPosition: (v: 'ALL' | Position) => void;
  team: 'ALL' | string;
  setTeam: (v: 'ALL' | string) => void;
  q: string;
  setQ: (v: string) => void;
  teams: string[];
  onClear: () => void;
};

export default function RosterFilters({
  position,
  setPosition,
  team,
  setTeam,
  q,
  setQ,
  teams,
  onClear,
}: Props) {
  return (
    <div className='card filters'>
      <div className='grid'>
        <label className='field'>
          <span>Position</span>
          <select
            className='input'
            value={position}
            onChange={(e) => setPosition(e.target.value as any)}
          >
            <option value='ALL'>All</option>
            <option value='GK'>GK</option>
            <option value='DF'>DF</option>
            <option value='MD'>MD</option>
            <option value='FW'>FW</option>
          </select>
        </label>

        <label className='field'>
          <span>Team</span>
          <select
            className='input'
            value={team}
            onChange={(e) => setTeam(e.target.value as any)}
          >
            <option value='ALL'>All</option>
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className='field'>
          <span>Search name</span>
          <input
            className='input'
            placeholder='Type to filter…'
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
      </div>

      <div className='filters-actions'>
        <button className='btn btn-ghost' onClick={onClear}>
          Clear filters
        </button>
      </div>
    </div>
  );
}
