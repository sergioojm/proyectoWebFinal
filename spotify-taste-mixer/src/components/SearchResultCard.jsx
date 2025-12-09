export default function SearchResultCard({ item }) {
  return (
    <div className="result-card">
      <img
        src={item.album?.images[0]?.url || item.images[0]?.url}
        alt={item.name}
        className="result-image"
      />
      <p>{item.name}</p>
      <p>{item.artists ? item.artists[0]?.name : 'Unknown Artist'}</p>
    </div>
  );
}
