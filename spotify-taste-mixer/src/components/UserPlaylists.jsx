'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';
import './UserPlaylists.css';

export default function UserPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      setLoading(true);
      setError(null);

      const token = getAccessToken();
      if (!token) {
        setError('No access token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch playlists');
        }

        const data = await response.json();

        // Verificamos si la respuesta contiene playlists
        if (data && data.items) {
          setPlaylists(data.items);
        } else {
          setError('No playlists found');
        }
      } catch (error) {
        setError('Failed to fetch playlists');
        console.error('Error fetching playlists', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlaylists();
  }, []);

  return (
    <div className="user-playlists-container p-4 bg-gray-900 text-white">
      <h2 className="text-2xl mb-4">Your Playlists</h2>
      
      {loading && <div>Loading playlists...</div>}
      {error && <div>Error: {error}</div>}

      <div className="playlists-list">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-item mb-4 p-4 bg-gray-800 rounded-lg flex items-center gap-4">
              <img
                src={playlist.images[0]?.url || 'default-image.png'}
                alt={playlist.name}
                className="playlist-image w-16 h-16 object-cover rounded-md"
              />
              <div className="playlist-info">
                <h3 className="text-xl">{playlist.name}</h3>
                <p>{playlist.owner.display_name}</p>
                <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                  View Playlist
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No playlists available.</p>
        )}
      </div>
    </div>
  );
}
