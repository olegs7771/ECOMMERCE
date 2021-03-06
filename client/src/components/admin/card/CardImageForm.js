import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { uploadImageAction } from '../../../store/actions/productAction';

export default function CardImageForm({
  product,
  history,
  category,
  delMode,
  confirmDelete,
}) {
  const dispatch = useDispatch();
  // REDUX

  const [selectedFile, setSelectFile] = useState(null);
  const [selectedFilePreview, setSelectFilePreview] = useState(null);
  const [preview, setPreview] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

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

  // SET DELETE MODE HERE AND IN PARENT

  const _setDeleteMode = () => {
    delMode();
    setDeleteState(!deleteState);
  };

  return (
    <div className="card__form ">
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

      <form onSubmit={_upload} className="card__form-container ">
        <label className="file">
          <input
            type="file"
            name="image"
            className="mb-sm"
            onChange={_onChange}
          />
        </label>

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
          <div className="card__form-btn-group">
            <button className="btn" type="submit">
              Submit
            </button>

            {/* SET STATE TO DELETE IN PARENT  */}
            {deleteState ? (
              <div className="">
                <button className="btn" type="button" onClick={_setDeleteMode}>
                  Cancel
                </button>
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            ) : (
              <button className="btn" type="button" onClick={_setDeleteMode}>
                Delete
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
