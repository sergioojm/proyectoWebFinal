'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth';
import { fetchSpotifyData } from '@/lib/spotify';

export default function Dashboard() {
  const router = useRouter();
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        // Aquí se hace la llamada para generar la playlist (o personalizarla)
        const data = await fetchSpotifyData(token);
        setPlaylist(data);
      } catch (error) {
        console.error('Error al obtener playlist', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-center text-3xl">Your Playlist</h1>
      <div className="playlist-container">
        {playlist.map((track) => (
          <div key={track.id} className="track-card">
            <img src={track.albumArt} alt={track.title} />
            <h3>{track.title}</h3>
            <p>{track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
