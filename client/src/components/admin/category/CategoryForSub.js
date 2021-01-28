//This component is child in Sub.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'cloudinary-react';
import { getCategoryAction } from '../../../store/actions/categoryAction';
import no_image from '../../../img/no_image.png';

export default function CategoryForSub({ slug }) {
  const dispatch = useDispatch();

  // REDUX
  const categoryRedux = useSelector((state) => state.category.category);

  // GET CATEGORY ON LOAD
  useEffect(() => {
    dispatch(getCategoryAction({ slug }));
  }, [dispatch, slug]);

  return (
    <div className="category__cfs">
      <div className="category__cfs__container">
        {/* ////////////////////////////////// */}
        <div className="category__cfs__img-block">
          {categoryRedux.image ? (
            <Image
              cloudName="dyl4kpmie"
              publicId={categoryRedux.image}
              width="300"
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
          <div className="category__cfs__detail-block-name">
            name:{categoryRedux.name}
          </div>
          <div className="category__cfs__detail-block-desc">
            Description:{categoryRedux.description}
          </div>
          <div className="category__cfs__detail-block-date">
            Updated:{categoryRedux.updatedAt}
          </div>
        </div>
      </div>
    </div>
  );
}
