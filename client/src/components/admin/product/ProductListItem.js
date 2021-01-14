// CHILD COMPONENT OF CATEGORY

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteOneProduct } from '../../../store/actions/productAction';

export default function ProductListItem({
  product,
  sprite,
  categoryId,
  category,
  subId,
}) {
  //  REDUX
  const dispatch = useDispatch();

  const [productState, setProductState] = useState([]);

  // SET PRODUCT TO STATE
  useEffect(() => {
    setProductState(product);
  }, [product]);

  // DELETE PRODUCT
  const _deleteProduct = (e) => {
    const data = { slug: e[0], id: e[1], sub: e[2] };
    dispatch(deleteOneProduct(data));
  };

  return (
    <li className="category__item product__item">
      {/* <a href={`/admin/${c._id}/${c.slug}/sub`} className="category__link"> */}
      {/* p._id, p.slug  */}
      <a
        href={`/product/${product._id}/${product.slug}/${categoryId}/${category}/${subId}`}
        className="category__link"
      >
        {productState.title}
      </a>

      <div className="category__link-icon-box">
        <svg
          className="category__link-icon icon"
          onClick={_deleteProduct.bind(this, [
            product.slug,
            product._id,
            product.sub,
          ])}
        >
          <use href={sprite + '#icon-bin'} />
        </svg>
      </div>
    </li>
  );
}
