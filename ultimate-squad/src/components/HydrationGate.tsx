import type { PropsWithChildren } from 'react';
import { useRoster } from '../store/rosterStore';
import { useState, useEffect } from 'react';

const HydrationGate = ({ children }: PropsWithChildren) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Zustand persist helpers:
    setHydrated(useRoster.persist.hasHydrated());
    const unsub = useRoster.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);

  if (!hydrated) return null; // or a small skeleton
  return <>{children}</>;
};

export default HydrationGate;
