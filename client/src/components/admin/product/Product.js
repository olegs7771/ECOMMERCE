// style _category.scss

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorReduxState } from '../../../store/actions/categoryAction';

import { getProductsListAction } from '../../../store/actions/productAction';
// import {getProductsListAction} from '../../../store/actions/productAction'

import { Spinner } from '../../../utils/LoadingComponent';
import sprite from '../../../img/sprite.svg';
import Form from './ProductForm';

import ProductItem from './ProductItem';
import Filter from '../../../utils/FilterForm';

import ErrorMessageWithBtn from '../../../utils/ErrorMessageWithBtn';

///////////////////////////////////////////////////////////////////////////

export default function Product(props) {
  const dispatch = useDispatch();
  // SELECTORS

  const productList = useSelector((state) => state.product.products);

  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading.loading);

  const error = useSelector((state) => state.error.error);
  const message = useSelector((state) => state.message.message);
  // STATE
  // const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [messageState, setMessageState] = useState(null);
  const [errorState, setErrorState] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
    setErrorState(error);
  }, [error]);
  //SET STATE MESSAGE IN COMPONENT
  useEffect(() => {
    setMessageState(message);
  }, [message]);

  //CLEAR ERROR IN REDUX STATE
  const _clearReduxErrorState = (e) => {
    e.preventDefault();
    setErrorState(null);
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

  return (
    <div>
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
                  <svg className="category__link-icon product__cta-icon">
                    <use href={sprite + '#icon-minus'} />
                  </svg>
                  Close form
                </button>
              ) : (
                <button
                  className="btn product__cta-btn"
                  onClick={_toggleShowForm} //SHOW ADD PRODUCT FORM 📅
                >
                  <svg className="category__link-icon product__cta-icon">
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
                <button className="product__list-btn">List</button>
                <button className="product__list-btn">Tiles</button>
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
                        {errorState ? (
                          <ErrorMessageWithBtn
                            errorState={errorState}
                            _clearReduxErrorState={_clearReduxErrorState}
                          />
                        ) : (
                          <div>
                            {products.map((p, i) => (
                              // SHOW LIST
                              <ProductItem
                                product={p}
                                // _deleteproduct={_deleteproduct}
                                sprite={sprite}
                                key={i}
                                // subs={subList} //all existing sub-categories array
                              />
                            ))}
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
            <div className="admin__heading">Access Denied ! Only for admin</div>
            <button className="btn">Login</button>
          </div>
        )}
      </div>
    </div>
  );
}
