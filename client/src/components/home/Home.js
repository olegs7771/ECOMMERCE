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
  // STATE
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);

  // GET PRODUST ON LOAD TO SHOW 3 LAST ADDED PRODUCTS
  useEffect(() => {
    dispatch(getLast3ProductAction());
  }, [dispatch]);

  // GET IMAGES AND PRODUCT FROM PRODUCTS TO STATE

  const getImages = () => {
    productsRedux.forEach((el) => {
      console.log('el', el.images[0]);
      setImages((images) => images.concat(el.images[0]));
      setProducts((products) => products.concat(el));
    });
  };

  useEffect(() => {
    getImages();
  }, [productsRedux]);
  console.log('products', products);
  return (
    <div className="home">
      <div
        className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => dispatch(drawerToggle(false))}
      ></div>
      {!products ? (
        <article className="home__container">
          <h2 className="h2 heading-2 mb-md">Last Added Products</h2>
          <div className="home__container__main">
            {/* SECTION  FLEX */}

            <section className="home__container__1-block">
              <figure className="home__container__1-block-L">
                <Image
                  cloudName="dyl4kpmie"
                  publicId={images[0]}
                  width="600"
                  crop="scale"
                  className="home__container__1-block-L--img"
                />
                {/* CAPTION  */}
                <div className="home__container__1-block-caption">
                  <p className="home__container__1-block-caption--title">
                    {products[0].title}
                  </p>
                  <p className="home__container__1-block-caption--desc">
                    ${products[0].price}
                  </p>
                </div>
              </figure>
              <figure className="home__container__1-block-M">
                <Image
                  cloudName="dyl4kpmie"
                  publicId={images[1]}
                  width="600"
                  crop="scale"
                  className="home__container__1-block-M--img"
                />
                {/* CAPTION  */}
                <div className="home__container__1-block-caption">
                  <p className="home__container__1-block-caption--title">
                    {products[1].title}
                  </p>
                  <p className="home__container__1-block-caption--desc">
                    ${products[1].price}
                  </p>
                </div>
              </figure>
              <figure className="home__container__1-block-R">
                <Image
                  cloudName="dyl4kpmie"
                  publicId={images[2]}
                  width="600"
                  crop="scale"
                  className="home__container__1-block-R--img"
                />
                {/* CAPTION  */}
                <div className="home__container__1-block-caption">
                  <p className="home__container__1-block-caption--title">
                    {products[2].title}
                  </p>
                  <p className="home__container__1-block-caption--desc">
                    ${products[2].price}
                  </p>
                </div>
              </figure>
            </section>
          </div>
        </article>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Home;
