// style _category.scss
import { unslugify } from 'unslugify';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorReduxState } from '../../../store/actions/categoryAction';

import { getProductsListAction } from '../../../store/actions/productAction';
import { drawerToggle } from '../../../store/actions/drawerAction';
import { Spinner } from '../../../utils/LoadingComponent';
import sprite from '../../../img/sprite.svg';
import Form from './ProductForm';

import ProductListItem from './ProductListItem';
import ProductTileItem from './ProductTileItem';
import Filter from '../../../utils/FilterForm';

import ErrorMessageWithBtn from '../../../utils/ErrorMessageWithBtn';
import BreadCrumbs from '../../navigation/BreadCrumbs';

///////////////////////////////////////////////////////////////////////////

export default function Product(props) {
  const dispatch = useDispatch();
  // SELECTORS

  const productList = useSelector((state) => state.product.products);
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading.loading);

  const errorRedux = useSelector((state) => state.error.errorMessage);
  // const message = useSelector((state) => state.message.message);
  // STATE
  // const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  // const [messageState, setMessageState] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showTiles, setShowTiles] = useState(false);

  const _toggleShowForm = () => {
    setShowForm(!showForm);
  };

  //LOAD COMPONENT AND FETCH  CATEGORIES
  useEffect(() => {
    const data = { subId: props.match.params.subId };
    dispatch(getProductsListAction(data));
  }, [dispatch, props.match.params.subId]);

  //SET STATE PRODUCTS IN COMPONENT
  useEffect(() => {
    setProducts(productList.filter(searched(keyword)));
  }, [productList, keyword]);

  //SET STATE ERROR IN COMPONENT
  useEffect(() => {
    setError(errorRedux);
  }, [errorRedux]);
  //SET STATE MESSAGE IN COMPONENT
  // useEffect(() => {
  //   setMessageState(message);
  // }, [message]);

  //CLEAR ERROR IN REDUX STATE
  const _clearReduxErrorState = (e) => {
    e.preventDefault();
    setError(null);
    dispatch(clearErrorReduxState());
  };

  // const _deleteCategory = (e) => {
  //   dispatch(deleteCategoryAction({ slug: e[0], categoryId: e[1] }));
  // };

  const _setFilterSearch = (e) => {
    setKeyword(e.target.value.toLocaleLowerCase());
  };

  const searched = (keyword) => (c) => c.title.toLowerCase().includes(keyword);

  // CLOSE FORM -->PRESS OK IN CHILD
  const _closeForm = () => {
    setShowForm(!showForm);
  };

  // SHOW TILES PRODUCT LIST
  const _showTiles = () => {
    setShowTiles(true);
  };
  const _showList = () => {
    setShowTiles(false);
  };

  return (
    <div>
      <div
        className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => dispatch(drawerToggle(false))}
      ></div>
      <div>
        <BreadCrumbs
          // FROM CATEGORY
          link1="home &nbsp;"
          href1="/"
          // FROM SUB-CATEGORY
          link2=" &rsaquo;&nbsp;&nbsp;  category &nbsp; &rsaquo;&nbsp;&nbsp;"
          href2=" /admin/category"
          // FROM PRODUCT
          link3={`${props.match.params.category}`}
          href3={`/admin/sub/${props.match.params.categoryId}/${props.match.params.category}`}
          const
          current={`${unslugify(props.match.params.slug)}`}
        />
        <div className="product ">
          <h1 className="heading-2 mb-md">
            Products for [{props.match.params.slug}]
          </h1>

          {/* CHECK ADMIN  */}
          {auth.isAuthenticated && auth.user.role === 'admin' ? (
            <div className="product__container">
              <div className="product__cta-control mb-md">
                {showForm ? (
                  <button
                    className="btn product__cta-btn"
                    onClick={_toggleShowForm} //SHOW ADD PRODUCT FORM 📅
                  >
                    <svg className="category__link-icon product__cta-icon icon">
                      <use href={sprite + '#icon-minus'} />
                    </svg>
                    Close form
                  </button>
                ) : (
                  <button
                    className="btn product__cta-btn"
                    onClick={_toggleShowForm} //SHOW ADD PRODUCT FORM 📅
                  >
                    <svg className="category__link-icon product__cta-icon icon">
                      <use href={sprite + '#icon-plus'} />
                    </svg>
                    Add Product
                  </button>
                )}
              </div>
              <div className="product__cta-block">
                <Form
                  open={showForm}
                  subId={props.match.params.subId}
                  categoryId={props.match.params.categoryId}
                  close={_closeForm}
                />
              </div>
              {/* product LIST  */}

              <div className="product__list-box">
                <div className="product__list-option">
                  <button className="product__list-btn" onClick={_showList}>
                    List
                  </button>
                  <button className="product__list-btn" onClick={_showTiles}>
                    Tiles
                  </button>
                </div>
                {loading ? (
                  <Spinner loading={loading} />
                ) : (
                  <div>
                    {/* FILTER FORM  */}
                    <Filter
                      _setFilterSearch={_setFilterSearch}
                      keyword={keyword}
                    />
                    <ul className="product__list">
                      {products.length === 0 ? (
                        <div className="heading-3">No Products found</div>
                      ) : (
                        <div>
                          {/* SHOW MESSAGE ON DELETE  */}
                          {error ? (
                            <ErrorMessageWithBtn
                              errorState={error}
                              _clearReduxErrorState={_clearReduxErrorState}
                            />
                          ) : (
                            <div>
                              {showTiles ? (
                                <div>
                                  <div className="product__tiles-container">
                                    {products.map((p, i) => (
                                      <ProductTileItem
                                        key={i}
                                        p={p}
                                        sprite={sprite}
                                        history={props.history}
                                        category={props.match.params.category}
                                        categoryId={
                                          props.match.params.categoryId
                                        }
                                        subId={props.match.params.subId}
                                      />
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  {products.map((p, i) => (
                                    // SHOW LIST
                                    <ProductListItem
                                      p={p}
                                      sprite={sprite}
                                      key={i}
                                      history={props.history}
                                      category={props.match.params.category}
                                      categoryId={props.match.params.categoryId}
                                      subId={props.match.params.subId}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="admin__container">
              <div className="admin__heading">
                Access Denied ! Only for admin
              </div>
              <button
                className="btn"
                onClick={() => props.history.push('/login')}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
