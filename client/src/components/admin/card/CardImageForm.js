import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadImageAction } from '../../../store/actions/productAction';

export default function CardImageForm({ product }) {
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
    setSelectFilePreview(URL.createObjectURL(e.target.files[0]));
    setSelectFile(e.target.files[0]);
  };

  const _upload = (e) => {
    e.preventDefault();
    // CREATE FormData()
    const fd = new FormData();
    fd.append('file', selectedFile);
    fd.append('productId', product._id);

    dispatch(uploadImageAction(fd));
    // this.props.updateAvatar(fd, this.props.history);
  };

  return (
    <div className="card__form ">
      {preview && (
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
