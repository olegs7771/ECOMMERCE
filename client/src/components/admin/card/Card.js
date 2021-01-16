import React, { useEffect, useState } from 'react';
import { unslugify } from 'unslugify';
import sprite from '../../../img/sprite.svg';

import { useDispatch, useSelector } from 'react-redux';
import {
  // deleteOneProduct,
  getOneProduct,
  updateProductAction,
} from '../../../store/actions/productAction';
import { drawerToggle } from '../../../store/actions/drawerAction';
import { Spinner } from '../../../utils/LoadingComponent';
import BreadCrumbs from '../../navigation/BreadCrumbs';

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
      price: product.price,
      brand: product.brand,
      description: product.description,
      quantity: product.quantity,
      shipping: product.shipping,
      color: product.color,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      subs: [],
      categories: [],
      images: [],
      colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
      brands: ['Apple', 'Samsung', 'Silver', 'Microsoft', 'Lenovo', 'ASUS'],
    };
  }

  // STATE
  const [values, setValue] = useState(initialState);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState({});
  // SHOW UPDATE DATE

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

  // GET PRODUCT TO STATE
  useEffect(() => {
    setValue(product);
  }, [product]);

  // UPDATE PRODUCT
  const _update = () => {
    let errors = {};
    // CHECK FOR EMPTY FEILDS
    if (values.title.length === 0) {
      errors.title = 'Product Name';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(updateProductAction(values));
    }
  };

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
            {loading || !product || !values ? (
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
                    {/* TITLE  */}
                    <div className="card__container__detail-header--title ">
                      {edit ? (
                        <div className="card__container__detail-header--title-edit">
                          <input
                            type="text"
                            name="title"
                            className={
                              errors.title
                                ? 'form-input card__input card__input--invalid'
                                : 'form-input card__input '
                            }
                            value={errors.title ? errors.title : values.title}
                            onChange={_onChange}
                            required
                          />
                          <svg className=" icon card__icon">
                            <use href={sprite + '#icon-pencil'} />
                          </svg>
                        </div>
                      ) : (
                        <div className="card__container__detail-header--title-text">
                          {product.title}
                        </div>
                      )}
                    </div>

                    {/* PRICE  */}
                    <div className="card__container__detail-header--price">
                      {edit ? (
                        <div className="card__container__detail-header--price-edit">
                          <input
                            type="text"
                            name="price"
                            className=" card__input"
                            value={values.price}
                            onChange={_onChange}
                            required
                          />
                          <svg className=" icon card__icon">
                            <use href={sprite + '#icon-pencil'} />
                          </svg>
                        </div>
                      ) : (
                        <div className="card__container__detail-header--price-text">
                          ${product.price}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* BODY  */}
                  <div className="card__container__detail-body mb-md">
                    <div className="card__container__detail-body--item">
                      <span className="card__container__detail-body--item-title">
                        Brand
                      </span>
                      <span className="card__container__detail-body--item-text">
                        {edit ? (
                          <div className="card__container__detail-body--item-text-edit-form">
                            <input
                              type="text"
                              name="brand"
                              className=" card__input"
                              value={values.brand}
                              onChange={_onChange}
                              required
                            />
                            <svg className=" icon card__icon">
                              <use href={sprite + '#icon-pencil'} />
                            </svg>
                          </div>
                        ) : (
                          <div className="card__container__detail-body--item-text-edit-text">
                            {product.brand}
                          </div>
                        )}
                      </span>
                    </div>
                    <div className="card__container__detail-body--item">
                      <span className="card__container__detail-body--item-title">
                        Description
                      </span>
                      <span className="card__container__detail-body--item-text">
                        {edit ? (
                          <div className="card__container__detail-body--item-text-edit">
                            <textarea
                              type="text"
                              name="description"
                              className=" "
                              value={values.description}
                              onChange={_onChange}
                              rows="10"
                              cols="40"
                              required
                            />
                          </div>
                        ) : (
                          <div className="card__container__detail-body--item-text-edit-text">
                            {product.description}
                          </div>
                        )}
                      </span>
                    </div>
                    <div className="card__container__detail-body--item">
                      <span className="card__container__detail-body--item-title">
                        Quantity
                      </span>
                      <span className="card__container__detail-body--item-text">
                        {edit ? (
                          <div className="card__container__detail-body--item-text-edit-form">
                            <input
                              type="text"
                              name="quantity"
                              className=" card__input"
                              value={values.quantity}
                              onChange={_onChange}
                              required
                            />
                            <svg className=" icon card__icon">
                              <use href={sprite + '#icon-pencil'} />
                            </svg>
                          </div>
                        ) : (
                          <div className="card__container__detail-body--item-text-edit-text">
                            {product.quantity}
                          </div>
                        )}
                      </span>
                    </div>

                    <div className="card__container__detail-body--item">
                      <span className="card__container__detail-body--item-title">
                        Shipping
                      </span>
                      <span className="card__container__detail-body--item-text">
                        {edit ? (
                          <div className="card__container__detail-body--item-text-edit-form">
                            <label className=" form-group__radio-label">
                              <input
                                type="radio"
                                value="Yes"
                                name="shipping"
                                checked={values.shipping === 'Yes'}
                                onChange={_onChange}
                                required
                              />
                              <span className="form-label--name">Yes</span>
                            </label>
                            <label className=" form-group__radio-label">
                              <input
                                type="radio"
                                value="No"
                                name="shipping"
                                checked={values.shipping === 'No'}
                                onChange={_onChange}
                                required
                              />

                              <span className="form-label--name">No</span>
                            </label>
                          </div>
                        ) : (
                          <div className="card__container__detail-body--item-text-edit-text">
                            {product.shipping}
                          </div>
                        )}
                      </span>
                    </div>
                    <div className="card__container__detail-body--item">
                      <span className="card__container__detail-body--item-title">
                        Color
                      </span>
                      <span className="card__container__detail-body--item-text">
                        {edit ? (
                          <div className="card__container__detail-header--title-edit">
                            <select
                              name="color"
                              value={values.color}
                              onChange={_onChange}
                              className="form-input  "
                              required
                            >
                              <option>Select Color</option>
                              {initialState.colors.map((color) => (
                                <option value={color} key={color}>
                                  {color}
                                </option>
                              ))}
                            </select>
                            <svg className="  card__icon icon">
                              <use href={sprite + '#icon-pencil'} />
                            </svg>
                          </div>
                        ) : (
                          <div>{product.color}</div>
                        )}
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
                    {product.updatedAt > product.createdAt ? (
                      <div className="card__container__detail-body--item">
                        <span className="card__container__detail-body--item-title">
                          Updated
                        </span>
                        <span className="card__container__detail-body--item-text">
                          {new Date(product.updatedAt).toDateString()}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="card__container-cta">
                    {edit ? (
                      <div>
                        <button
                          className="btn card__container-cta-btn--accept"
                          onClick={_update}
                        >
                          Accept
                        </button>
                        <button
                          className="btn card__container-cta-btn--cancel"
                          onClick={() => setEdit(!edit)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button className="btn" onClick={() => setEdit(!edit)}>
                        Edit Details
                      </button>
                    )}
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
