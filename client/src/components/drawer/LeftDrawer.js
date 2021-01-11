import React from 'react';

export default function LeftDrawer({ open }) {
  return (
    <aside className={open ? 'drawer drawer--open' : 'drawer '}>Drawer</aside>
  );
}
