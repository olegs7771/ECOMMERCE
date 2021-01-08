import React, { useState } from 'react';
import { deleteOneProduct } from '../../../store/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
export default function ProductTileItem({ i, p, sprite }) {
  //  REDUX
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(false);

  const _focus = () => {
    setFocus(!focus);
  };

  // DELETE PRODUCT
  const _deleteProduct = (e) => {
    const data = { slug: e[0], id: e[1], sub: e[2] };
    dispatch(deleteOneProduct(data));
  };

  return (
    <div
      className={
        focus
          ? ' product__tiles-container--tile product__tiles-container--tile-focus'
          : 'product__tiles-container--tile'
      }
      key={i}
      onClick={_focus}
    >
      <div className="product__tiles-container--tile-header heading-4">
        <div className="product__tiles-container--tile-header--text">
          {p.title}
        </div>
        <svg
          className="category__link-icon"
          onClick={_deleteProduct.bind(this, [p.slug, p._id, p.sub])}
        >
          <use href={sprite + '#icon-bin'} />
        </svg>
      </div>
      <div className="product__tiles-container--tile-body">
        <p className="product__tiles-container--tile-body--text">
          color:{p.color}
        </p>
        <p className="product__tiles-container--tile-body--text">
          brand:{p.brand}
        </p>
        <p className="product__tiles-container--tile-body--text">
          quantity:{p.quantity}
        </p>
        <p className="product__tiles-container--tile-body--text">
          shipping:{p.shipping}
        </p>
        <p className="product__tiles-container--tile-body--text">
          sold:{p.sold}
        </p>
        <p className="product__tiles-container--tile-body--text">
          createdAt: {new Date(p.createdAt).toDateString()}
          {/* updatedAt: {p.updatedAt} */}
        </p>
        <p className="product__tiles-container--tile-body--text">
          updatedAt: {new Date(p.updatedAt).toDateString()}
          {/* updatedAt: {p.updatedAt} */}
        </p>
        <p className="product__tiles-container--tile-body--text">
          price:{p.price}
        </p>
      </div>
    </div>
  );
}
