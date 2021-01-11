import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

export default function LeftDrawer({ open }) {
  const [drawer, setDrawer] = useState(false);

  const drawerRedux = useSelector((state) => state.drawer.drawer_left);

  return (
    <aside className={drawer ? 'drawer drawer--open' : 'drawer '}>Drawer</aside>
  );
}
