// style _category.scss
import NavigationAdmin from '../navigation/NavigationAdmin';
import BreadCrumbs from '../../navigation/BreadCrumbs';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoriesList,
  deleteCategoryAction,
  clearErrorReduxState,
  createCategoryAction,
} from '../../../store/actions/categoryAction';
import { getAllSubAction } from '../../../store/actions/subAction';
import { Spinner } from '../../../utils/LoadingComponent';
import sprite from '../../../img/sprite.svg';
import Form from '../../../utils/AddForm';
import CategoryItem from './CategoryItem';
import Filter from '../../../utils/FilterForm';

import ErrorMessageWithBtn from '../../../utils/ErrorMessageWithBtn';

///////////////////////////////////////////////////////////////////////////

export default function Category(props) {
  const dispatch = useDispatch();
  // SELECTORS
  const categoryList = useSelector((state) => state.category.categories); //get list Redux
  const subList = useSelector((state) => state.sub.subs); //get list Redux
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading.loading);
  const error = useSelector((state) => state.error.error);
  // STATE
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [errorState, setErrorState] = useState(null);
  const [name, setName] = useState('');

  // FORM ADD CATEGORY
  const _onSubmit = (e) => {
    e.preventDefault();
    const data = { name };
    dispatch(createCategoryAction(data));
  };
  const _setName = (e) => {
    setName(e.target.value);
  };

  //LOAD COMPONENT AND FETCH  CATEGORIES
  useEffect(() => {
    dispatch(getCategoriesList());
    dispatch(getAllSubAction());
  }, [dispatch]);

  //SET STATE CATEGORIES IN COMPONENT
  useEffect(() => {
    setCategories(categoryList.filter(searched(keyword)));
    return () => {};
  }, [categoryList, keyword]);

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
    dispatch(getCategoriesList());
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div>
      <NavigationAdmin category={true} />
      <BreadCrumbs link1="/home" href1="/" />
      <div className="category ">
        <h1 className="heading-2 mb-md">Category</h1>

        {/* CHECK ADMIN  */}
        {auth.isAuthenticated && auth.user.role === 'admin' ? (
          <div className="category__container">
            <div className="category__cta-block">
              {/* FILTER FORM  */}
              <Filter
                _setFilterSearch={_setFilterSearch}
                keyword={keyword}
                _setName={_setName}
              />

              {/* CATEGORY CREATE FORM  */}
              <Form
                _onSubmit={_onSubmit}
                name={name}
                _setName={_setName}
                title="add category (name)"
              />
            </div>
            {/* CATEGORY LIST  */}
            <div className="category__list-box">
              {loading ? (
                <Spinner loading={props.loading} />
              ) : (
                <ul className="category__list">
                  {categories.length === 0 ? (
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
                          {categories.map((c, i) => (
                            <CategoryItem
                              c={c}
                              i={i}
                              _deleteCategory={_deleteCategory}
                              sprite={sprite}
                              key={i}
                              subs={subList} //all existing sub-categories to show quantity
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
