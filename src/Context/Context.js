import React from 'react';

const Context = React.createContext({
  onOpenNav: () => {},
  openNav: '',
  customers: ''
});

export default Context;
