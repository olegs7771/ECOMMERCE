import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCategoriesList } from '../../../store/actions/categoryAction';
import { Spinner } from '../../../utils/LoadingComponent';
export const Category = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    props.getCategoriesList();
  }, []);

  useEffect(() => {
    setCategories(props.categories);
  });

  console.log('categories', categories);

  return (
    <div className="category ">
      <h1 className="heading-1 mb-md">Category</h1>

      {/* CHECK ADMIN  */}
      {props.auth.isAuthenticated && props.auth.user.role === 'admin' ? (
        <div className="category__container">
          <div className="category__btn-group">
            <button className="btn">Add Category</button>
          </div>

          {props.loading ? (
            <Spinner loading={props.loading} />
          ) : (
            <div className="category__list-box">
              {categories.map((c, i) => (
                <ul className="category__list">
                  <li className="category__item" key={i}>
                    <a href="!#" className="category__link">
                      {c.name}
                    </a>
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="admin__container">
          <div className="admin__heading">Access Denied ! Only for admin</div>
          <button className="btn">Login</button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
  auth: state.auth,
  loading: state.loading.loading,
});

export default connect(mapStateToProps, { getCategoriesList })(Category);
