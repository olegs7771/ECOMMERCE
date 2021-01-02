// CHILD COMPONENT OF CATEGORY

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateSubAction } from '../../../store/actions/subAction';
import { clearMessageReduxState } from '../../../store/actions/categoryAction';

export default function SubItem({ c, _deleteSub, sprite }) {
  //  REDUX
  const dispatch = useDispatch();
  const loadingItem = useSelector((state) => state.loading.loadingItemCategory);
  const message = useSelector((state) => state.message.message);
  const error = useSelector((state) => state.error.error);

  const [isEdit, setIsEdit] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [messageState, setMessageState] = useState(null);
  const [name, setName] = useState('');

  const _editToggle = () => {
    setIsEdit(!isEdit);
    setName(c.slug);
    setErrorState(null); //clear errors
  };

  const _onChange = (e) => {
    setName(e.target.value);
    setErrorState(null); //clean state errors
  };

  const _updateCategory = () => {
    const data = {
      slug: c.slug,
      name,
      categoryId: c.categoryId,
    };
    dispatch(updateSubAction(data));
  };
  // SET ERRORS IN STATE
  useEffect(() => {
    setErrorState(error);
  }, [error]);
  // SET MESSAGE IN STATE
  useEffect(() => {
    if (message) {
      setMessageState(message);

      // CLEAN
      setTimeout(() => {
        setIsEdit(false); //AFTER UPDATE DONE BACK TO LIST MODE in 3s
        setMessageState(null); // CLEAR MESSAGE
        dispatch(clearMessageReduxState()); //CLEAR MESSAGE IN REDUX STATE
      }, 5000);
    }
  }, [message]);

  return (
    <div className="category__item-block">
      {isEdit ? (
        // EDIT CATEGORY ITEM
        <li className="category__item">
          <input
            type="text"
            name="name"
            className="category__input"
            value={name}
            onChange={_onChange}
            required
          />
          {/* ERROR  */}
          {errorState ? (
            <div className="category__error">{errorState}</div>
          ) : null}
          {/* message  */}
          {messageState ? (
            <div className="category__message">{messageState}</div>
          ) : null}
          {/* LOADING ITEM  null if message or error appears*/}
          {loadingItem ? (
            <svg
              className="category__link-icon--spinner"
              onClick={_updateCategory}
            >
              <use href={sprite + '#icon-spinner'} />
            </svg>
          ) : null}
          <div className="category__link-icon-box">
            <svg className="category__link-icon" onClick={_updateCategory}>
              <use href={sprite + '#icon-checkmark'} />
            </svg>
            <svg className="category__link-icon" onClick={_editToggle}>
              <use href={sprite + '#icon-cross'} />
            </svg>
          </div>
        </li>
      ) : (
        //////////////////////////////////////////////////////
        <li className="category__item">
          <a href={`/admin/${c._id}/sub`} className="category__link">
            {c.name}
          </a>
          <div className="category__link-icon-box">
            <svg className="category__link-icon" onClick={_editToggle}>
              <use href={sprite + '#icon-pencil'} />
            </svg>
            <svg
              className="category__link-icon"
              onClick={_deleteSub.bind(this, c.slug)}
            >
              <use href={sprite + '#icon-bin'} />
            </svg>
          </div>
        </li>
      )}
    </div>
  );
}