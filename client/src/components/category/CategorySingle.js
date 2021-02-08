import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../navigation/BreadCrumbs';
import { Image } from 'cloudinary-react';
import { drawerToggle } from '../../store/actions/drawerAction';
import { useDispatch, useSelector } from 'react-redux';
import no_image from '../../img/no_image.png';
import { getCategoryAction } from '../../store/actions/categoryAction';
import { getSubListAction } from '../../store/actions/subAction';
import { getProductsListAction } from '../../store/actions/productAction';
import { Spinner } from '../../utils/LoadingComponent';
import ProductItem from '../product/ProductItem';

export default function CategorySingle(props) {
  // REDUX
  const dispatch = useDispatch();
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  const loadingRedux = useSelector((state) => state.loading.loading);
  const loadingProductsRedux = useSelector(
    (state) => state.loading.loadingProducts
  );
  const categoryRedux = useSelector((state) => state.category.category);
  const subsRedux = useSelector((state) => state.sub.subs);
  const productsRedux = useSelector((state) => state.product.products);
  const messageRedux = useSelector((state) => state.message.message);

  // STATE
  const [showProducts, setShowProducts] = useState(false);

  // LOAD CATEGORY ON LOAD PAGE
  useEffect(() => {
    dispatch(getCategoryAction({ slug: props.match.params.slug }));
  }, [dispatch, props.match.params.slug]);

  // LOAD ALL SUB_CATEGORIES TO SHOW FOR CURRENT CATEGORY
  useEffect(() => {
    dispatch(getSubListAction({ categoryId: props.match.params.categoryId }));
  }, [dispatch, props.match.params.categoryId]);

  //GET PRODUCTS BY CLICKING ON SUB-CATEGORY LINK
  const _getProducts = (e) => {
    setShowProducts(true);
    console.log('get products e', e._id);
    dispatch(getProductsListAction({ subId: e._id }));
  };

  return (
    <div className="pub-category page">
      <div
        className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => dispatch(drawerToggle(false))}
      ></div>
      <div className="slidein__message">
        <div className="slidein__message__text">
          <p className="slidein__message__text--text">
            Message herewas added to your shopping cart
          </p>
        </div>
        <div className="slidein__message__view-btn">
          <button className="btn slidein__message__view-btn--btn">View</button>
        </div>
        <div className="slidein__message__close-icon">X</div>
      </div>
      <div className="pub-category__container container">
        <BreadCrumbs
          href1="/"
          link1="Home"
          href2="/category"
          link2="category"
          current={props.match.params.slug}
        />

        {/* <h2 className="heading-2 mb-md pub-category__heading  ">
          Categories!{' '}
        </h2> */}

        {loadingRedux ? (
          <Spinner loading={loadingRedux} />
        ) : (
          <div className="pub-category__wrapper">
            <div className="pub-category__wrapper__top mb-md">
              <h2 className="heading-2 mb-md">{categoryRedux.name}</h2>
              <div className="pub-category__wrapper__top__image-block">
                {categoryRedux.image ? (
                  <Image
                    cloudName="dyl4kpmie"
                    publicId={categoryRedux.image}
                    width="400"
                    crop="scale"
                    className="card__container__gallery--image "
                  />
                ) : (
                  <img
                    src={no_image}
                    alt="no img"
                    className="card__container__gallery--image"
                  />
                )}
              </div>
            </div>
            <div className="pub-category__wrapper__description">
              <p className="pub-category__wrapper__description--text">
                {categoryRedux.description}
              </p>
            </div>
            <section className="pub-category__wrapper__sublist">
              {subsRedux.length === 0 ? (
                <div className="heading-3">No Sub Categories </div>
              ) : (
                <div className="pub-category__wrapper__sublist--block">
                  {subsRedux.map((s, i) => (
                    <div
                      key={i}
                      className="pub-category__wrapper__sublist--card"
                      onClick={_getProducts.bind(this, s)}
                    >
                      <div className="pub-category__wrapper__sublist--item">
                        {s.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
            <section className="pub-category__wrapper__productlist">
              {loadingProductsRedux ? (
                <div className="pub-category__wrapper__productlist__spinner">
                  <Spinner loading={loadingProductsRedux} />
                </div>
              ) : (
                <div>
                  {productsRedux.length === 0 && showProducts ? (
                    <div className="heading-3">No products to show</div>
                  ) : (
                    <div className="pub-category__wrapper__productlist__block">
                      {productsRedux.map((p, i) => (
                        <ProductItem
                          key={i}
                          image={p.images[0]}
                          title={p.title}
                          brand={p.brand}
                          price={p.price}
                          productId={p._id}
                          slug={p.slug}
                          history={props.history}
                          categoryId={props.match.params.categoryId}
                          categorySlug={props.match.params.slug}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
