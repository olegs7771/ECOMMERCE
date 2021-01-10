import React from 'react';

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
      <a href={href1} className="breadcrumbs__link">
        {link1}
      </a>
      <a href={href2} className="breadcrumbs__link">
        {link2}
      </a>
      <a href={href3} className="breadcrumbs__link">
        {link3}&nbsp;&nbsp;
      </a>
      <a href={href4} className="breadcrumbs__link">
        {link4}
      </a>
      <span className="breadcrumbs__link">&rsaquo;&nbsp;&nbsp; {current}</span>
    </div>
  );
}
