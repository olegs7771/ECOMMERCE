import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drawerToggle } from '../../store/actions/drawerAction';

export default function Dashboard(props) {
  // REDUX
  const dispatch = useDispatch();
  const drawerRedux = useSelector((state) => state.drawer.drawer);

  return (
    <div className="dashboard">
      <div
        className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => dispatch(drawerToggle(false))}
      ></div>
      <div className="dashboard__container">
        <h2 className="heading-2 mb-sm">User Dashboard</h2>
      </div>
    </div>
  );
}
