import './PlaylistTrackCard.css';

export default function PlaylistTrackCard({ track }) {
  return (
    <div className="track-card">
      <img src={track.album.images[0]?.url} alt={track.name} className="track-image" />
      <h3>{track.name}</h3>
      <p>{track.artists[0].name}</p>
    </div>
  );
}