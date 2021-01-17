import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { uploadImageAction } from '../../../store/actions/productAction';

export default function CardImageForm({ product, history }) {
  const dispatch = useDispatch();
  // REDUX

  const [selectedFile, setSelectFile] = useState(null);
  const [selectedFilePreview, setSelectFilePreview] = useState(null);
  const [preview, setPreview] = useState(false);

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

    if (!selectedFile) return;
    uploadImage(selectedFilePreview);
  };

  const uploadImage = (base64EncodedImage) => {
    const data = {
      product,
      file: base64EncodedImage,
      productId: product._id,
      slug: product.slug,
      sub: product.sub,
    };

    dispatch(uploadImageAction(data, history));
  };

  return (
    <div className="card__form ">
      {selectedFilePreview && (
        <div className="profile__avatar-container--preview ">
          <img
            src={selectedFilePreview}
            alt="preview"
            className="profile__avatar-container--preview-img"
          />
        </div>
      )}

      <div className=" profile__avatar-container">
        <form onSubmit={_upload} className="form">
          <input
            type="file"
            name="image"
            className="mb-sm"
            onChange={_onChange}
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
