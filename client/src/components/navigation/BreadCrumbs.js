import React from 'react';

export default function BreadCrumbs({
  link1,
  href1,
  link2,
  href2,
  link3,
  href3,
}) {
  return (
    <div className="breadcrumbs">
      <a href={href1} className="breadcrumbs__link">
        {link1}
      </a>

      <a href={href2} className="breadcrumbs__link">
        {link2}
      </a>
      <a href={href3} className="breadcrumbs__link">
        {link3}
      </a>
    </div>
  );
}
