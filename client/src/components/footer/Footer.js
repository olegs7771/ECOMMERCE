import React, { useEffect, useState } from 'react';
import { drawerToggle } from '../../store/actions/drawerAction';
import { useDispatch, useSelector } from 'react-redux';
export default function Footer() {
  // REDUX
  const dispatch = useDispatch();
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  return (
    <div className="page footer">
      <div
        className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => dispatch(drawerToggle(false))}
      ></div>
      <div className="container footer__container">footer11</div>
    </div>
  );
}
