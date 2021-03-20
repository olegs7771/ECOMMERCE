import React from 'react';
import sprite2 from '../../img/sprite_material.svg';

export default function BreadCrumbs({
  link1,
  href1,
  link2,
  href2,
  link3,
  href3,
  link4,
  href4,
  current,
}) {
  return (
    <div className="breadcrumbs">
      {href1 && (
        <span>
          <a href={href1} className="breadcrumbs__link">
            {link1}
          </a>
          <svg className="icon">
            <use href={sprite2 + '#icon-keyboard_arrow_right'} />
          </svg>
        </span>
      )}
      {href2 && (
        <span>
          <a href={href2} className="breadcrumbs__link">
            {link2}
          </a>
          <svg className="icon">
            <use href={sprite2 + '#icon-keyboard_arrow_right'} />
          </svg>
        </span>
      )}
      {href3 && (
        <span>
          <a href={href3} className="breadcrumbs__link">
            {link3}
          </a>
          <svg className="icon">
            <use href={sprite2 + '#icon-keyboard_arrow_right'} />
          </svg>
        </span>
      )}
      {href4 && (
        <span>
          <a href={href4} className="breadcrumbs__link">
            {link4}
          </a>
          <svg className="icon">
            <use href={sprite2 + '#icon-keyboard_arrow_right'} />
          </svg>
        </span>
      )}

      <span className="breadcrumbs__link"> {current}</span>
    </div>
  );
}
