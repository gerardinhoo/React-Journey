// src/App.tsx
import HydrationGate from './components/HydrationGate';
import RosterForm from './components/RosterForm';
import RosterList from './components/RosterList';
import { useRoster } from './store/rosterStore';
import './styles/roster.css';

const App = () => {
  const reset = useRoster((s) => s.reset);

  return (
    <HydrationGate>
      <main style={{ maxWidth: 840, margin: '40px auto', padding: 16 }}>
        <h1>Ultimate Soccer Squad</h1>
        <RosterForm />
        <div style={{ marginTop: 12 }}>
          <button onClick={reset}>Reset All</button>
        </div>
        <RosterList />
      </main>
    </HydrationGate>
  );
};

export default App;
