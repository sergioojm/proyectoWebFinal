'use client';

import './Playlist.css';

export default function Playlist({ tracks, onRemove, onFavorite }) {
  return (
    <div className="playlist-container">
      <h3 className="playlist-title">Your Playlist</h3>
      <div className="playlist-cards">
        {tracks.map((track) => (
          <div key={track.id} className="playlist-track">
            <img src={track.albumArt} alt={track.name} className="track-image" />
            <h4>{track.name}</h4>
            <button onClick={() => onFavorite(track)} className="favorite-button">❤️</button>
            <button onClick={() => onRemove(track.id)} className="remove-button">❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}
