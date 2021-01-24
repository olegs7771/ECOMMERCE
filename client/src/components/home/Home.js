import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drawerToggle } from '../../store/actions/drawerAction';
import { getLast3ProductAction } from '../../store/actions/productAction';
// import sprite from '../../img/sprite.svg';
// import { Spinner } from '../../utils/LoadingComponent';
import { Image } from 'cloudinary-react';

const Home = () => {
  const dispatch = useDispatch();
  // REDUX
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  const productsRedux = useSelector((state) => state.product.products);
  // const loadingRedux = useSelector((state) => state.loading.loading);

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
        <div className="home__container__main">
          <h1 className="heading-1 mb-md">Welcome</h1>
          {/* LAST ADDED PRODUCTS  */}
          {productsRedux.length !== 0 && (
            <div className="home__container__1">
              <h2 className="h2 heading-2 mb-sm">Last Added Products</h2>
              {/* SECTION  GRID */}
              <section className="home__container__1-block">
                {productsRedux.map((product, i) => (
                  <figure className="home__container__1-block-L" key={i}>
                    <Image
                      cloudName="dyl4kpmie"
                      publicId={product.images[0]}
                      width="800"
                      crop="scale"
                      className="home__container__1-block-L--img"
                    />
                    {/* CAPTION  */}
                    <div className="home__container__1-block-caption">
                      <p className="home__container__1-block-caption--title">
                        {product.title}
                      </p>
                      <p className="home__container__1-block-caption--desc">
                        ${product.price}
                      </p>
                    </div>
                  </figure>
                ))}
              </section>
            </div>
          )}
          {/* LAST ADDED PRODUCTS END  */}
          {/* ////////////////////////////////////////// */}
          {/* MAIN PAGE */}
          <div className="home__container__2">main</div>
        </div>
      </article>
    </div>
  );
};

export default Home;
