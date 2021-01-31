//This component is child in Sub.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'cloudinary-react';
import {
  clearMessageReduxState,
  clearErrorReduxState,
  getCategoryAction,
  updateCategoryAction,
} from '../../../store/actions/categoryAction';
import no_image from '../../../img/no_image.png';

import TextAreaForm from '../../../utils/TextAreaForm';
import CategoryImageForm from './CategoryImageForm';
import { Spinner } from '../../../utils/LoadingComponent';

export default function CategoryForSub({ slug }) {
  const dispatch = useDispatch();

  // REDUX
  const categoryRedux = useSelector((state) => state.category.category);

  const messageRedux = useSelector((state) => state.message.messageCategory);
  const errorsRedux = useSelector((state) => state.error.errors);
  const loadingRedux = useSelector(
    (state) => state.loading.loadingItemCategory
  );

  // STATE
  const [edit, setEdit] = useState(false); //edit details
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(false); //toggle to show previous image or not

  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(''); //format64 string

  // GET CATEGORY ON LOAD
  useEffect(() => {
    dispatch(getCategoryAction({ slug }));
  }, [dispatch, slug]);

  // SET TO STATE
  useEffect(() => {
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
      desc,
      slug,
      image,
    };
    dispatch(updateCategoryAction(data));
  };

  const _onChangeDesc = (e) => {
    setDesc(e.target.value);
    dispatch(clearErrorReduxState());
  };

  const _setImage = (data) => {
    console.log('data', data);
    setImage(data.file);
  };
  // SET PREVIEW FROM CHILD
  const _preview = (state) => {
    setPreview(state);
  };

  const _acceptMessage = () => {
    dispatch(getCategoryAction({ slug }));
    setPreview(false);
    setEdit(false);
    dispatch(clearMessageReduxState());
  };

  return (
    <div className="category__cfs">
      {messageRedux ? (
        <div className="message ">
          <div className="message--text mb-sm">{messageRedux}</div>
          <button className="btn" onClick={_acceptMessage}>
            OK
          </button>
        </div>
      ) : (
        <div>
          {loadingRedux || !categoryRedux ? (
            <Spinner loading={loadingRedux || !categoryRedux} />
          ) : (
            <div className="category__cfs">
              <div className="category__cfs__container mb-sm">
                {/* ////////////////////////////////// */}
                <div className="category__cfs__img-block">
                  <div className="category__cfs__img-box mb-sm">
                    {/* EDIT IMAGE  */}
                    {edit ? (
                      <div>
                        {!preview && (
                          <Image
                            cloudName="dyl4kpmie"
                            publicId={categoryRedux.image}
                            width="600"
                            crop="scale"
                            className="category__cfs__img-block--image "
                          />
                        )}

                        <CategoryImageForm
                          _selectImage={_setImage}
                          isPreviewOn={_preview}
                        />
                      </div>
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
          )}
        </div>
      )}
    </div>
  );
}
