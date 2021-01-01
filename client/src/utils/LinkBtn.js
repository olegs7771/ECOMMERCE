import React from 'react';
import sprite from '../img/sprite.svg';

export default function LinkBtn({ btnText, spriteIcon }) {
  return (
    <div className="btn-link__block">
      <a href="/admin/category" className="btn-link">
        <svg className="btn-link__icon">
          <use href={sprite + '#icon-arrow-left2'} />
        </svg>
        <div className="btn-link__text">{btnText}</div>
      </a>
    </div>
  );
}
