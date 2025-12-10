'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';
import './PlaylistStatsWidget.css';

export default function PlaylistStatsWidget() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [playlistStats, setPlaylistStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const token = getAccessToken();
      if (!token) return;

      setLoading(true);
      try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPlaylists(data.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlaylistSelect = async (playlistId) => {
    setSelectedPlaylist(playlistId);
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        }
      );
      const data = await response.json();

      if (data) {
        setPlaylistStats({
          playlistName: data.name,
          playlistDescription: data.description || 'No description available',
          trackCount: data.tracks.total,
          playlistImage: data.images[0]?.url || 'default-image.png',
          playlistOwner: data.owner.display_name || 'Unknown',
        });
      } else {
        setPlaylistStats(null);
      }
    } catch (error) {
      console.error('Error fetching playlist stats:', error);
      setPlaylistStats(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="widget-container">
      <h2 className="widget-title">Select a Playlist</h2>

      {loading && <div className="text-white">Loading playlists...</div>}

      <select
        className="playlist-dropdown"
        onChange={(e) => handlePlaylistSelect(e.target.value)}
        value={selectedPlaylist}
      >
        <option value="">-- Select Playlist --</option>
        {playlists.map((playlist) => (
          <option key={playlist.id} value={playlist.id}>
            {playlist.name}
          </option>
        ))}
      </select>

      {playlistStats && (
        <div className="playlist-stats mt-4">
          <h3 className="text-white text-xl">Playlist Stats</h3>
          <div className="playlist-info mb-4">
            {playlistStats.playlistImage && (
              <img
                src={playlistStats.playlistImage}
                alt="Playlist Image"
                className="playlist-image"
              />
            )}
            <p className="text-white">Description: {playlistStats.playlistDescription}</p>
            <p className="text-white">Owner: {playlistStats.playlistOwner}</p>
            <p className="text-white">Track Count: {playlistStats.trackCount}</p>
          </div>
        </div>
      )}
    </div>
  );
}
