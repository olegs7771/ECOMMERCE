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
      {loadingRedux || !productsInCartRedux ? (
        <div>Loading</div>
      ) : (
        <div className="shoppingcart__content">
          {productsInCartRedux.length === 0 ? (
            <div>
              <div className="shoppingcart__content__header">Your C</div>
            </div>
          ) : (
            <div>Products</div>
          )}
        </div>
      )}
    </div>
  );
}
