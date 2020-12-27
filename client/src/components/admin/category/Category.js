import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCategoriesList } from '../../../store/actions/categoryAction';

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
      <div className="category__container">
        <div className="category__btn-group">
          <button className="btn">Add Category</button>
          <button className="btn">Delete Category</button>
        </div>
        <div className="category__list-box">
          {categories.map((c, i) => (
            <li key={i}>{c.name}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.categories,
});

export default connect(mapStateToProps, { getCategoriesList })(Category);
