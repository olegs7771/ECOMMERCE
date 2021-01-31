import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../navigation/BreadCrumbs';
import { Image } from 'cloudinary-react';
import { drawerToggle } from '../../store/actions/drawerAction';
import { useDispatch, useSelector } from 'react-redux';
import no_image from '../../img/no_image.png';
import { getCategoryAction } from '../../store/actions/categoryAction';
import { getSubListAction } from '../../store/actions/subAction';
import { Spinner } from '../../utils/LoadingComponent';
import ProductPage from '../product/ProductPage';

export default function CategorySingle(props) {
  // REDUX
  const dispatch = useDispatch();
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  const loadingRedux = useSelector((state) => state.loading.loading);
  const categoryRedux = useSelector((state) => state.category.category);
  const subsRedux = useSelector((state) => state.sub.subs);

  // LOAD CATEGORY ON LOAD PAGE
  useEffect(() => {
    dispatch(getCategoryAction({ slug: props.match.params.slug }));
  }, [dispatch, props.match.params.slug]);

  // LOAD ALL SUB_CATEGORIES TO SHOW FOR CURRENT CATEGORY
  useEffect(() => {
    dispatch(getSubListAction({ categoryId: props.match.params.categoryId }));
  }, [dispatch, props.match.params.categoryId]);

  return (
    <div className="pub-category">
      <div
        className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => dispatch(drawerToggle(false))}
      ></div>

      <div className="pub-category__container">
        <BreadCrumbs
          href1="/"
          link1="Home &nbsp; &rsaquo;"
          href2="/category  "
          link2=" &nbsp; category"
          current={`${props.match.params.slug}`}
        />

        <h2 className="heading-2 mb-md pub-category__heading  ">Categories </h2>

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
                    alt="no image"
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
                    >
                      <a
                        href="#"
                        className="pub-category__wrapper__sublist--item"
                      >
                        {s.name}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </section>
            <section className="pub-category__wrapper__productlist">
              <ProductPage />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
