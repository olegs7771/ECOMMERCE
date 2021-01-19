import React from 'react';
import { Image } from 'cloudinary-react';
export default function CardImage({ image, sprite, _deleteImg, deleteMode }) {
  return (
    <div className="card__container__gallery-container">
      <Image
        cloudName="dyl4kpmie"
        publicId={image}
        width="150"
        crop="scale"
        className="card__container__gallery--image"
      />
      {deleteMode && (
        <div className="nav__link-icon-box nav__link-icon-box--selected">
          {/* <svg
            className="category__link-icon icon card__container__gallery--icon"
            onClick={_deleteImg.bind(this, image)}
          >
            <use href={sprite + '#icon-cross'} />
          </svg> */}
        </div>
      )}
    </div>
  );
}
