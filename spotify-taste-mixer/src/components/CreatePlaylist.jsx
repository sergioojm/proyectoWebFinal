'use client';

import { useState } from 'react';
import { getAccessToken } from '@/lib/auth';
import './CreatePlaylist.css';

export default function CreatePlaylist({ recommendedTracks }) {
  const [playlistName, setPlaylistName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [playlistLink, setPlaylistLink] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isAddingTracks, setIsAddingTracks] = useState(false);

  const createPlaylist = async () => {
    setIsCreating(true);
    const token = getAccessToken();
    const userId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '';

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

      setPlaylistLink(`https://open.spotify.com/playlist/${playlistData.id}`);
    } catch (error) {
      console.error('Error creating playlist', error);
    } finally {
      setIsCreating(false);
    }
  };

  const addToPlaylist = async () => {
    setIsAddingTracks(true);
    const token = getAccessToken();
    const userId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '';
    const playlistId = playlistLink.split('/').pop(); // Obtener el ID de la playlist creada

    try {
      // Paso 2: Agregar canciones seleccionadas a la playlist
      const tracks = selectedTracks.map(track => track.uri);
      await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ uris: tracks }),
        }
      );
    } catch (error) {
      console.error('Error adding tracks to playlist', error);
    } finally {
      setIsAddingTracks(false);
    }
  };

  const toggleTrackSelection = (track) => {
    setSelectedTracks((prev) => {
      if (prev.includes(track)) {
        return prev.filter(t => t !== track); // Remove track
      } else {
        return [...prev, track]; // Add track
      }
    });
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

      {/* Mostrar las canciones recomendadas */}
      {playlistLink && !isCreating && (
        <div>
          <h3>Choose Tracks to Add to Your Playlist</h3>
          <div className="tracks-list">
            {recommendedTracks.map((track) => (
              <div key={track.id} className="track-item">
                <input
                  type="checkbox"
                  checked={selectedTracks.includes(track)}
                  onChange={() => toggleTrackSelection(track)}
                />
                <img src={track.album.images[0]?.url} alt={track.name} className="track-image" />
                <p>{track.name}</p>
                <p>{track.artists?.[0]?.name}</p>
              </div>
            ))}
          </div>
          <button
            onClick={addToPlaylist}
            disabled={isAddingTracks || selectedTracks.length === 0}
            className="add-tracks-button"
          >
            {isAddingTracks ? 'Adding Tracks...' : 'Add Selected Tracks'}
          </button>
        </div>
      )}
    </div>
  );
}
