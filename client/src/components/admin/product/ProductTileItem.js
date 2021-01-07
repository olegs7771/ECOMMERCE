import React from 'react';

export default function ProductTileItem({ i, p }) {
  return (
    <div className="product__tiles-container--tile" key={i}>
      {p.title}
    </div>
  );
}
