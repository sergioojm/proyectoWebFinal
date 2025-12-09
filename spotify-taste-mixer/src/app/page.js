'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl text-white">🎵 Spotify Taste Mixer</h1>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-full mt-5"
          onClick={handleLogin}
        >
          Iniciar sesión con Spotify
        </button>
      </div>
    </div>
  );
}
