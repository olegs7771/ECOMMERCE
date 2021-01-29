//This component is child in Sub.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'cloudinary-react';
import {
  // clearMessageReduxState,
  clearErrorReduxState,
  getCategoryAction,
  updateCategoryAction,
} from '../../../store/actions/categoryAction';
import no_image from '../../../img/no_image.png';
import TextInputForm from '../../../utils/TextInputForm';
import TextAreaForm from '../../../utils/TextAreaForm';
import CategoryImageForm from './CategoryImageForm';

export default function CategoryForSub({ slug }) {
  const dispatch = useDispatch();

  // REDUX
  const categoryRedux = useSelector((state) => state.category.category);
  const errorsRedux = useSelector((state) => state.error.errors);
  // STATE
  const [edit, setEdit] = useState(false); //edit details
  const [errors, setErrors] = useState({});
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(''); //format64 string

  // GET CATEGORY ON LOAD
  useEffect(() => {
    dispatch(getCategoryAction({ slug }));
  }, [dispatch, slug]);

  // SET TO STATE
  useEffect(() => {
    setName(categoryRedux.name);
    setDesc(categoryRedux.description ? categoryRedux.description : '');
  }, [categoryRedux]);

  // SET ERRORS TO STATE
  useEffect(() => {
    setErrors(errorsRedux);
  }, [errorsRedux]);

  // CANCEL EDIT
  const _cancelEdit = () => {
    setEdit(false);
  };

  const _update = () => {
    const data = {
      name,
      desc,
      slug,
      image,
    };
    dispatch(updateCategoryAction(data));
  };

  const _onChangeName = (e) => {
    setName(e.target.value);
    dispatch(clearErrorReduxState());
  };
  const _onChangeDesc = (e) => {
    setDesc(e.target.value);
    dispatch(clearErrorReduxState());
  };

  const _setImage = (data) => {
    console.log('data', data);
    setImage(data.file);
  };

  return (
    <div className="category__cfs">
      <div className="category__cfs__container mb-sm">
        {/* ////////////////////////////////// */}
        <div className="category__cfs__img-block">
          <div className="category__cfs__img-box mb-sm">
            {/* EDIT IMAGE  */}
            {edit ? (
              <CategoryImageForm _selectImage={_setImage} />
            ) : (
              <div>
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
            )}
          </div>
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
                  _onChange={_onChangeName}
                  error={errors.name}
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
                onChange={_onChangeDesc}
                rows={5}
                cols={40}
                required={true}
                error={errors.description}
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
              {new Date(categoryRedux.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      {edit || image ? (
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
