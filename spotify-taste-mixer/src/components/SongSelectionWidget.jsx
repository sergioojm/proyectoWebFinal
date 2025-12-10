'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';
import './SongSelectionWidget.css'; 



export default function SongSelectionWidget({ addError }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [playlistLink, setPlaylistLink] = useState('');
  const [userProfile, setUserProfile] = useState(null);

 
  
  useEffect(() => {

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);

    const fetchUserProfile = async () => {
      const token = localStorage.getItem('spotify_token'); 

      if (!token) {
        console.log('No token found!');
        return;
      }

      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserProfile(data); 
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  
  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    const token = getAccessToken();
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setSearchResults(data.tracks.items);
    } catch (error) {
      console.error('Error al buscar canciones', error);
    } finally {
      setLoading(false);
    }
  };

  
  const addToFavorites = (track) => {
    if (favorites.some((favorite) => favorite.id === track.id)) {
      addError('This track is already in your favorites!');
      return;
    }

    const updatedFavorites = [...favorites, track];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

 
  const removeFromFavorites = (trackId) => {
    const updatedFavorites = favorites.filter((track) => track.id !== trackId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Función para crear la playlist en Spotify
  const createPlaylist = async () => {
    setIsCreatingPlaylist(true);
    const token = getAccessToken();
    const userId = userProfile?.id || '';

    try {
      
      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: playlistName,
            description: 'Playlist created from favorites.',
            public: true,
          }),
        }
      );
      const playlistData = await playlistResponse.json();

      
      const tracks = favorites.map((track) => track.uri);
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
      setIsCreatingPlaylist(false);
    }
  };

  return (
    <div className="song-selection-widget-container">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Search for tracks"
        className="search-input"
      />
      {loading && <div className="loading-indicator">Loading...</div>}

      <div className="search-results">
        {searchResults.map((track) => (
          <div key={track.id} className="search-result-item">
            <p>{track.name} - {track.artists?.[0]?.name}</p>
            <button
              onClick={() => addToFavorites(track)}
              className="add-to-favorites"
            >
              Add to Selection
            </button>
          </div>
        ))}
      </div>

      <div className="favorites-container">
        <h3 className="favorites-title">Your Selection</h3>
        <div className="favorites-list">
          {favorites.map((track) => (
            <div key={track.id} className="favorite-item">
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="favorite-item-image"
              />
              <div className="favorite-item-info">
                <p className="favorite-item-name">{track.name}</p>
                <p className="favorite-item-artist">{track.artists?.[0]?.name}</p>
              </div>
              <button
                onClick={() => removeFromFavorites(track.id)}
                className="remove-favorite"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

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
          disabled={isCreatingPlaylist || favorites.length === 0}
          className="create-playlist-button"
        >
          {isCreatingPlaylist ? 'Creating Playlist...' : 'Create Playlist'}
        </button>

        {playlistLink && (
          <div className="playlist-link">
            <a href={playlistLink} target="_blank" rel="noopener noreferrer">
              View Playlist
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
