import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../navigation/BreadCrumbs';
import { Image } from 'cloudinary-react';
import { drawerToggle } from '../../store/actions/drawerAction';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProduct } from '../../store/actions/productAction';
import no_image from '../../img/no_image.png';
import { Spinner } from '../../utils/LoadingComponent';

export default function ProductPage(props) {
  // REDUX
  const dispatch = useDispatch();
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  const loadingRedux = useSelector((state) => state.loading.loading);
  const productRedux = useSelector((state) => state.product.product);

  // LOAD PRODUCT ON LOAD
  useEffect(() => {
    dispatch(
      getOneProduct({
        productId: props.match.params.productId,
        slug: props.match.params.slug,
      })
    );
  }, [dispatch, props.match.params.productId, props.match.params.slug]);

  return (
    <div className="pub-product">
      <div
        className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => dispatch(drawerToggle(false))}
      ></div>
      <div className="pub-product__container">
        <BreadCrumbs
          href1="/"
          link1="Home"
          href2="/category "
          link2="category"
          href3={`/category/${props.match.params.categorySlug}/${props.match.params.categoryId}`}
          link3={props.match.params.categorySlug}
          current={props.match.params.slug}
        />
        {loadingRedux || !productRedux ? (
          <Spinner loading={true} />
        ) : (
          <div className="pub-product__wrapper">
            <div className="pub-product__gallery">
              {productRedux.images.length === 0 && (
                <div className="heading-3 mb-sm">No Images</div>
              )}
              <div className="pub-product__gallery__block">
                {productRedux.images.map((image, index) => (
                  <figure className="pub-product__gallery__item" key={index}>
                    <Image
                      cloudName="dyl4kpmie"
                      publicId={image}
                      width="400"
                      crop="scale"
                      className="pub-product__gallery--image"
                    />
                  </figure>
                ))}
              </div>
            </div>
            <div className="pub-product__details">details</div>
          </div>
        )}
      </div>
    </div>
  );
}
