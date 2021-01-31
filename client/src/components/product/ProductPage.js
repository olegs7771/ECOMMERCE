import React from 'react';

export default function ProductPage({ image, title, price, brand }) {
  return (
    <div className="pub-category__card">
      <img src="" alt="" className="pub-category__card--img" />

      <div className="pub-category__card__bottom">
        {/* CARD BOTTOM LEFT */}
        <div className="pub-category__card__details">
          <div className="pub-category__card__details--name">{title}</div>
          <div className="pub-category__card__details--brand">{brand}</div>
          <div className="pub-category__card__details--price">{price}</div>
        </div>
        {/* CARD BOTTOM RIGHT */}
        <div className="pub-category__card__cart">icon +</div>
      </div>
    </div>
  );
}
