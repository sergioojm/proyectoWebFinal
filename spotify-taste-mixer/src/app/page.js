'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="text-4xl text-white mb-6">🎵 Spotify Taste Mixer</h1>
        <button
          onClick={handleLogin}
          className="login-button"
        >
          Login with Spotify
        </button>
      </div>
    </div>
  );
}
