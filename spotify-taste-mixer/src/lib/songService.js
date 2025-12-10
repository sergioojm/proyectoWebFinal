import { getAccessToken } from '@/lib/auth';

export async function searchTracks(query, selectedArtists, selectedGenres) {
  if (!query) {
    return [];
  }

  const token = getAccessToken();
  try {
    const artistIds = selectedArtists.map((artist) => artist.id).join(',');
    const genreQuery = selectedGenres.join(',');

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=5&seed_artists=${artistIds}&seed_genres=${genreQuery}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await response.json();
    return data.tracks?.items || [];
  } catch (error) {
    console.error('Error searching songs:', error);
    return [];
  }
}

export async function fetchUserProfile() {
  const token = localStorage.getItem('spotify_token');

  if (!token) {
    console.log('No token found!');
    return null;
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function createPlaylistOnSpotify(userId, playlistName, tracks) {
  if (!userId || !playlistName || !tracks.length) {
    throw new Error('Missing required parameters');
  }

  const token = getAccessToken();

  try {
    // Create the playlist
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistName,
          description: 'Playlist created from favorites and filters.',
          public: true,
        }),
      }
    );

    if (!playlistResponse.ok) {
      throw new Error(`Failed to create playlist: ${playlistResponse.statusText}`);
    }

    const playlistData = await playlistResponse.json();

    // Add tracks to the playlist
    const trackUris = tracks.map((track) => track.uri);
    const addTracksResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: trackUris }),
      }
    );

    if (!addTracksResponse.ok) {
      throw new Error(`Failed to add tracks to playlist: ${addTracksResponse.statusText}`);
    }

    return {
      id: playlistData.id,
      url: `https://open.spotify.com/playlist/${playlistData.id}`,
      name: playlistData.name,
    };
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
}

export function saveFavoritesToStorage(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function loadFavoritesFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  } catch (error) {
    console.error('Error loading favorites from storage:', error);
    return [];
  }
}
