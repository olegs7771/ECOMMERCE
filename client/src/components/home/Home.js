import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drawerToggle } from '../../store/actions/drawerAction';
import sprite from '../../img/sprite.svg';
import { Spinner } from '../../utils/LoadingComponent';

const Home = () => {
  const dispatch = useDispatch();

  // REDUX
  const drawerRedux = useSelector((state) => state.drawer.drawer);

  return (
    <div>
      <div
        className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => dispatch(drawerToggle(false))}
      ></div>
      <p>Home</p>
    </div>
  );
};

export default Home;
