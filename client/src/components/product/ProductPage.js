import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../navigation/BreadCrumbs';
import { Image } from 'cloudinary-react';
import { drawerToggle } from '../../store/actions/drawerAction';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsListAction } from '../../store/actions/productAction';
import no_image from '../../img/no_image.png';
import { Spinner } from '../../utils/LoadingComponent';

export default function ProductPage(props) {
  // REDUX
  const dispatch = useDispatch();
  const drawerRedux = useSelector((state) => state.drawer.drawer);

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
        <div className="pub-product__wrapper">
          <div className="pub-product__gallery">Images</div>
          <div className="pub-product__details">Details</div>
        </div>
      </div>
    </div>
  );
}
// `/category/${category.slug}/${category._id}`
