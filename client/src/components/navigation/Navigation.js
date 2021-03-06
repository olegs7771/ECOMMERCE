import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import Logo from '../../img/ecommerce-logo.png';
import { withRouter } from 'react-router-dom';
import sprite from '../../img/sprite.svg';
import sprite_material from '../../img/sprite_material.svg';
import GoogleLogout from '../auth/GoogleoAUthLogout';
import { drawerToggle } from '../../store/actions/drawerAction';

const Navigation = ({ history }) => {
  // REDUX
  const dispatch = useDispatch();
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  const auth = useSelector((state) => state.auth);
  const cartRedux = useSelector((state) => state.cart.shoppingcart);

  // STATE
  const [drawer, setDrawer] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [cart, setCart] = useState(false); //show blue dot if cart has products

  // SET DRAWER REDUX IN STATE
  useEffect(() => {
    if (!drawerRedux) {
      setDrawer(drawerRedux);
    }
  }, [drawerRedux]);

  const _drawerToggle = () => {
    console.log('menu click');
    setDrawer(!drawer);
  };
  useEffect(() => {
    dispatch(drawerToggle(drawer));
  }, [dispatch, drawer]);

  ///////////////////////////////////////////////////////////

  // SCROLL OFFSET
  useScrollPosition((position) => {
    if (position.currPos.y > position.prevPos.y) {
      setScrollDirection('up');
    } else {
      setScrollDirection('down');
    }
  });

  // SET CART STATE IF CART PRODUCTS CHANGE IN SHOPPING CART in cookies
  useEffect(() => {
    if (Object.keys(cartRedux).length !== 0) {
      if (cartRedux.products.length !== 0) {
        setCart(true); //check for cookies
      } else {
        setCart(false);
      }
    }
  }, [cartRedux]);

  return (
    <header
      className={
        scrollDirection === 'up'
          ? 'header header--visible'
          : scrollDirection === 'down'
          ? 'header'
          : 'header header--visible'
      }
    >
      <div className="header__container">
        <div className="header__container__inner">
          {/* ASIDE  */}
          <div className="header__container__inner__aside">
            <div className="nav__link-icon-box" onClick={_drawerToggle}>
              <svg className="icon">
                <use href={sprite_material + '#icon-menu'} />
              </svg>
            </div>
          </div>
          <nav className="nav ">
            {/* FLEX  */}
            {/* TOGGLE AUTH BLOCK  */}
            {auth.isAuthenticated ? (
              <ul className="nav__list">
                {/* LOGO */}
                <li className="nav__item ">
                  <a href="/" className="nav__link nav__link-logo">
                    <img src={Logo} alt="logo" className="nav__item__logo" />
                  </a>
                </li>
                <li className="nav__item nav__link-icon-box nav__link-icon-box--no-b-radius">
                  <a href="/dashboard" className="nav__link">
                    <svg className="icon">
                      <use href={sprite_material + '#icon-dashboard'} />
                    </svg>
                    Dashboard
                  </a>
                </li>

                <div className="nav__auth">
                  {/* SHOW ONLY IF ROLE ADMIN  */}
                  {auth.user.role === 'admin' ? (
                    <li className="nav__item nav__link-icon-box">
                      <a href="/admin" className="nav__link">
                        <svg className="icon">
                          <use href={sprite + '#icon-user-tie'} />
                        </svg>
                      </a>
                    </li>
                  ) : null}
                  <li className="nav__item ">
                    <a href="/profile" className="nav__auth-box">
                      <div className="nav__img-box">
                        {/* CHECK IF USERS SIGNED WITH oAUTH2 */}
                        <img
                          src={
                            auth.user.avatar.startsWith('https://lh3')
                              ? `${auth.user.avatar}`
                              : `https://test-ecommerce-bucket-1.s3.amazonaws.com/avatars/${auth.user.avatar}`
                          }
                          alt="user img"
                          className="nav__img"
                        />
                      </div>
                      <span className="nav__auth--name">{auth.user.name}</span>
                    </a>
                  </li>

                  <li className="nav__item">
                    <GoogleLogout history={history} />
                  </li>
                  <li className="nav__item ">
                    <a
                      href="/shoppingcart"
                      className={
                        cart
                          ? ' nav__link  nav__link-cart' //show blue dot if cart not empty
                          : 'nav__link'
                      }
                    >
                      <svg className="nav__link-icon ">
                        <use
                          href={sprite_material + '#icon-local_grocery_store'}
                        />
                      </svg>
                    </a>
                  </li>
                  <div
                    className="nav__link-icon-box nav__link-icon-box--visible"
                    onClick={_drawerToggle}
                  >
                    <svg className="icon">
                      <use href={sprite_material + '#icon-menu'} />
                    </svg>
                  </div>
                </div>
              </ul>
            ) : (
              // NOT AUTHENTICATED 🛑
              <ul className="nav__list">
                {/* LOGO */}
                <li className="nav__item ">
                  <a href="/" className="nav__link nav__link-logo">
                    <img src={Logo} alt="logo" className="nav__item__logo" />
                  </a>
                </li>
                {/* SEARCH  */}
                <li className="nav__item nav__item__search">
                  <svg className="nav__link-icon nav__item__search__icon ">
                    <use href={sprite_material + '#icon-search'} />
                  </svg>
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="nav__item__search__input"
                  />
                </li>

                <div className="nav__auth">
                  <li className="nav__item">
                    <a href="/login" className="nav__link">
                      <svg className="nav__link-icon ">
                        <use href={sprite_material + '#icon-person_outline'} />
                      </svg>
                      Sign In
                    </a>
                  </li>
                  <li className="nav__item">
                    <a href="/register" className="nav__link">
                      <svg className="nav__link-icon">
                        <use href={sprite_material + '#icon-person_add_alt'} />
                      </svg>
                      Sign Up
                    </a>
                  </li>
                  <li className="nav__item ">
                    <a
                      href="/shoppingcart"
                      className={
                        cart
                          ? ' nav__link  nav__link-cart' //show blue dot if cart not empty
                          : 'nav__link'
                      }
                    >
                      <svg className="nav__link-icon ">
                        <use
                          href={sprite_material + '#icon-local_grocery_store'}
                        />
                      </svg>
                    </a>
                  </li>
                  <div
                    className="nav__link-icon-box nav__link-icon-box--visible"
                    onClick={_drawerToggle}
                  >
                    <svg className="icon">
                      <use href={sprite_material + '#icon-menu'} />
                    </svg>
                  </div>
                </div>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Navigation);
