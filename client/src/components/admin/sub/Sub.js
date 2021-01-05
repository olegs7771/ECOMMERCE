// style _category.scss

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSubListAction,
  deleteSubAction,
  createSubAction,
} from '../../../store/actions/subAction';

import {
  clearErrorReduxState,
  clearMessageReduxState,
} from '../../../store/actions/categoryAction';
import { Spinner } from '../../../utils/LoadingComponent';
import Form from '../../../utils/AddForm';
import Filter from '../../../utils/FilterForm';
import SubItem from './SubItem';
import sprite from '../../../img/sprite.svg';
import LinkBtn from '../../../utils/LinkBtn';

import ErrorMessageWithBtn from '../../../utils/ErrorMessageWithBtn';
export default function Sub(props) {
  const dispatch = useDispatch();

  // SELECTORS
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading.loading);
  const subs = useSelector((state) => state.sub.subs);
  const message = useSelector((state) => state.message.message);
  const error = useSelector((state) => state.error.error);
  //  STATE
  const [subList, setSublist] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [messageState, setMessageState] = useState(null);
  const [errorState, setErrorState] = useState(null);
  const [name, setName] = useState('');

  // FORM ADD CATEGORY
  const _onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      categoryId: props.match.params.categoryId,
      slug: name,
    };
    dispatch(createSubAction(data));
  };
  const _setName = (e) => {
    setName(e.target.value);
  };

  //LOAD COMPONENT AND FETCH SUB CATEGORIES
  useEffect(() => {
    const data = {
      categoryId: props.match.params.categoryId,
    };
    dispatch(getSubListAction(data));
  }, [dispatch, props.match.params.categoryId]);

  //SET STATE SUBS IN COMPONENT
  useEffect(() => {
    setSublist(subs.filter(searched(keyword)));
  }, [subs, keyword]);
  //SET STATE MESSAGE IN COMPONENT
  useEffect(() => {
    setMessageState(message);
  }, [message]);
  //SET STATE ERROR IN COMPONENT
  useEffect(() => {
    setErrorState(error);
  }, [error]);
  //CLEAR ERROR IN REDUX STATE
  const _clearReduxErrorState = (e) => {
    e.preventDefault();
    setErrorState(null);
    dispatch(clearErrorReduxState());
  };
  //CLEAR MESSAGE IN REDUX STATE
  const _clearReduxMessageState = (e) => {
    e.preventDefault();
    setMessageState(null);
    dispatch(clearMessageReduxState());
  };

  const _deleteSub = (e) => {
    const data = {
      slug: e,
      categoryId: props.match.params.categoryId,
    };
    dispatch(deleteSubAction(data));
  };

  // FILTER SUBS-CATEGORIES
  const _setFilterSearch = (e) => {
    setKeyword(e.target.value.toLocaleLowerCase());
    const data = {
      categoryId: props.match.params.categoryId,
    };
    dispatch(getSubListAction(data));
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  return (
    <div>
      <div className="category">
        <div className="category__header">
          <LinkBtn btnText="back to categories" />

          <h1 className="heading-3 mb-md">
            Sub Categories for [{props.match.params.category}]
          </h1>
        </div>
        {/* CHECK ADMIN  */}
        {auth.isAuthenticated && auth.user.role === 'admin' ? (
          <div className="category__container">
            <div className="category__cta-block">
              {/* FILTER FORM  */}
              <Filter _setFilterSearch={_setFilterSearch} keyword={keyword} />

              {/* CATEGORY CREATE FORM  */}
              <Form
                _onSubmit={_onSubmit}
                name={name}
                _setName={_setName}
                title="add sub-category (name)"
              />
            </div>
            {/*SUB-CATEGORY LIST  */}
            <div className="category__list-box">
              {loading ? (
                <Spinner loading={props.loading} />
              ) : (
                <ul className="category__list">
                  {subList.length === 0 ? (
                    <div className="heading-3">No sub-categories found</div>
                  ) : (
                    <div>
                      {errorState ? (
                        <ErrorMessageWithBtn
                          errorState={errorState}
                          _clearReduxErrorState={_clearReduxErrorState}
                        />
                      ) : (
                        <div>
                          {subList.map((c, i) => (
                            <SubItem
                              c={c}
                              i={i}
                              _deleteSub={_deleteSub}
                              sprite={sprite}
                              key={i}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="admin__container">
            <div className="admin__heading">Access Denied ! Only for admin</div>
            <button className="btn">Login</button>
          </div>
        )}
      </div>
    </div>
  );
}
