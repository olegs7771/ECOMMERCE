// CHILD COMPONENT OF CATEGORY

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCategoryAction } from '../../../store/actions/categoryAction';

export default function CategoryItem({ c, _deleteCategory, sprite }) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('');

  const _edit = () => {
    setIsEdit(!isEdit);
    setName(c.slug);
  };

  const dispatch = useDispatch();
  const _updateCategory = () => {
    const data = {
      slug: c.slug,
      name,
    };
    dispatch(updateCategoryAction(data));
  };

  return (
    <div className="category__item-block">
      {isEdit ? (
        // EDIT CATEGORY ITEM
        <li className="category__item">
          <input
            type="name"
            name="name"
            className="category__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <svg
            className="category__link-icon--spinner"
            onClick={_updateCategory}
          >
            <use href={sprite + '#icon-spinner'} />
          </svg>
          <div className="category__link-icon-box">
            <svg className="category__link-icon" onClick={_updateCategory}>
              <use href={sprite + '#icon-checkmark'} />
            </svg>
            <svg className="category__link-icon" onClick={_edit}>
              <use href={sprite + '#icon-cross'} />
            </svg>
          </div>
        </li>
      ) : (
        //////////////////////////////////////////////////////
        <li className="category__item">
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
              <use href={sprite + '#icon-bin'} />
            </svg>
          </div>
        </li>
      )}
    </div>
  );
}
