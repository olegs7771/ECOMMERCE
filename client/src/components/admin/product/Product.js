// style _category.scss

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoriesList,
  deleteCategoryAction,
  clearErrorReduxState,
} from '../../../store/actions/categoryAction';
import { getAllSubAction } from '../../../store/actions/subAction';
import { getProductsListAction } from '../../../store/actions/productAction';

import { Spinner } from '../../../utils/LoadingComponent';
import sprite from '../../../img/sprite.svg';
import Form from '../category/CategoryForm';

import ProductItem from './ProductItem';
import Filter from '../category/CategoryFilter';

import ErrorMessageWithBtn from '../../../utils/ErrorMessageWithBtn';

///////////////////////////////////////////////////////////////////////////

export default function Product(props) {
  const dispatch = useDispatch();
  // SELECTORS
  // const categoryList = useSelector((state) => state.category.categories);
  const productList = useSelector((state) => state.product.products);
  const subList = useSelector((state) => state.sub.subs);
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading.loading);
  const error = useSelector((state) => state.error.error);
  // STATE
  // const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  // const [messageState, setMessageState] = useState(null);
  const [errorState, setErrorState] = useState(null);

  //LOAD COMPONENT AND FETCH  CATEGORIES
  useEffect(() => {
    const data = { subId: props.match.params.subId };
    dispatch(getProductsListAction(data));
  }, [dispatch]);

  //SET STATE PRODUCTS IN COMPONENT
  useEffect(() => {
    // setProducts(productList.filter(searched(keyword)));
    setProducts(productList);
    return () => {};
  }, [productList, keyword]);

  //SET STATE ERROR IN COMPONENT
  useEffect(() => {
    setErrorState(error);
  }, [error]);

  //CLEAR ERROR IN REDUX STATE
  const _clearReduxErrorState = (e) => {
    e.preventDefault();
    setErrorState(null);
    dispatch(clearErrorReduxState());
  };

  const _deleteCategory = (e) => {
    dispatch(deleteCategoryAction({ slug: e[0], categoryId: e[1] }));
  };

  const _setFilterSearch = (e) => {
    setKeyword(e.target.value.toLocaleLowerCase());
    const data = { subId: props.match.params.subId };
    dispatch(getProductsListAction(data));
  };

  // const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div>
      <div className="category ">
        <h1 className="heading-2 mb-md">Products</h1>

        {/* CHECK ADMIN  */}
        {auth.isAuthenticated && auth.user.role === 'admin' ? (
          <div className="category__container">
            <div className="category__cta-block">
              {/* FILTER FORM  */}
              <Filter _setFilterSearch={_setFilterSearch} keyword={keyword} />

              {/* CATEGORY CREATE FORM  */}
              <Form />
            </div>
            {/* CATEGORY LIST  */}
            <div className="category__list-box">
              {loading ? (
                <Spinner loading={props.loading} />
              ) : (
                <ul className="category__list">
                  {products.length === 0 ? (
                    <div className="heading-3">No Categories found</div>
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
                          {products.map((c, i) => (
                            <ProductItem
                              // c={c}
                              // i={i}
                              // _deleteCategory={_deleteCategory}
                              // sprite={sprite}
                              key={i}
                              // subs={subList} //all existing sub-categories array
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </ul>
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
