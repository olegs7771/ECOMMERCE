import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uploadImageAction } from '../../../store/actions/productAction';

export default function CardImageForm({ product, history, category, open }) {
  const dispatch = useDispatch();
  // REDUX

  const [selectedFile, setSelectFile] = useState(null);
  const [selectedFilePreview, setSelectFilePreview] = useState(null);
  const [preview, setPreview] = useState(false);
  const [openState, setOpenState] = useState(false);

  // SET OPEN TO STATE
  useEffect(() => {
    setOpenState(open);
  }, [open]);

  const _onChange = (e) => {
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

  const _upload = (e) => {
    e.preventDefault();

    if (!selectedFile || !preview) return;
    uploadImage(selectedFilePreview);
  };

  const uploadImage = (base64EncodedImage) => {
    const data = {
      product,
      category,
      file: base64EncodedImage,
      productId: product._id,
      slug: product.slug,
      sub: product.sub,
    };

    dispatch(uploadImageAction(data, history));
  };

  return (
    <div className={openState ? 'card__form--visible' : 'card__form '}>
      {preview && (
        <div className="profile__avatar-container--preview card__form-preview  ">
          <img
            src={selectedFilePreview}
            alt="preview"
            className="profile__avatar-container--preview-img"
            width="100%"
          />
        </div>
      )}

      <div className=" profile__avatar-container">
        <form onSubmit={_upload} className="form ">
          <input
            type="file"
            name="image"
            className="mb-sm"
            onChange={_onChange}
          />

          {preview ? (
            <div className="card__form-btn-group">
              <button className="btn" type="submit">
                Submit
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => setPreview(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn" type="submit">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
