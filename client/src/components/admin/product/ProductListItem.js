// CHILD COMPONENT OF CATEGORY

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteOneProduct } from '../../../store/actions/productAction';

export default function ProductListItem({
  p,
  history,
  sprite,
  categoryId,
  category,
  subId,

  // i,
}) {
  //  REDUX
  const dispatch = useDispatch();

  const [productState, setProductState] = useState([]);

  // SET PRODUCT TO STATE
  useEffect(() => {
    setProductState(p);
  }, [p]);

  //EDIT PRODUCT
  const _getProduct = (e) => {
    console.log('product', e);
    history.push(`/product/${e[0]}/${e[1]}/${categoryId}/${category}/${subId}`);
  };

  // DELETE PRODUCT
  const _deleteProduct = (e) => {
    const data = { slug: e[0], id: e[1], sub: e[2] };
    dispatch(deleteOneProduct(data));
  };

  return (
    <li className="category__item product__item">
      <a
        href={`/product/${p._id}/${p.slug}/${categoryId}/${category}/${subId}`}
        className="category__link"
      >
        {productState.title}
      </a>

      <div className="category__link-icon-box">
        <svg
          className="category__link-icon icon"
          onClick={_getProduct.bind(this, [p._id, p.slug])}
        >
          <use href={sprite + '#icon-pencil'} />
        </svg>
        <svg
          className="category__link-icon icon"
          onClick={_deleteProduct.bind(this, [p.slug, p._id, p.sub])}
        >
          <use href={sprite + '#icon-bin'} />
        </svg>
      </div>
    </li>
  );
}
