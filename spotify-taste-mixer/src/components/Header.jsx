'use client';

import Link from 'next/link';
import './Header.css';
import { logout } from '@/lib/auth';
import { useState, useEffect } from 'react';

export default function Header() {

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('spotify_token'); // Suponiendo que el token esté almacenado en localStorage

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
        setUserProfile(data); // Almacenamos la información del usuario
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);


  return (
    <header className="header-container flex justify-between items-center p-4 bg-black text-white">
      <div className="logo-container flex-1">
        <h1 className="header-logo text-2xl font-bold text-green-500">Spotify Taste Mixer</h1>
      </div>

      <nav className="navigation flex items-center gap-4">
        <Link href="/dashboard" className="nav-link hover:text-green-500">Home</Link>
        <Link href="/playlist-creator" className="nav-link hover:text-green-500">Creator</Link>

        {userProfile && (
          <div className="user-profile flex items-center gap-2">
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
          className="logout-button bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
