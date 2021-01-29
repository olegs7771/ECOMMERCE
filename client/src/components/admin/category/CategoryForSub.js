//This component is child in Sub.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'cloudinary-react';
import {
  getCategoryAction,
  updateCategoryAction,
} from '../../../store/actions/categoryAction';
import no_image from '../../../img/no_image.png';
import TextInputForm from '../../../utils/TextInputForm';
import TextAreaForm from '../../../utils/TextAreaForm';

export default function CategoryForSub({ slug }) {
  const dispatch = useDispatch();

  // REDUX
  const categoryRedux = useSelector((state) => state.category.category);
  // STATE
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [errors, setErrors] = useState({});

  // GET CATEGORY ON LOAD
  useEffect(() => {
    dispatch(getCategoryAction({ slug }));
  }, [dispatch, slug]);

  useEffect(() => {
    setName(categoryRedux.name);
    setDesc(categoryRedux.description ? categoryRedux.description : '');
  }, [categoryRedux]);

  // CANCEL EDIT
  const _cancelEdit = () => {
    setEdit(false);
  };

  const _update = () => {
    const data = {
      name,
      desc,
      slug,
    };
    dispatch(updateCategoryAction(data));
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
              <div className="category__cfs__detail-block-item--text">
                <TextInputForm
                  styles={'category__cfs__detail-block-item__form'}
                  value={name}
                  _onChange={(e) => setName(e.target.value)}
                />
              </div>
            ) : (
              <div className="category__cfs__detail-block-item--text">
                {name}
              </div>
            )}
          </div>
          {/* Description */}
          <div className="category__cfs__detail-block-item">
            <div className="category__cfs__detail-block-item--title">
              Description
            </div>
            {edit ? (
              <TextAreaForm
                value={desc}
                type="text"
                name="desc"
                onChange={(e) => setDesc(e.target.value)}
                rows={7}
                cols={40}
                required={true}
              />
            ) : (
              <div className="category__cfs__detail-block-item--text">
                {desc ? (
                  <div>{desc}</div>
                ) : (
                  <div>Add description to category!</div>
                )}
              </div>
            )}
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
          <button className="btn btn-success" onClick={_update}>
            Update
          </button>
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
