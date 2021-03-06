import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLast3ProductAction } from '../../store/actions/productAction';

// import sprite from '../../img/sprite.svg';
// import { Spinner } from '../../utils/LoadingComponent';
import imageHome from '../../img/hero homepage.jpg';
import { Image } from 'cloudinary-react';

const Home = () => {
  const dispatch = useDispatch();
  // REDUX

  const productsRedux = useSelector((state) => state.product.products);
  // const loadingRedux = useSelector((state) => state.loading.loading);

  // GET PRODUST ON LOAD TO SHOW 3 LAST ADDED PRODUCTS
  useEffect(() => {
    dispatch(getLast3ProductAction());
  }, [dispatch]);

  return (
    <div className="home page">
      <article className="home__container container">
        <div className="home__container__main">
          <h1 className="heading-1 mb-md">Welcome</h1>

          {productsRedux.length !== 0 && (
            <div className="home__container__1">
              <h2 className="h2 heading-2 mb-sm">Last Added Products</h2>

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
          <div className="home__container__2">
            <div className="home__container__2-img-box">
              <img
                src={imageHome}
                alt="hero home"
                className="home__container__2--img"
              />
            </div>
            <div className="home__container__2-article-box">
              <p className="home__container__2-article">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
                odit, aspernatur cupiditate debitis ad facere expedita sint
                voluptate, minus blanditiis fugit maiores tempora eligendi quod
                animi. Cupiditate saepe consequuntur aperiam?
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Home;
