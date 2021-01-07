import React, { useState } from 'react';

export default function ProductTileItem({ i, p }) {
  const [focus, setFocus] = useState(false);
  const _focus = () => {
    setFocus(!focus);
  };

  return (
    <div
      className={
        focus
          ? 'product__tiles-container--tile-focus'
          : 'product__tiles-container--tile'
      }
      key={i}
      onClick={_focus}
    >
      {p.title}
    </div>
  );
}
