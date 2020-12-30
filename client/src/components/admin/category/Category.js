// style _category.scss
import NavigationAdmin from '../navigation/NavigationAdmin';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoriesList,
  deleteCategoryAction,
} from '../../../store/actions/categoryAction';
import { Spinner } from '../../../utils/LoadingComponent';
import sprite from '../../../img/sprite.svg';
import Form from './CategoryForm';
import CategoryItem from './CategoryItem';
import Filter from './CategoryFilter';

export default function Category(props) {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category.categories);
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading.loading);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');

  //DISPATCH GET LIST OF CATEGORIES

  useEffect(() => {
    dispatch(getCategoriesList());
  }, [dispatch]);

  //SET STATE CATEGORIES IN COMPONENT
  useEffect(() => {
    setCategories(categoryList);
  }, [categoryList]);

  const _deleteCategory = (e) => {
    dispatch(deleteCategoryAction({ slug: e }));
  };

  const _setFilterSearch = (e) => {
    setKeyword(e.target.value.toLocaleLowerCase());
    dispatch(getCategoriesList());
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div>
      <NavigationAdmin />
      <div className="category ">
        <h1 className="heading-1 mb-md">Category</h1>

        {/* CHECK ADMIN  */}
        {auth.isAuthenticated && auth.user.role === 'admin' ? (
          <div className="category__container">
            <div className="category__cta-block">
              {/* FILTER FORM  */}
              <div className="form-group">
                <label>
                  <div className="form-label--name">Search category</div>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={keyword}
                    onChange={_setFilterSearch}
                    required
                  />
                </label>
              </div>

              {/* CATEGORY CREATE FORM  */}
              <Form history />
            </div>
            {/* CATEGORY LIST  */}
            <div className="category__list-box">
              {loading ? (
                <Spinner loading={props.loading} />
              ) : (
                <ul className="category__list">
                  {categories.filter(searched(keyword)).map((c, i) => (
                    <CategoryItem
                      c={c}
                      i={i}
                      _deleteCategory={_deleteCategory}
                      sprite={sprite}
                      key={i}
                    />
                  ))}
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
