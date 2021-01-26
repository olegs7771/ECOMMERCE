import React, { useState } from 'react';

export default function CategoryForm({ name, _onSubmit, _setName, title }) {
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

  return (
    <form onSubmit={_onSubmit} className="form  category__form">
      <div className="form-group">
        <label>
          <div className="form-label--name">{title}</div>
          <input
            type="name"
            name="name"
            className="form-input   "
            value={name}
            onChange={_setName}
            required
          />
        </label>
      </div>

      <input type="submit" value="save" className="btn btn-auth" />
    </form>
  );
}
