import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drawerToggle } from '../../store/actions/drawerAction';
import { getLast3ProductAction } from '../../store/actions/productAction';
import sprite from '../../img/sprite.svg';
import { Spinner } from '../../utils/LoadingComponent';
import { Image } from 'cloudinary-react';

const Home = () => {
  const dispatch = useDispatch();
  // REDUX
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  const productsRedux = useSelector((state) => state.product.products);

  // GET PRODUST ON LOAD TO SHOW 3 LAST ADDED PRODUCTS
  useEffect(() => {
    dispatch(getLast3ProductAction());
  }, [dispatch]);

  return (
    <div className="home">
      <div
        className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => dispatch(drawerToggle(false))}
      ></div>

      <article className="home__container">
        <h2 className="h2 heading-2 mb-md">Last Added Products</h2>
        <div className="home__container__main">
          {/* SECTION  */}
          <section className="home__container__1">
            {/* FLEX */}
            <div className="home__container__1-block">
              <div className="home__container__1-block-L">
                <img
                  src=""
                  alt="product"
                  className="home__container__1-block-L--img"
                />
              </div>
              <div className="home__container__1-block-R">
                <img
                  src=""
                  alt="product"
                  className="home__container__1-block-R--img"
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
