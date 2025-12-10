'use client';

import './PopularityWidget.css';

export default function PopularityWidget({ onSelect }) {
  const handleSliderChange = (e) => {
    onSelect(e.target.value);
  };

  return (
    <div className="widget-container">
      <h3 className="widget-title">Popularity</h3>
      <input
        type="range"
        min="0"
        max="100"
        defaultValue="50"
        onChange={handleSliderChange}
        className="popularity-slider"
      />
    </div>
  );
}
