'use client';



export default function Header() {
  return (
    <header className="header-container">
      <h1>Spotify Taste Mixer</h1>
      <button onClick={() => alert('Logout clicked')} className="logout-button">
        Logout
      </button>
    </header>
  );
}
