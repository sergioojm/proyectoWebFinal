'use client';

import Link from 'next/link';
import './Header.css';
import Search from '@/components/Search';
import { logout } from '@/lib/auth';

export default function Header() {
  return (
    <header className="header-container flex justify-between items-center p-4 bg-black text-white">
      <div className="logo-container flex-1">
        <h1 className="header-logo text-2xl font-bold text-green-500">Spotify Taste Mixer</h1>
      </div>

      <nav className="navigation flex items-center gap-4">
        <Link href="/" className="nav-link hover:text-green-500">Home</Link>
        <Search /> {/* Componente de búsqueda */}
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
