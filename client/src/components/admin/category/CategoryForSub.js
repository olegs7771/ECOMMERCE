//This component is child in Sub.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'cloudinary-react';
import { getCategoryAction } from '../../../store/actions/categoryAction';
import no_image from '../../../img/no_image.png';
import TextInputForm from '../../../utils/TextInputForm';

export default function CategoryForSub({ slug }) {
  const dispatch = useDispatch();

  // REDUX
  const categoryRedux = useSelector((state) => state.category.category);
  // STATE
  const [edit, setEdit] = useState(false);

  // GET CATEGORY ON LOAD
  useEffect(() => {
    dispatch(getCategoryAction({ slug }));
  }, [dispatch, slug]);

  // CANCEL EDIT
  const _cancelEdit = () => {
    setEdit(false);
  };

  return (
    <div className="category__cfs">
      <div className="category__cfs__container mb-sm">
        {/* ////////////////////////////////// */}
        <div className="category__cfs__img-block">
          {categoryRedux.image ? (
            <Image
              cloudName="dyl4kpmie"
              publicId={categoryRedux.image}
              width="600"
              crop="scale"
              className="category__cfs__img-block--image "
            />
          ) : (
            <img
              src={no_image}
              alt="no_image"
              className="category__cfs__img-block--image"
            />
          )}
        </div>
        {/* //////////////////////////////////// */}
        <div className="category__cfs__detail-block">
          {/* Name */}
          <div className="category__cfs__detail-block-item">
            <div className="category__cfs__detail-block-item--title">Name</div>
            {edit ? (
              <TextInputForm />
            ) : (
              <div className="category__cfs__detail-block-item--text">
                {categoryRedux.name}
              </div>
            )}
          </div>
          {/* Description */}
          <div className="category__cfs__detail-block-item">
            <div className="category__cfs__detail-block-item--title">
              Description
            </div>
            <div className="category__cfs__detail-block-item--text">
              {categoryRedux.description}
            </div>
          </div>
          {/* Updated */}
          <div className="category__cfs__detail-block-item">
            <div className="category__cfs__detail-block-item--title">
              Updated
            </div>
            <div className="category__cfs__detail-block-item--text">
              {categoryRedux.updatedAt}
            </div>
          </div>
        </div>
      </div>
      {edit ? (
        <div className="category__cfs__btn-group">
          <button className="btn">Edit</button>
          <button className="btn btn-grey" onClick={_cancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="category__cfs__btn-group">
          <button className="btn" onClick={() => setEdit(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
