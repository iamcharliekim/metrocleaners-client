import React from 'react';

const Context = React.createContext({
  onOpenNav: () => {},
  openNav: '',
  customers: '',
  clerks: '',
  orders: '',
  updateCustomers: () => {},
  updateClerks: () => {},
  updateOrders: () => {},
  editOrders: () => {}
});

export default Context;
