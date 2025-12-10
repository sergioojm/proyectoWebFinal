'use client';

import { useState, useEffect } from 'react';
// funciones creadas en un .js aparte para una mejor organizacion
import { searchTracks, fetchUserProfile, createPlaylistOnSpotify, saveFavoritesToStorage, loadFavoritesFromStorage } from '@/lib/songService';
import { SearchInput } from './SongSelection/SearchInput';
import { SearchResults } from './SongSelection/SearchResults';
import { FavoritesContainer } from './SongSelection/FavoritesContainer';
import { PlaylistCreationForm } from './SongSelection/PlaylistCreationForm';
import './SongSelectionWidget.css';

export default function SongSelectionWidget({ addError, selectedArtists, selectedGenres }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [playlistLink, setPlaylistLink] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [creationError, setCreationError] = useState(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);


  useEffect(() => {
    const loadInitialData = async () => {
      const savedFavorites = loadFavoritesFromStorage();
      setFavorites(savedFavorites);

      const profile = await fetchUserProfile();
      setUserProfile(profile);
    };

    loadInitialData();
  }, []);

  // Handle search with debouncing
  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      const results = await searchTracks(searchQuery, selectedArtists, selectedGenres);
      setSearchResults(results);
      setLoading(false);
    }, 300);

    setDebounceTimeout(timeout);
  };

  // Add track to favorites
  const handleAddToFavorites = (track) => {
    if (favorites.some((favorite) => favorite.id === track.id)) {
      if (addError) {
        addError('This track is already in your favorites!');
      }
      return;
    }

    const updatedFavorites = [...favorites, track];
    setFavorites(updatedFavorites);
    saveFavoritesToStorage(updatedFavorites);
  };

  // Remove track from favorites
  const handleRemoveFromFavorites = (trackId) => {
    const updatedFavorites = favorites.filter((track) => track.id !== trackId);
    setFavorites(updatedFavorites);
    saveFavoritesToStorage(updatedFavorites);
  };

  // Create playlist on Spotify
  const handleCreatePlaylist = async () => {
    if (!playlistName.trim()) {
      setCreationError('Please enter a playlist name');
      return;
    }

    if (!userProfile?.id) {
      setCreationError('User profile not loaded. Please refresh the page.');
      return;
    }

    setIsCreatingPlaylist(true);
    setCreationError(null);

    try {
      const result = await createPlaylistOnSpotify(
        userProfile.id,
        playlistName,
        favorites
      );

      setPlaylistLink(result.url);
      setPlaylistName('');
    } catch (error) {
      setCreationError(error.message || 'Failed to create playlist');
      if (addError) {
        addError(error.message || 'Failed to create playlist');
      }
    } finally {
      setIsCreatingPlaylist(false);
    }
  };

  return (
    <div className="song-selection-widget-container">
      <SearchInput
        query={query}
        onChange={handleSearch}
        placeholder="Search for tracks"
        loading={loading}
      />

      <SearchResults
        results={searchResults}
        onAddToFavorites={handleAddToFavorites}
      />

      <FavoritesContainer
        favorites={favorites}
        onRemove={handleRemoveFromFavorites}
      />

      <PlaylistCreationForm
        playlistName={playlistName}
        onNameChange={setPlaylistName}
        isCreating={isCreatingPlaylist}
        isFavoritesEmpty={favorites.length === 0}
        onCreatePlaylist={handleCreatePlaylist}
        playlistLink={playlistLink}
        creationError={creationError}
      />
    </div>
  );
}
