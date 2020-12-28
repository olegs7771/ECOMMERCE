// CHILD COMPONENT OF CATEGORY

import React, { useState } from 'react';

export default function CategoryItem({ i, c, _deleteCategory, sprite }) {
  const [isEdit, setIsEdit] = useState(false);
  const _edit = () => setIsEdit(!isEdit);

  return (
    <li className="category__item" key={i}>
      <a href="!#" className="category__link">
        {c.name}
      </a>
      <div className="category__link-icon-box">
        <svg className="category__link-icon" onClick={_edit}>
          <use href={sprite + '#icon-pencil'} />
        </svg>
        <svg
          className="category__link-icon"
          onClick={_deleteCategory.bind(this, c.slug)}
        >
          <use href={sprite + '#icon-cross'} />
        </svg>
      </div>
    </li>
  );
}
