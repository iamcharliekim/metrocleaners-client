import React from 'react';

const Context = React.createContext({
  onOpenNav: () => {},
  openNav: '',

  updateCustomers: () => {},
  customers: [{ full_name: 'Test Customer', phone_number: '1234567890' }],

  orders: [{ order_number: 'M2021', phone_number: '1234567890', customer: 'Test Customer' }],
  filteredOrders: [],
  updateOrders: () => {},
  editOrders: () => {},
  deleteOrder: () => {},
  checkForOrderUpdates: () => {},

  clerks: [],
  updateClerks: () => {},

  onSearchOrders: () => {},
  onSortOrders: () => {},
  onSortByDropdown: () => {},

  sortByPastBtnActive: () => {},
  pastActive: '',
  sortByUpcomingBtnActive: () => {},
  upcomingActive: '',
  sortByAllbtnActive: () => {},
  allActive: '',

  sortByPickedUpBtnActive: () => {},
  pickedUpActive: '',

  sortByNotifiedBtnActive: () => {},
  notifiedActive: '',

  sortByPickedUpAndNotifiedBtnActive: () => {},
  bothActive: '',

  sortByPriceBtnActive: () => {},
  priceActive: '',
  sortByReadyDateBtnActive: () => {},
  readyByActive: '',
  sortByOrderDateBtnActive: () => {},
  orderedActive: '',

  onOpenSortDropdown: () => {},
  openPriceSortPanel: '',
  openReadyByDateSortPanel: '',
  openOrderDateSortPanel: '',

  onOpenSearchByPanel: () => {},
  openSearchByPanel: '',
  onClickSearchByBtn: () => {},

  selectedPriceOptionIndex: '',
  selectedReadyDateOptionIndex: '',
  selectedOrderDateOptionIndex: '',
  selectedSearchOptionIndex: '',
  selectedOptionValue: '',

  boxChecked: [],
  snapshot: '',
  nullifySnapshot: () => {}
});

export default Context;
