import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesList } from '../../../store/actions/categoryAction';
import { Spinner } from '../../../utils/LoadingComponent';
import Form from './CategoryForm';

export default function Category(props) {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category.categories);
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading.loading);
  const [categories, setCategories] = useState([]);

  //DISPATCH GET LIST OF CATEGORIES

  useEffect(() => {
    dispatch(getCategoriesList());
  }, []);

  //SET STATE CATEGORIES IN COMPONENT
  useEffect(() => {
    setCategories(categoryList);
  }, [categoryList]);

  return (
    <div className="category ">
      <h1 className="heading-1 mb-md">Category</h1>

      {/* CHECK ADMIN  */}
      {auth.isAuthenticated && auth.user.role === 'admin' ? (
        <div className="category__container">
          <div className="category__form-box">
            <h3 className=" heading-3">Add Category</h3>
            <Form history={props.history} />
          </div>

          <div className="category__list-box">
            {loading ? (
              <Spinner loading={props.loading} />
            ) : (
              <ul className="category__list">
                {categories.map((c, i) => (
                  <li className="category__item" key={i}>
                    <a href="!#" className="category__link">
                      {c.name}
                    </a>
                  </li>
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
  );
}

// const mapStateToProps = (state) => ({
//   categories: state.category.categories,
//   auth: state.auth,
//   loading: state.loading.loading,
// });

// export default connect(mapStateToProps, { getCategoriesList })(Category);
