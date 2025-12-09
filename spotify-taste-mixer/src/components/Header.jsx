'use client';

import { signOut } from 'next-auth/react';

export default function Header() {
  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl">Spotify Taste Mixer</h1>
      <button
        onClick={() => signOut()}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
}
