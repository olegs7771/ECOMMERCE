// CHILD COMPONENT OF CATEGORY

import React, { useState, useEffect } from 'react';

export default function CategoryItem({ c, _deleteCategory, sprite, subs }) {
  const [subState, setSubState] = useState([]);

  // FILTER ALL SUB-CATEGORIES BY ID RETURN ARRAY
  const subQuantity = (id) => {
    let filteredArray = [];
    subs.forEach((elem) => {
      if (elem.categoryId === id) {
        filteredArray.push(elem);
      }
    });
    return filteredArray;
  };
  // SET SUBS QUANTITY IN STATE ARRAY
  useEffect(() => {
    setSubState(subQuantity(c._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subs]);

  return (
    <div className="category__item-block">
      <li className="category__item">
        <a href={`/admin/sub/${c._id}/${c.slug}`} className="category__link">
          {c.name}
        </a>

        <div className="category__link-icon-box">
          <a
            href={`/admin/sub/${c._id}/${c.slug}`}
            className="category__link--qnt"
          >
            {/* QUANTITY  */}
            <div className="category__item-qnt">
              <span className="category__item-qnt--text">
                [{subState.length}]
              </span>
              sub-categories
            </div>
          </a>

          <svg
            className="category__link-icon icon"
            onClick={_deleteCategory.bind(this, [c.slug, c._id])}
          >
            <use href={sprite + '#icon-bin'} />
          </svg>
        </div>
      </li>
    </div>
  );
}
