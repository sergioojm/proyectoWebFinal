'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';
import './UserStats.css';

export default function UserStats() {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      const token = getAccessToken();
      if (!token) {
        setError('No access token found');
        setLoading(false);
        return;
      }

      try {
        // Obtener el Top 10 de Artistas
        const artistsResponse = await fetch('https://api.spotify.com/v1/me/top/artists?limit=10', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!artistsResponse.ok) {
          throw new Error('Failed to fetch top artists');
        }

        const artistsData = await artistsResponse.json();
        if (artistsData && artistsData.items) {
          setTopArtists(artistsData.items);
        } else {
          setError('No top artists found');
        }

        // Obtener el Top 10 de Canciones
        const tracksResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!tracksResponse.ok) {
          throw new Error('Failed to fetch top tracks');
        }

        const tracksData = await tracksResponse.json();
        if (tracksData && tracksData.items) {
          setTopTracks(tracksData.items);
        } else {
          setError('No top tracks found');
        }
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading stats...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-stats-container p-4 bg-gray-900 text-white">
      <h2 className="text-2xl mb-4">Your Top 10 Artists</h2>

      {topArtists.length > 0 ? (
        <div className="top-artists-list">
          {topArtists.map((artist) => (
            <div key={artist.id} className="top-artist-item mb-4 p-4 bg-gray-800 rounded-lg flex items-center gap-4">
              <img
                src={artist.images[0]?.url || 'default-image.png'}
                alt={artist.name}
                className="artist-image w-16 h-16 object-cover rounded-md"
              />
              <div className="artist-info">
                <h3 className="text-xl">{artist.name}</h3>
                <p>{artist.followers?.total} followers</p>
                <p>Popularity: {artist.popularity}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No artists found.</p>
      )}

      <h2 className="text-2xl mb-4 mt-8">Your Top 10 Tracks</h2>

      {topTracks.length > 0 ? (
        <div className="top-tracks-list">
          {topTracks.map((track) => (
            <div key={track.id} className="top-track-item mb-4 p-4 bg-gray-800 rounded-lg flex items-center gap-4">
              <img
                src={track.album.images[0]?.url || 'default-image.png'}
                alt={track.name}
                className="track-image w-16 h-16 object-cover rounded-md"
              />
              <div className="track-info">
                <h3 className="text-xl">{track.name}</h3>
                <p>{track.artists?.[0]?.name}</p>
                <p>Popularity: {track.popularity}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No tracks found.</p>
      )}
    </div>
  );
}
