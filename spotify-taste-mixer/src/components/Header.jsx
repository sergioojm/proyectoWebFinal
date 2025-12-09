'use client';

import './Header.css';

import { logout } from '@/lib/auth';

export default function Header() {
  return (
    <header className="header-container">
      <h1>Spotify Taste Mixer</h1>
      <button onClick={() => logout()} className="logout-button">
        Logout
      </button>
    </header>
  );
}
