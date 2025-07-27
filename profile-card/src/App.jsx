import React from 'react';
import ProfileCard from './components/ProfileCard';

const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // full height of the viewport
        backgroundColor: '#f9f9f9',
      }}
    >
      <ProfileCard />
    </div>
  );
};

export default App;
