import React from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: $color-blue;
`;

export const Spinner = (props) => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        css={override}
        size={50}
        color={'#227c9d'}
        loading={props.loading}
      />
    </div>
  );
};
