import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
export default function CardImage({
  image,
  _deleteImg,
  deleteMode,
  checkedImg,
}) {
  const [checked, setChecked] = useState(false);

  const _checkImage = (e) => {
    setChecked(!checked);
    console.log('e', e);
    checkedImg(e);
  };

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
        <div
          className={
            checked
              ? 'nav__link-icon-box card__container__gallery-icon  card__container__gallery-icon--checked'
              : 'nav__link-icon-box card__container__gallery-icon'
          }
          onClick={_checkImage.bind(this, image)}
        >
          {checked && (
            <div className="card__container__gallery-icon--dot"></div>
          )}
        </div>
      )}
    </div>
  );
}
