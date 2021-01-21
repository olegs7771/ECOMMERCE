import React, { useState } from 'react';
import { deleteOneProduct } from '../../../store/actions/productAction';
import { useDispatch } from 'react-redux';
export default function ProductTileItem({
  i,
  p,
  sprite,
  category,
  categoryId,
  subId,
  history,
}) {
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

  //EDIT PRODUCT
  const _getProduct = (e) => {
    console.log('product', e);
    history.push(`/product/${e[0]}/${e[1]}/${categoryId}/${category}/${subId}`);
  };

  return (
    <div
      className={
        focus
          ? ' product__tiles-container-tile product__tiles-container-tile--focus'
          : 'product__tiles-container-tile'
      }
      key={i}
    >
      <div className="product__tiles-container-tile-top">
        {focus ? (
          <svg
            className="product__tiles-container-tile-icon icon"
            onClick={_focus}
          >
            <use href={sprite + '#icon-shrink2'} />
          </svg>
        ) : (
          <svg
            className="product__tiles-container-tile-icon icon"
            onClick={_focus}
          >
            <use href={sprite + '#icon-enlarge2'} />
          </svg>
        )}
      </div>
      {/* TILE HEADER  */}
      <div
        className={
          focus
            ? 'product__tiles-container-tile-header heading-2 product__tiles-container-tile-header--focus'
            : 'product__tiles-container-tile-header heading-4 product__tiles-container-tile-header'
        }
      >
        <div className="product__tiles-container-tile-header--text">
          {p.title}
        </div>
      </div>
      {/* TILE BODY  */}
      <div
        className={
          focus
            ? 'product__tiles-container-tile-body--focus'
            : 'product__tiles-container-tile-body mb-sm'
        }
      >
        <p className="product__tiles-container-tile-body--text">
          Color : {p.color}
        </p>
        <p className="product__tiles-container-tile-body--text">
          Brand : {p.brand}
        </p>
        <p className="product__tiles-container-tile-body--text">
          Quantity : {p.quantity}
        </p>
        <p className="product__tiles-container-tile-body--text">
          Shipping{''}:{''}
          {p.shipping}
        </p>
        <p className="product__tiles-container-tile-body--text">
          Sold : {p.sold}
        </p>
        <p className="product__tiles-container-tile-body--text">
          Price : {p.price}
        </p>
        <p className="product__tiles-container-tile-body--text">
          Images : {p.images.length}
        </p>
        <p className="product__tiles-container-tile-body--text">
          createdAt{'  '}: {new Date(p.createdAt).toDateString()}
          {/* updatedAt: {p.updatedAt} */}
        </p>
        <p className="product__tiles-container-tile-body--text">
          updatedAt : {new Date(p.updatedAt).toDateString()}
          {/* updatedAt: {p.updatedAt} */}
        </p>
      </div>
      {/* TILE FOOTER  */}
      <div
        className={
          focus
            ? 'product__tiles-container-tile-footer product__tiles-container-tile-footer--focus'
            : 'product__tiles-container-tile-footer'
        }
      >
        <svg
          className="product__tiles-container-tile-icon icon"
          onClick={_getProduct.bind(this, [p._id, p.slug])}
        >
          <use href={sprite + '#icon-pencil'} />
        </svg>
        <svg
          className="product__tiles-container-tile-icon icon"
          onClick={_deleteProduct.bind(this, [p.slug, p._id, p.sub])}
        >
          <use href={sprite + '#icon-bin'} />
        </svg>
      </div>
    </div>
  );
}
