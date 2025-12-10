'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';
import PlaylistTrackCard from '@/components/PlaylistTrackCard';

import './Top50Global.css';

export default function Top50Global() {
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    const fetchTopTracks = async () => {
      setLoading(true);
      setError(null); // Limpiamos cualquier error previo
      const token = getAccessToken();

      if (!token) {
        setError('No access token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/browse/featured-playlists?limit=50`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch top tracks');
        }

        const data = await response.json();

        // Verificamos que la respuesta contenga 'playlists' y 'items'
        if (data && data.playlists && data.playlists.items) {
          setTopTracks(data.playlists.items);
        } else {
          setError('No top tracks found in the response');
        }
      } catch (error) {
        console.error('Error fetching top 50 global', error);
        setError('Failed to fetch top tracks');
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
  }, []);

  if (loading) {
    return <div>Loading Top 50 Global...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="top-50-global-container">
      <div className="top-50-global-list">
        {topTracks.map((track) => (
          <PlaylistTrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}