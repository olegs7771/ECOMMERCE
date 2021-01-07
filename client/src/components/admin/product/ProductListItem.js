// CHILD COMPONENT OF CATEGORY

import React, { useState, useEffect } from 'react';
// import { useDispatch} from 'react-redux';

export default function ProductListItem({ product, _deleteCategory, sprite }) {
  //  REDUX
  // const dispatch = useDispatch();

  const [productState, setProductState] = useState([]);

  // SET PRODUCT TO STATE
  useEffect(() => {
    setProductState(product);
  }, [product]);

  return (
    <div className="category__item-block">
      <li className="category__item ">
        {/* <a href={`/admin/${c._id}/${c.slug}/sub`} className="category__link"> */}
        <a href="!#" className="category__link">
          {productState.title}
        </a>

        <div className="category__link-icon-box">
          <a
            // href={`/admin/${c._id}/${c.slug}/sub`}
            href="!#"
            className="category__link--qnt"
          >
            <div className="category__item-qnt">
              <span className="category__item-qnt--text"> items</span>
            </div>
          </a>
        </div>
      </li>
    </div>
  );
}