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
    <div className="home">
      <div
        className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => dispatch(drawerToggle(false))}
      ></div>

      <article className="home__container">
        <h2 className="h2 heading-2 mb-md">Last Added Products</h2>
        <div className="home__container__main">
          <section className="home__container__1">
            <div className="home__container__1-block">
              <div className="home__container__1-block-l">
                <img
                  src=""
                  alt="product"
                  className="home__container__1-block-l--img"
                />
              </div>
              <div className="home__container__1-block-r">
                <img
                  src=""
                  alt="product"
                  className="home__container__1-block-r--img"
                />
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default Home;
