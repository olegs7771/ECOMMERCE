import React, { useEffect, useState } from 'react';
import { unslugify } from 'unslugify';
import sprite from '../../../img/sprite.svg';
import { Image } from 'cloudinary-react';

import { useDispatch, useSelector } from 'react-redux';
import {
  // deleteOneProduct,
  getOneProduct,
  updateProductAction,
  deleteImageAction,
} from '../../../store/actions/productAction';
import { clearMessageReduxState } from '../../../store/actions/categoryAction';
import { drawerToggle } from '../../../store/actions/drawerAction';
import { Spinner } from '../../../utils/LoadingComponent';
import BreadCrumbs from '../../navigation/BreadCrumbs';
import CardImageForm from './CardImageForm';
import CardImage from './CardImage';

export default function Card(props) {
  //  REDUX
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.loading.loading);
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  const messageRedux = useSelector((state) => state.message.message);
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
      brands: ['Apple', 'Samsung', 'IBM', 'Microsoft', 'Lenovo', 'ASUS'],
    };
  }

  // STATE
  const [values, setValue] = useState(initialState);
  const [edit, setEdit] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagesToDelete, setImagesToDelete] = useState([]); //array of publicId's to delete
  const [message, setMessage] = useState(null);
  const [showLarge, setShowLarge] = useState(false); //show single large image
  const [largeImage, setLargeImage] = useState(null);

  const _onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
    setErrors({});
  };

  // IF messageRedux got message run this effect loading fresh image
  useEffect(() => {
    fetchProduct();
    setMessage(messageRedux);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageRedux]);

  //  ON LOAD FETCH PRODUCT DETAILS
  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProduct = () => {
    // console.log('fetching product');
    const data = {
      productId: props.match.params.productId,
      slug: props.match.params.slug,
    };
    dispatch(getOneProduct(data));
  };

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
    if (values.price.length === 0) {
      errors.price = '00.00';
    }
    if (!/^\d+(,\d{3})*(\.\d{1,2})?$/.test(values.price)) {
      errors.price = 'only numbers';
    }

    if (values.brand === 'Select Brand') {
      errors.brand = 'Select Brand';
    }
    if (values.description.length === 0) {
      errors.description = 'Please leave some description about product';
    }
    if (values.quantity.length === 0) {
      errors.quantity = '0';
    }
    if (!/^[0-9]*$/.test(values.quantity)) {
      errors.quantity = 'only numbers';
    }

    if (values.color === 'Select Color') {
      errors.color = 'Select Color';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(updateProductAction(values));
    }
    setEdit(!edit);
  };

  // CANCEL EDIT AND CLEAR ERRORS
  const _cancelEdit = () => {
    setErrors({});
    setEdit(!edit);
  };

  // DELETE IMAGE
  const _deleteImg = (e) => {
    console.log('e', e);
  };

  // DELETE MODE STATE TOGGLE
  const _deleteImagesMode = () => {
    setDeleteMode(!deleteMode);
  };

  // POPULATE STATE WITH CHCKED  IMAGES TO DELETE
  const _populateState = (data, state) => {
    if (state) {
      setImagesToDelete((imagesToDelete) => imagesToDelete.concat(data));
    } else {
      // REMOVE SELECTED IMAGES FROM STATE
      setImagesToDelete((imagesToDelete) =>
        imagesToDelete.filter((e) => e !== data)
      );
    }
    //
  };

  const _deleteCofirm = () => {
    if (imagesToDelete.length === 0) {
      return setMessage('Select Images to delete');
    }
    // UPDATE PRODUCT IMAGES ARRAY
    const data = {
      publicIds: imagesToDelete,
      productId: props.match.params.productId,
      subId: props.match.params.subId,
    };
    dispatch(deleteImageAction(data));
  };

  // SHOW LARGE IMAGE
  const _showLargeimage = (e) => {
    console.log('show large e', e);
    setShowLarge(true);
    setLargeImage(e);
  };

  // on pressing ok button in message .clear message in redux and reset state
  const _reset = () => {
    dispatch(clearMessageReduxState());
    setDeleteMode(false);
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
                <div className="card__container__gallery">
                  <div className="heading-3 mb-sm">Edit Images</div>
                  <div>
                    {showLarge ? (
                      <div className="card__container__gallery-single">
                        <Image
                          cloudName="dyl4kpmie"
                          publicId={largeImage}
                          width="500"
                          crop="scale"
                          className="card__container__gallery--image-large "
                        />
                        <svg
                          className=" icon card__container__gallery-single-icon"
                          onClick={() => setShowLarge(false)}
                        >
                          <use href={sprite + '#icon-cross'} />
                        </svg>
                      </div>
                    ) : (
                      <div className="card__container__gallery-list">
                        {product.images.map((image, index) => (
                          <CardImage
                            key={index}
                            image={image}
                            sprite={sprite}
                            _deleteImg={_deleteImg}
                            deleteMode={deleteMode}
                            checkedImg={_populateState}
                            showLargeImage={_showLargeimage}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  {message && (
                    <div className="card__message">
                      <div className="card__message--text">{message}</div>
                      <button className="card__message--btn" onClick={_reset}>
                        ok
                      </button>
                    </div>
                  )}
                  {/* IMAGE ADD FORM  */}
                  <CardImageForm
                    product={product}
                    history={props.history}
                    category={props.match.params.category}
                    delMode={_deleteImagesMode}
                    confirmDelete={_deleteCofirm}
                  />
                </div>

                {/* DETAILS RIGHT  */}
                <div className="card__container__detail">
                  {/* HEADER  */}
                  <div className="card__container__detail-header heading-3 ">
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
                            className={
                              errors.price
                                ? 'card__input card__input--invalid'
                                : 'card__input'
                            }
                            value={errors.price ? errors.price : values.price}
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
                      <span
                        className={
                          edit
                            ? ' card__container__detail-body--item-text--edit'
                            : 'card__container__detail-body--item-text'
                        }
                      >
                        {edit ? (
                          <div className="card__container__detail-header--title-edit">
                            <select
                              name="brand"
                              value={values.brand}
                              onChange={_onChange}
                              className={
                                errors.brand
                                  ? 'form-input card__input card__input-fss card__input--invalid'
                                  : 'form-input card__input card__input-fss'
                              }
                              required
                            >
                              <option>Select Brand</option>
                              {initialState.brands.map((brand) => (
                                <option value={brand} key={brand}>
                                  {brand}
                                </option>
                              ))}
                            </select>
                            <svg className="  card__icon icon">
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
                      <span
                        className={
                          edit
                            ? ' card__container__detail-body--item-text--edit'
                            : 'card__container__detail-body--item-text'
                        }
                      >
                        {edit ? (
                          <div className="card__container__detail-body--item-text-edit">
                            <textarea
                              type="text"
                              name="description"
                              className={
                                errors.description
                                  ? 'form-input card__input--invalid'
                                  : 'form-input'
                              }
                              value={
                                errors.description
                                  ? errors.description
                                  : values.description
                              }
                              onChange={_onChange}
                              rows="7"
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
                      <span
                        className={
                          edit
                            ? ' card__container__detail-body--item-text--edit'
                            : 'card__container__detail-body--item-text'
                        }
                      >
                        {edit ? (
                          <div className="card__container__detail-body--item-text-edit-form">
                            <input
                              type="text"
                              name="quantity"
                              className={
                                errors.quantity
                                  ? ' card__input card__input--invalid'
                                  : ' card__input '
                              }
                              value={
                                errors.quantity
                                  ? errors.quantity
                                  : values.quantity
                              }
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
                      <span
                        className={
                          edit
                            ? ' card__container__detail-body--item-text--edit'
                            : 'card__container__detail-body--item-text'
                        }
                      >
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
                      <span
                        className={
                          edit
                            ? ' card__container__detail-body--item-text--edit'
                            : 'card__container__detail-body--item-text'
                        }
                      >
                        {edit ? (
                          <div className="card__container__detail-header--title-edit">
                            <select
                              name="color"
                              value={values.color}
                              onChange={_onChange}
                              className={
                                errors.color
                                  ? 'form-input card__input--invalid'
                                  : 'form-input'
                              }
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
                          onClick={_cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button className="btn" onClick={() => setEdit(!edit)}>
                        Edit Details
                      </button>
                    )}

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
