'use client';

import Link from 'next/link';
import './Header.css';
import { logout } from '@/lib/auth';
import { useState, useEffect } from 'react';

export default function Header() {

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('spotify_token'); 

      if (!token) {
        console.log('No token found!');
        return;
      }

      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserProfile(data); 
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);


  return (
    <header className="header-container">
      <div className="logo-container">
        <h1 className="header-logo">Spotify Taste Mixer</h1>
      </div>

      <nav className="navigation">
        <Link href="/dashboard" className="nav-link">Home</Link>
        <Link href="/playlist-creator" className="nav-link">Creator</Link>

        {userProfile && (
          <div className="user-profile">
            <img
              src={userProfile.images[0]?.url || 'default-avatar.png'}
              alt={userProfile.display_name}
              className="user-profile-image w-10 h-10 rounded-full"
            />
            <p>{userProfile.display_name}</p>
          </div>
        )}


        <button
          onClick={() => {
            logout();
            window.location.reload();
          }}
          className="logout-button"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
