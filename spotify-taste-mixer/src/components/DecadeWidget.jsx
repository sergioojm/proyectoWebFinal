'use client';

import './DecadeWidget.css';

export default function DecadeWidget({ onSelect }) {
  const decades = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];

  return (
    <div className="widget-container">
      <h3 className="widget-title">Decade</h3>
      <div className="decade-select">
        {decades.map((decade) => (
          <button key={decade} onClick={() => onSelect(decade)} className="decade-button">
            {decade}
          </button>
        ))}
      </div>
    </div>
  );
}
