'use client';

import { useState } from 'react';
import { getAccessToken } from '@/lib/auth';

import './CreatePlaylist.css';

export default function CreatePlaylist({ recommendedTracks }) {
  const [playlistName, setPlaylistName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [playlistLink, setPlaylistLink] = useState('');

  const createPlaylist = async () => {
    setIsCreating(true);
    const token = getAccessToken();
    const userId = 'user-id'; // Reemplazar con el ID del usuario obtenido de la API

    try {
      // Paso 1: Crear la playlist
      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: playlistName,
            description: 'Playlist created from recommendations.',
            public: true,
          }),
        }
      );
      const playlistData = await playlistResponse.json();

      // Paso 2: Agregar canciones a la playlist
      const tracks = recommendedTracks.map(track => track.uri);
      await fetch(
        `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ uris: tracks }),
        }
      );

      setPlaylistLink(`https://open.spotify.com/playlist/${playlistData.id}`);
    } catch (error) {
      console.error('Error creating playlist', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="create-playlist-container">
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="Enter playlist name"
        className="playlist-name-input"
      />
      <button
        onClick={createPlaylist}
        disabled={isCreating}
        className="create-playlist-button"
      >
        {isCreating ? 'Creating Playlist...' : 'Create Playlist'}
      </button>

      {playlistLink && (
        <div className="playlist-link">
          <a href={playlistLink} target="_blank" rel="noopener noreferrer">
            View Playlist
          </a>
        </div>
      )}
    </div>
  );
}
