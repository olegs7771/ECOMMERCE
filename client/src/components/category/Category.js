// Public Page . Showing list of categories

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drawerToggle } from '../../store/actions/drawerAction';
import { getCategoriesList } from '../../store/actions/categoryAction';
import no_image from '../../img/no_image.png';
import { Image } from 'cloudinary-react';
import BreadCrumbs from '../navigation/BreadCrumbs';

export default function Category() {
  const dispatch = useDispatch();

  const drawerRedux = useSelector((state) => state.drawer.drawer);
  const categoriesRedux = useSelector((state) => state.category.categories);
  const loadingRedux = useSelector((state) => state.loading.loading);

  // ON LOAD GET ALL CATEGORIES

  useEffect(() => {
    dispatch(getCategoriesList());
  }, [dispatch]);

  return (
    <div className="pub-category">
      <div
        className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => dispatch(drawerToggle(false))}
      ></div>

      <div className="pub-category__container">
        <BreadCrumbs href1={'/'} link1={'Home'} current={'Category'} />
        <h2 className="heading-2 mb-md pub-category__heading  ">Categories </h2>
        {loadingRedux ? (
          <div>Loading..</div>
        ) : (
          <div>
            {categoriesRedux.length === 0 ? (
              <div>No Categories to show</div>
            ) : (
              <div className="pub-category__list">
                {categoriesRedux.map((category, index) => (
                  <a
                    href={`/category/${category.slug}/${category._id}`}
                    key={index}
                    className="pub-category__card"
                  >
                    {category.image ? (
                      <Image
                        cloudName="dyl4kpmie"
                        publicId={category.image}
                        width="300"
                        crop="scale"
                        className="pub-category__card--img "
                      />
                    ) : (
                      <img
                        src={no_image}
                        alt="category"
                        className="pub-category__card--img"
                      />
                    )}
                    <div className="pub-category__card--name">
                      {category.name}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
