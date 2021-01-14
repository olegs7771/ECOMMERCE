import React, { useEffect, useState } from 'react';
import { unslugify } from 'unslugify';

import { useDispatch, useSelector } from 'react-redux';
import {
  // deleteOneProduct,
  getOneProduct,
} from '../../../store/actions/productAction';
import { drawerToggle } from '../../../store/actions/drawerAction';
import { Spinner } from '../../../utils/LoadingComponent';
import BreadCrumbs from '../../navigation/BreadCrumbs';
import TextInputForm from '../../../utils/TextInputForm';

export default function Card(props) {
  //  REDUX
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.loading.loading);
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  // const error = useSelector((state) => state.error.error);

  let initialState = {};
  if (product) {
    initialState = {
      title: product.title,
      // description,
      // brand,
      // price,
      // color,
      // category,
      // shipping,
      // quantity,
      // sub,
      // createdAt,
      subs: [],
      categories: [],
      images: [],
      colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
      brands: ['Apple', 'Samsung', 'Silver', 'Microsoft', 'Lenovo', 'ASUS'],
    };
  }
  const [values, setValue] = useState(initialState);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState({});

  const _onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
    setErrors({});
  };

  //  ON LOAD FETCH PRODUCT DETAILS
  useEffect(() => {
    const data = {
      productId: props.match.params.productId,
      slug: props.match.params.slug,
    };
    dispatch(getOneProduct(data));
  }, [dispatch, props.match.params.productId, props.match.params.slug]);

  return (
    <div>
      <div
        className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => dispatch(drawerToggle(false))}
      ></div>
      <div className="card">
        <BreadCrumbs
          // FROM CATEGORY
          link1="home &nbsp;"
          href1="/"
          // FROM SUB-CATEGORY
          link2=" &rsaquo;&nbsp;&nbsp; category &nbsp; &rsaquo;&nbsp;&nbsp;"
          href2="/admin/category"
          // FROM PRODUCT
          link3="sub-category"
          href3={`/admin/sub/${props.match.params.categoryId}/${props.match.params.category}`}
          // FROM PRODUCT CARD
          link4="&rsaquo;&nbsp;&nbsp;products &nbsp; &nbsp;"
          href4={`/admin/${props.match.params.subId}/${props.match.params.category}/${props.match.params.categoryId}/${props.match.params.slug}`}
          current={`${unslugify(props.match.params.slug)}`}
        />

        {auth.isAuthenticated && auth.user.role === 'admin' ? (
          <div className="card-wrapper">
            {loading || !product ? (
              <Spinner />
            ) : (
              //////////////////////////////////////////////////////////////
              // CARD
              <div className="card__container">
                {/* GALLERY LEFT  */}
                <div className="card__container__gallery">IMAGE GAllery</div>

                {/* DETAILS RIGHT  */}
                <div className="card__container__detail">
                  {/* HEADER  */}
                  <div className="card__container__detail-header heading-3 mb-sm">
                    <div className="card__container__detail-header--title  ">
                      <input
                        type="text"
                        name="name"
                        className="category__input"
                        value={values.title}
                        onChange={_onChange}
                        required
                      />
                      {product.title}
                    </div>
                    <div className="card__container__detail-header--price">
                      ${product.price}
                    </div>
                  </div>
                  {/* BODY  */}
                  <div className="card__container__detail-body mb-md">
                    <div className="card__container__detail-body--item">
                      <span className="card__container__detail-body--item-title">
                        Brand
                      </span>
                      <span className="card__container__detail-body--item-text">
                        {product.brand}
                      </span>
                    </div>
                    <div className="card__container__detail-body--item">
                      <span className="card__container__detail-body--item-title">
                        Description
                      </span>
                      <span className="card__container__detail-body--item-text">
                        {product.description}
                      </span>
                    </div>
                    <div className="card__container__detail-body--item">
                      <span className="card__container__detail-body--item-title">
                        Quantity
                      </span>
                      <span className="card__container__detail-body--item-text">
                        {product.quantity}
                      </span>
                    </div>

                    <div className="card__container__detail-body--item">
                      <span className="card__container__detail-body--item-title">
                        Shipping
                      </span>
                      <span className="card__container__detail-body--item-text">
                        {product.shipping}
                      </span>
                    </div>
                    <div className="card__container__detail-body--item">
                      <span className="card__container__detail-body--item-title">
                        Color
                      </span>
                      <span className="card__container__detail-body--item-text">
                        {product.color}
                      </span>
                    </div>
                    <div className="card__container__detail-body--item">
                      <span className="card__container__detail-body--item-title">
                        Created
                      </span>
                      <span className="card__container__detail-body--item-text">
                        {new Date(product.createdAt).toDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="card__container-cta">
                    <button className="btn">Edit Details</button>
                    <button className="btn">Edit Gallery</button>
                    <button className="btn">Delete</button>
                  </div>
                </div>
              </div>

              //////////////////////////////////////////////////////////////////////
            )}
          </div>
        ) : (
          <div className="admin__container">
            <div className="admin__heading">Access Denied ! Only for admin</div>
            <button className="btn">Login</button>
          </div>
        )}
      </div>
    </div>
  );
}
