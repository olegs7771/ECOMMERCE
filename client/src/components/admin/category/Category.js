import React, { useState } from 'react';
import { connect } from 'react-redux';

export const Category = (props) => {
  return (
    <div className="category ">
      <h1 className="heading-1 mb-md">Category</h1>
      <div className="category__container">
        <div className="category__btn-group">
          <button className="btn">Add Category</button>
          <button className="btn">Delete Category</button>
        </div>
        <div className="category__list-box">Categories</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Category);
