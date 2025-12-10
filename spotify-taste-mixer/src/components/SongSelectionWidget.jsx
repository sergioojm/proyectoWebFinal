'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';
import './SongSelectionWidget.css'; // Estilos específicos del widget

export default function SongSelectionWidget() {
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
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('spotify_token'); // Suponiendo que el token esté almacenado en localStorage

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
        setUserProfile(data); // Almacenamos la información del usuario
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // Función para manejar la búsqueda
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
      console.error('Error al buscar', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar canciones a favoritos
  const addToFavorites = (track) => {
    // Verificamos si la canción ya está en los favoritos
    if (favorites.some((favorite) => favorite.id === track.id)) {
      alert('This track is already in your favorites!');
      return;
    }

    const updatedFavorites = [...favorites, track];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Función para eliminar una canción de los favoritos
  const removeFromFavorites = (trackId) => {
    const updatedFavorites = favorites.filter((track) => track.id !== trackId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Función para crear la playlist
  const createPlaylist = async () => {
    setIsCreatingPlaylist(true);
    const token = getAccessToken();
    const userId = userProfile?.id || '';

    try {
      // Paso 1: Crear la playlist
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

      // Paso 2: Agregar canciones a la playlist
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
    <div className="song-selection-widget-container p-4 bg-gray-800 rounded-lg">
      {/* Barra de búsqueda */}
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Search for tracks"
        className="search-input p-2 rounded-md bg-gray-700 text-white"
      />
      {loading && <div>Loading...</div>}

      {/* Resultados de la búsqueda */}
      <div className="search-results mt-4">
        {searchResults.map((track) => (
          <div key={track.id} className="search-result-item p-2 bg-gray-700 rounded-md text-white mb-2">
            <p>{track.name} - {track.artists?.[0]?.name}</p>
            <button
              onClick={() => addToFavorites(track)}
              className="add-to-favorites bg-green-500 px-4 py-2 rounded-md text-white"
            >
              Add to Selection
            </button>
          </div>
        ))}
      </div>

      {/* Favoritos */}
      <div className="favorites-container mt-4">
        <h3 className="text-white text-xl">Your Selection</h3>
        <div className="favorites-list">
          {favorites.map((track) => (
            <div key={track.id} className="favorite-item bg-gray-700 p-3 rounded-md mb-3 flex items-center gap-4">
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="favorite-item-image w-16 h-16 object-cover rounded-md"
              />
              <div className="text-white flex-grow">
                <p>{track.name}</p>
                <p>{track.artists?.[0]?.name}</p>
              </div>
              <button
                onClick={() => removeFromFavorites(track.id)}
                className="remove-favorite bg-red-600 px-4 py-2 rounded-md text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Crear Playlist */}
      <div className="create-playlist-container mt-4">
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Enter playlist name"
          className="playlist-name-input p-2 rounded-md bg-gray-700 text-white"
        />
        <button
          onClick={createPlaylist}
          disabled={isCreatingPlaylist || favorites.length === 0}
          className="create-playlist-button bg-blue-500 px-4 py-2 rounded-md text-white mt-2"
        >
          {isCreatingPlaylist ? 'Creating Playlist...' : 'Create Playlist'}
        </button>

        {/* Mostrar enlace a la playlist creada */}
        {playlistLink && (
          <div className="playlist-link mt-2">
            <a href={playlistLink} target="_blank" rel="noopener noreferrer" className="text-green-400">
              View Playlist
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
