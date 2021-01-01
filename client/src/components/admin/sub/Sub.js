// style _category.scss

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSubListAction,
  deleteSubAction,
} from '../../../store/actions/subAction';
import { Spinner } from '../../../utils/LoadingComponent';
import Form from './SubForm';
import Filter from './SubFilter';
import SubItem from './SubItem';
import sprite from '../../../img/sprite.svg';
import LinkBtn from '../../../utils/LinkBtn';

export default function Sub(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading.loading);
  const subs = useSelector((state) => state.sub.subs);

  const [subList, setSublist] = useState([]);
  const [keyword, setKeyword] = useState('');

  //LOAD COMPONENT AND FETCH SUB CATEGORIES
  useEffect(() => {
    const data = {
      categoryId: props.match.params.categoryId,
    };
    dispatch(getSubListAction(data));
  }, [dispatch, props.match.params.categoryId]);

  //SET STATE CATEGORIES IN COMPONENT
  useEffect(() => {
    setSublist(subs.filter(searched(keyword)));
  }, [subs, keyword]);

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
              <Form categoryId={props.match.params.categoryId} />
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
