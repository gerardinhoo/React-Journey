import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useRoster } from '../store/rosterStore';
import type { Player, Position } from '../types';
import RosterFilters from './RosterFilters';

export default function RosterList() {
  const players = useRoster((s) => s.players);
  const reset = useRoster((s) => s.reset);
  const add = useRoster((s) => s.addPlayer);

  // filters
  const [position, setPosition] = useState<'ALL' | Position>('ALL');
  const [team, setTeam] = useState<'ALL' | string>('ALL');
  const [q, setQ] = useState('');

  const teams = Array.from(new Set(players.map((p) => p.team))).sort();
  const filtered = players.filter((p) => {
    const posOK = position === 'ALL' || p.position === position;
    const teamOK = team === 'ALL' || p.team === team;
    const qOK = !q || p.name.toLowerCase().includes(q.toLowerCase());
    return posOK && teamOK && qOK;
  });

  const onClearFilters = () => {
    setPosition('ALL');
    setTeam('ALL');
    setQ('');
  };

  const onResetAll = () => {
    if (!players.length) return;
    const ok = window.confirm(
      `This will remove ${players.length} player${
        players.length > 1 ? 's' : ''
      }. Continue?`
    );
    if (ok) reset();
  };

  const onSeed = () => {
    const sample = [
      {
        name: 'Dinho Dinho',
        number: 10,
        position: 'MD',
        team: 'Speedy Turtle FC',
      },
      {
        name: 'Alex Guard',
        number: 1,
        position: 'GK',
        team: 'Speedy Turtle FC',
      },
      { name: 'Sam Rock', number: 5, position: 'DF', team: 'Speedy Turtle FC' },
      {
        name: 'Leo Swift',
        number: 7,
        position: 'FW',
        team: 'Lightning United',
      },
      { name: 'Mo Pivot', number: 8, position: 'MD', team: 'Lightning United' },
      { name: 'Kai Wall', number: 3, position: 'DF', team: 'River City SC' },
    ] as const;
    sample.forEach((p) => add(p));
  };

  return (
    <>
      <div className='card'>
        <div className='table-toolbar'>
          <h2 className='card-title'>Roster</h2>
          <div className='toolbar-actions'>
            <button
              className='btn btn-ghost'
              onClick={onSeed}
              title='Add sample data'
            >
              Add Sample Players
            </button>
            <button
              className='btn btn-danger-outline'
              onClick={onResetAll}
              disabled={!players.length}
              aria-disabled={!players.length}
              title='Remove all players'
            >
              Reset All
            </button>
          </div>
        </div>
        {/* Filters */}
        <RosterFilters
          position={position}
          setPosition={setPosition}
          team={team}
          setTeam={setTeam}
          q={q}
          setQ={setQ}
          teams={teams}
          onClear={onClearFilters}
        />
        {/* Table */}
        {filtered.length ? (
          <table className='table' role='table' aria-label='Team roster'>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Pos</th>
                <th>Team</th>
                <th>Updated</th>
                <th aria-label='Actions'></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <Row key={p.id} p={p} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className='empty'>
            <p>No matches with current filters.</p>
          </div>
        )}
      </div>

      {/* Empty-state helper if there are no players at all */}
      {!players.length && (
        <div className='card'>
          <p>You don’t have any players yet.</p>
          <div style={{ marginTop: 8 }}>
            <button className='btn btn-primary' onClick={onSeed}>
              Add Sample Players
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ p }: { p: Player }) {
  const update = useRoster((s) => s.updatePlayer);
  const remove = useRoster((s) => s.removePlayer);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(p.name);
  const [number, setNumber] = useState<number | ''>(p.number);
  const [position, setPosition] = useState<Position>(p.position);
  const [team, setTeam] = useState(p.team);

  const save = () => {
    update(p.id, { name, number: Number(number), position, team });
    setEditing(false);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') setEditing(false);
  };

  const onRemove = () => {
    const ok = window.confirm(`Remove ${p.name}?`);
    if (ok) remove(p.id);
  };

  return (
    <tr>
      <td width={72}>
        {editing ? (
          <input
            className='input input-sm'
            type='number'
            value={number}
            onKeyDown={onKey}
            onChange={(e) =>
              setNumber(e.target.value === '' ? '' : Number(e.target.value))
            }
          />
        ) : (
          <span className='badge'>#{p.number}</span>
        )}
      </td>

      <td>
        {editing ? (
          <input
            className='input input-sm'
            value={name}
            onKeyDown={onKey}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          p.name
        )}
      </td>

      <td width={120}>
        {editing ? (
          <select
            className='input input-sm'
            value={position}
            onKeyDown={onKey}
            onChange={(e) => setPosition(e.target.value as Position)}
          >
            <option value='GK'>GK</option>
            <option value='DF'>DF</option>
            <option value='MD'>MD</option>
            <option value='FW'>FW</option>
          </select>
        ) : (
          <span className='chip'>{p.position}</span>
        )}
      </td>

      <td>
        {editing ? (
          <input
            className='input input-sm'
            value={team}
            onKeyDown={onKey}
            onChange={(e) => setTeam(e.target.value)}
          />
        ) : (
          p.team
        )}
      </td>

      <td className='muted'>{new Date(p.updatedAt).toLocaleString()}</td>

      <td className='actions'>
        {!editing ? (
          <>
            <button className='btn btn-ghost' onClick={() => setEditing(true)}>
              Edit
            </button>
            <button className='btn btn-danger-outline' onClick={onRemove}>
              Remove
            </button>
          </>
        ) : (
          <>
            <button className='btn btn-primary' onClick={save}>
              Save
            </button>
            <button className='btn btn-ghost' onClick={() => setEditing(false)}>
              Cancel
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
