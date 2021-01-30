import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import sprite from '../../../img/sprite.svg';
import { clearErrorReduxState } from '../../../store/actions/categoryAction';
export default function CardImageForm({ _selectImage }) {
  const dispatch = useDispatch();
  // REDUX

  const [selectedFile, setSelectFile] = useState(null);
  const [selectedFilePreview, setSelectFilePreview] = useState(null);
  const [preview, setPreview] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const _onChange = (e) => {
    console.log('e.target', e.target);
    console.log('changed', e.target.files[0]);
    if (!e.target.files[0]) {
      setSelectFilePreview(null);
      setPreview(false);
    }

    setPreview(true);
    setSelectFile(e.target.files[0]);
    // setSelectFilePreview(URL.createObjectURL(e.target.files[0]));

    previewFile(e.target.files[0]);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectFilePreview(reader.result);
    };
  };

  const _submit = (e) => {
    e.preventDefault();

    if (!selectedFile || !preview) return;
    // uploadImage(selectedFilePreview);
    setSubmitted(true);
    uploadImage(selectedFilePreview);
  };

  const uploadImage = (base64EncodedImage) => {
    const data = {
      file: base64EncodedImage,
    };
    _selectImage(data);
  };

  // SET DELETE MODE HERE AND IN PARENT

  // const [selectedFilePreview, setSelectFilePreview] = useState(null);
  // const [preview, setPreview] = useState(false);
  // const [deleteState, setDeleteState] = useState(false);
  const _clearState = (e) => {
    console.log('canceled');
    setPreview(false);
    setSelectFilePreview(null);
    setSelectFile(null);
    setSubmitted(false);
    dispatch(clearErrorReduxState());
  };
  return (
    <div className="category__cta-block__image-form ">
      {!preview && (
        <span className="category__cta-block__image-form-title ">
          Pick image for category
        </span>
      )}
      {preview && (
        <div className="category__cta-block__image-form-preview  ">
          <img
            src={selectedFilePreview}
            alt="preview"
            className="profile__avatar-container--preview-img"
            width="100%"
          />
        </div>
      )}
      <form
        onSubmit={_submit}
        className="category__cta-block__image-form-container "
      >
        <label className="custom-file-input-container ">
          <input
            type="file"
            name="image"
            onChange={_onChange}
            className="custom-file-input"
            key={Date.now()} //for reseting input file state
          />
          {submitted && (
            <svg className="icon category__cta-block__image-form-icon">
              <use href={sprite + '#icon-checkmark'} />
            </svg>
          )}
        </label>

        {preview && (
          <div className="category__cta-block__image-form__btn-group">
            {preview ? (
              <button className="btn btn-success btn-sm" type="submit">
                Confirm
              </button>
            ) : (
              <button className="btn " type="submit">
                Submit
              </button>
            )}
            <button
              className="btn btn-grey btn-sm"
              type="button"
              onClick={_clearState}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
