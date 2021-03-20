import React from 'react';

export default function SlideInMessage({ messageRedux }) {
  return (
    <div
      className={
        messageRedux
          ? 'slidein__message slidein__message--visible'
          : 'slidein__message'
      }
    >
      <div className="slidein__message__text">
        <p className="slidein__message__text--text">
          <span className="slidein__message__text--title">
            {messageRedux ? messageRedux.split(':')[0] : null}
          </span>
          {messageRedux ? messageRedux.split(':')[1] : null}
        </p>
      </div>
      <div className="slidein__message__view-btn">
        <button className="btn slidein__message__view-btn--btn">View</button>
      </div>
      <div className="slidein__message__close-icon">X</div>
    </div>
  );
}
