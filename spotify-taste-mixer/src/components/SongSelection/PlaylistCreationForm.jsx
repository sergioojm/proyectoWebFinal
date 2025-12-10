'use client';

import '../SongSelectionWidget.css';

export function PlaylistCreationForm({
  playlistName,
  onNameChange,
  isCreating,
  isFavoritesEmpty,
  onCreatePlaylist,
  playlistLink,
  creationError,
}) {
  return (
    <div className="create-playlist-container">
      <input
        type="text"
        value={playlistName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Enter playlist name"
        className="playlist-name-input"
        disabled={isCreating}
      />

      {creationError && <div className="playlist-error">{creationError}</div>}

      <button
        onClick={onCreatePlaylist}
        disabled={isCreating || isFavoritesEmpty}
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
