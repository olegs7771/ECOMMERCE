import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProdactsFromCookiesAction } from '../../store/actions/productAction';

export default function ShoppingCart(props) {
  const dispatch = useDispatch();
  // REDUX
  const productsInCartRedux = useSelector(
    (state) => state.product.shoppingcart
  );
  const loadingRedux = useSelector((state) => state.loading.loading);

  // GET PRODUCTS ON LOAD
  const arrOfIds = Object.keys(props.cookies.cookies).map((el) =>
    el.substring(12)
  );
  console.log('arrOfIds', arrOfIds);

  useEffect(() => {
    dispatch(fetchProdactsFromCookiesAction({ data: arrOfIds }));
  }, [dispatch]);

  return (
    <div className="page shoppingcart">
      <div className="container">
        {loadingRedux || !productsInCartRedux ? (
          <div>Loading</div>
        ) : (
          <div>
            {productsInCartRedux.length === 0 ? (
              //   EMPTY CART
              <div className="shoppingcart__wrapper">Empty Cart</div>
            ) : (
              //  CART WITH PRODUCTS
              <div className="shoppingcart__wrapper">Product in cart</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
