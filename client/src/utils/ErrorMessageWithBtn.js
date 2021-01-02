import React from 'react';

export default function ErrorMessageWithBtn({
  errorState,
  _clearReduxErrorState,
}) {
  return (
    <div className="error">
      <div className="error--text mb-md">{errorState}</div>
      <button className="btn" onClick={_clearReduxErrorState}>
        ok
      </button>
    </div>
  );
}
