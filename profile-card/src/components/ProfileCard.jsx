import React from 'react';
import { profile } from '../profileData';

const ProfileCard = () => {
  return (
    <div>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Profile Card
      </h3>
      <div
        style={{
          padding: '1.5rem',
          border: '1px solid #ccc',
          borderRadius: '10px',
          width: '320px',
          textAlign: 'center',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <img
          src={
            profile.image ||
            'https://images.pexels.com/photos/2080382/pexels-photo-2080382.jpeg'
          }
          alt='profile image'
          width={100}
        />
        <h2>{profile.firstName}</h2>
        <p>
          <em>{profile.role}</em>
        </p>
        <p>{profile.bio}</p>
        <a href={profile.githubLink} target='_blank' rel='noopener noreferrer'>
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
