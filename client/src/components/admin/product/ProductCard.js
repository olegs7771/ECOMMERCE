import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteOneProduct,
  getOneProduct,
} from '../../../store/actions/productAction';
import { Spinner } from '../../../utils/LoadingComponent';

export default function ProductCard(props) {
  //  REDUX
  const auth = useSelector((state) => state.auth);
  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.loading.loading);
  const error = useSelector((state) => state.error.error);
  const dispatch = useDispatch();

  //  ON LOAD FETCH PRODUCT DETAILS

  useEffect(() => {
    const data = {
      productId: props.match.params.productId,
      slug: props.match.params.slug,
    };
    dispatch(getOneProduct(data));
  }, [dispatch, props.match.params.productId, props.match.params.slug]);

  return (
    <div className="card">
      {auth.isAuthenticated && auth.user.role === 'admin' ? (
        <div className="card-wrapper">
          {loading || !product ? (
            <Spinner />
          ) : (
            //////////////////////////////////////////////////////////////
            // CARD
            <div className="card__container">
              <div className="card__container__gallery">IMAGE GAllery</div>

              <div className="card__container__detail">
                {/* HEADER  */}
                <div className="card__container__detail-header">
                  <div className="card__container__detail-header--title">
                    {product.title}
                  </div>
                  <div className="card__container__detail-header--price">
                    {product.price}
                  </div>
                  {/* BODY  */}
                  <div className="card__container__detail-body">
                    <div className="card__container__detail-body--description">
                      {product.description}
                    </div>
                    <div className="card__container__detail-body--quantity">
                      Quantity:{product.quantity}
                    </div>
                    <div className="card__container__detail-body--shipping">
                      Shipping:{product.shipping}
                    </div>
                    <div className="card__container__detail-body--color">
                      Color:{product.color}
                    </div>
                    <div className="card__container__detail-body--createdAt">
                      Created:{new Date(product.createdAt).toDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            //////////////////////////////////////////////////////////////////////
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
}
