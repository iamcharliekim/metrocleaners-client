import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';
import styles from './App.module.css';
import Context from './Context/Context';
import CreateOrder from './CreateOrder/CreateOrder';
import Customers from './Customers/Customers';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import OrderDetails from './OrderDetails/OrderDetails';
import ClerksService from './Services/ClerksService';
import CustomersService from './Services/CustomersService';
import OrdersService from './Services/OrdersService';
import TokenService from './Services/TokenService';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import moment from 'moment';

export default class App extends React.Component {
  static contextType = Context;

  state = {
    openNav: false,
    customers: '',

    orders: [],
    filteredOrders: [],

    clerks: '',

    pastActive: false,
    upcomingActive: false,
    allActive: false,

    priceActive: false,
    readyByActive: false,
    orderedActive: false,

    openPriceSortPanel: false,
    openReadyByDateSortPanel: false,
    openOrderDateSortPanel: false,

    openSearchByPanel: false,
    searchBy: 'all',

    selectedPriceOptionIndex: false,
    selectedReadyDateOptionIndex: false,
    selectedOrderDateOptionIndex: false,
    selectedSearchOptionIndex: 0,
    selectedOptionValue: ''
  };

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      OrdersService.getOrders().then(orders => {
        if (orders) {
          CustomersService.getCustomers().then(customers => {
            if (customers) {
              ClerksService.getClerks().then(clerks => {
                if (clerks) {
                  this.setState({
                    orders,
                    filteredOrders: orders,
                    customers,
                    clerks
                  });
                }
              });
            }
          });
        }
      });

      this.ordersInterval = setInterval(this.checkForOrderUpdates, 5000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.ordersInterval);
  }

  checkForOrderUpdates = () => {
    OrdersService.getOrders().then(orders => {
      orders.forEach(newOrder => {
        let order = this.state.orders.find(o => o.id === newOrder.id);
        if (newOrder.notification_sent !== order.notification_sent) {
          this.editOrders(newOrder);
        }
      });
    });
  };

  updateCustomers = customers => {
    const customersCopy = [...this.state.customers];
    customersCopy.push(customers);
    this.setState({ customers: customersCopy });
  };

  updateClerks = clerks => {
    const clerksCopy = [...this.state.clerks];
    clerksCopy.push(clerks);
    this.setState({ clerks: clerksCopy });
  };

  updateOrders = orders => {
    const ordersCopy = [...this.state.orders];
    ordersCopy.push(orders);
    this.setState({ filteredOrders: ordersCopy, orders: ordersCopy });
  };

  clearOrders = () => {
    this.setState({ filteredOrders: [], orders: [] });
  };

  editOrders = editedOrder => {
    const ordersCopy = [...this.state.orders];
    const index = ordersCopy.findIndex(order => order.id === editedOrder.id);
    ordersCopy[index] = editedOrder;

    this.setState({ filteredOrders: ordersCopy, orders: ordersCopy });
  };

  // SEARCH-ORDERS ---------------------------------------------------

  // search-orders filter-function
  onSearchOrders = e => {
    const searchString = e.target.value;

    let ordersCopy = [...this.state.orders];
    let filteredOrders;

    if (this.state.searchBy === 'all') {
      filteredOrders = ordersCopy.filter(order => {
        return (
          order['order_number'].toLowerCase().includes(searchString.toLowerCase()) ||
          order['clerk'].toLowerCase().includes(searchString.toLowerCase()) ||
          order['customer'].toLowerCase().includes(searchString.toLowerCase()) ||
          order['phone_number'].toLowerCase().includes(searchString.toLowerCase()) ||
          order['price'].toLowerCase().includes(searchString.toLowerCase())
        );
      });
    } else {
      filteredOrders = ordersCopy.filter(order => {
        return order[this.state.searchBy].toLowerCase().includes(searchString.toLowerCase());
      });
    }

    this.setState({
      filteredOrders,
      searchString
    });
  };

  // search-options active/inactive-class function
  onClickSearchByBtn = searchBy => {
    if (searchBy === 'all') {
      this.setState({
        searchBy: 'all',
        selectedSearchOptionIndex: 0,
        selectedOptionValue: '',
        openSearchByPanel: false,
        pastActive: false,
        upcomingActive: false,
        allActive: false,
        priceActive: false,
        readyByActive: false,
        orderedActive: false,
        selectedPriceOptionIndex: false,
        selectedReadyDateOptionIndex: false,
        selectedOrderDateOptionIndex: false
      });
    }

    if (searchBy === 'order_number') {
      this.setState({
        searchBy: 'order_number',
        selectedSearchOptionIndex: 1,
        selectedOptionValue: 'Order #',
        openSearchByPanel: false,
        pastActive: false,
        upcomingActive: false,
        allActive: false,
        priceActive: false,
        readyByActive: false,
        orderedActive: false,
        selectedPriceOptionIndex: false,
        selectedReadyDateOptionIndex: false,
        selectedOrderDateOptionIndex: false
      });
    }

    if (searchBy === 'clerk') {
      this.setState({
        searchBy: 'clerk',
        selectedSearchOptionIndex: 2,
        selectedOptionValue: 'Clerk',
        openSearchByPanel: false,
        pastActive: false,
        upcomingActive: false,
        allActive: false,
        priceActive: false,
        readyByActive: false,
        orderedActive: false,
        selectedPriceOptionIndex: false,
        selectedReadyDateOptionIndex: false,
        selectedOrderDateOptionIndex: false
      });
    }

    if (searchBy === 'customer') {
      this.setState({
        searchBy: 'customer',
        selectedSearchOptionIndex: 3,
        selectedOptionValue: 'Customer',
        openSearchByPanel: false,
        pastActive: false,
        upcomingActive: false,
        allActive: false,
        priceActive: false,
        readyByActive: false,
        orderedActive: false,
        selectedPriceOptionIndex: false,
        selectedReadyDateOptionIndex: false,
        selectedOrderDateOptionIndex: false
      });
    }

    if (searchBy === 'phone_number') {
      this.setState({
        searchBy: 'phone_number',
        selectedSearchOptionIndex: 4,
        selectedOptionValue: 'Phone #',
        openSearchByPanel: false,
        pastActive: false,
        upcomingActive: false,
        allActive: false,
        priceActive: false,
        readyByActive: false,
        orderedActive: false,
        selectedPriceOptionIndex: false,
        selectedReadyDateOptionIndex: false,
        selectedOrderDateOptionIndex: false
      });
    }

    if (searchBy === 'price') {
      this.setState({
        searchBy: 'price',
        selectedSearchOptionIndex: 5,
        selectedOptionValue: 'Price',
        openSearchByPanel: false,
        pastActive: false,
        upcomingActive: false,
        allActive: false,
        priceActive: false,
        readyByActive: false,
        orderedActive: false,
        selectedPriceOptionIndex: false,
        selectedReadyDateOptionIndex: false,
        selectedOrderDateOptionIndex: false
      });
    }
  };

  // search-orders open/close functions
  onOpenSearchByPanel = () => {
    this.setState({
      openSearchByPanel: !this.state.openSearchByPanel,
      openPriceSortPanel: false,
      openReadyByDateSortPanel: false,
      openOrderDateSortPanel: false
    });
  };

  // SORT-BUTTONS ---------------------------------------------------

  // sort-buttons sorting-functions
  onSortOrders = sortBy => {
    const today = new Date().getTime();
    const ordersCopy = [...this.state.orders];
    let filteredOrders;

    if (sortBy === 'all') {
      filteredOrders = ordersCopy;
    }
    if (sortBy === 'past') {
      filteredOrders = ordersCopy.filter(
        order =>
          moment(order.order_date)
            .local(true)
            .valueOf() < today
      );
    }
    if (sortBy === 'upcoming') {
      filteredOrders = ordersCopy.filter(
        order =>
          moment(order.order_date)
            .local(true)
            .valueOf() > today
      );
    }

    this.setState({
      filteredOrders
    });
  };

  // sort-buttons active/inactive-class functions
  sortByPastBtnActive = () => {
    this.setState({
      searchBy: 'all',
      pastActive: true,
      upcomingActive: false,
      allActive: false,
      priceActive: false,
      readyByActive: false,
      orderedActive: false,
      selectedPriceOptionIndex: false,
      selectedReadyDateOptionIndex: false,
      selectedOrderDateOptionIndex: false,
      selectedSearchOptionIndex: 0,
      selectedOptionValue: '',
      openPriceSortPanel: false,
      openReadyByDateSortPanel: false,
      openOrderDateSortPanel: false
    });
  };

  sortByUpcomingBtnActive = () => {
    this.setState({
      searchBy: 'all',

      pastActive: false,
      upcomingActive: true,
      allActive: false,
      priceActive: false,
      readyByActive: false,
      orderedActive: false,
      selectedPriceOptionIndex: false,
      selectedReadyDateOptionIndex: false,
      selectedOrderDateOptionIndex: false,
      selectedSearchOptionIndex: 0,
      selectedOptionValue: '',
      openPriceSortPanel: false,
      openReadyByDateSortPanel: false,
      openOrderDateSortPanel: false
    });
  };

  sortByAllBtnActive = () => {
    this.setState({
      searchBy: 'all',

      pastActive: false,
      upcomingActive: false,
      allActive: true,
      priceActive: false,
      readyByActive: false,
      orderedActive: false,
      selectedPriceOptionIndex: false,
      selectedReadyDateOptionIndex: false,
      selectedOrderDateOptionIndex: false,
      selectedSearchOptionIndex: 0,
      selectedOptionValue: '',
      openPriceSortPanel: false,
      openReadyByDateSortPanel: false,
      openOrderDateSortPanel: false
    });
  };

  // SORT-DROPDOWNS ---------------------------------------------------

  // sort-dropdowns sorting-functions
  onSortByDropdown = (sortBy, sortOrder) => {
    const ordersCopy = [...this.state.orders];
    let sortedOrders;

    if (sortBy === 'price' && sortOrder === 'Highest') {
      sortedOrders = ordersCopy.sort((a, b) => {
        if (Number(a[sortBy]) > Number(b[sortBy])) {
          return -1;
        } else if (Number(a[sortBy]) < Number(b[sortBy])) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    if (sortBy === 'price' && sortOrder === 'Lowest') {
      sortedOrders = ordersCopy.sort((a, b) => {
        if (Number(a[sortBy]) > Number(b[sortBy])) {
          return 1;
        } else if (Number(a[sortBy]) < Number(b[sortBy])) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    if ((sortBy === 'ready_by_date' || sortBy === 'order_date') && sortOrder === 'Newest') {
      sortedOrders = ordersCopy.sort((a, b) => {
        if (moment(a[sortBy]).valueOf() > moment(b[sortBy]).valueOf()) {
          return -1;
        } else if (moment(a[sortBy]).valueOf() < moment(b[sortBy]).valueOf()) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    if ((sortBy === 'ready_by_date' || sortBy === 'order_date') && sortOrder === 'Oldest') {
      sortedOrders = ordersCopy.sort((a, b) => {
        if (new Date(a[sortBy]).getTime() > new Date(b[sortBy]).getTime()) {
          return 1;
        } else if (new Date(a[sortBy]) < new Date(b[sortBy])) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    this.setState({ filteredOrders: sortedOrders });
  };

  // sort-dropdowns open/close functions
  onOpenSortDropdown = sortBy => {
    if (sortBy === 'price') {
      this.setState((prevState, props) => {
        return {
          openPriceSortPanel: !prevState.openPriceSortPanel,
          openReadyByDateSortPanel: false,
          openOrderDateSortPanel: false,
          openSearchByPanel: false
        };
      });
    }

    if (sortBy === 'ready_by_date') {
      this.setState((prevState, props) => {
        return {
          openReadyByDateSortPanel: !prevState.openReadyByDateSortPanel,
          openPriceSortPanel: false,
          openOrderDateSortPanel: false,
          openSearchByPanel: false
        };
      });
    }

    if (sortBy === 'order_date') {
      this.setState((prevState, props) => {
        return {
          openOrderDateSortPanel: !prevState.openOrderDateSortPanel,
          openPriceSortPanel: false,
          openReadyByDateSortPanel: false,
          openSearchByPanel: false
        };
      });
    }
  };

  // sort-dropdowns active/inactive-class functions
  sortByPriceBtnActive = index => {
    this.setState({
      searchBy: 'all',
      pastActive: false,
      upcomingActive: false,
      allActive: false,
      priceActive: true,
      readyByActive: false,
      orderedActive: false,
      selectedPriceOptionIndex: index,
      selectedReadyDateOptionIndex: false,
      selectedOrderDateOptionIndex: false,
      selectedSearchOptionIndex: 0,
      selectedOptionValue: ''
    });
  };

  sortByReadyDateBtnActive = index => {
    this.setState({
      searchBy: 'all',
      pastActive: false,
      upcomingActive: false,
      allActive: false,
      priceActive: false,
      readyByActive: true,
      orderedActive: false,
      selectedPriceOptionIndex: false,
      selectedReadyDateOptionIndex: index,
      selectedOrderDateOptionIndex: false,
      selectedSearchOptionIndex: 0,
      selectedOptionValue: ''
    });
  };

  sortByOrderDateBtnActive = index => {
    this.setState({
      searchBy: 'all',
      pastActive: false,
      upcomingActive: false,
      allActive: false,
      priceActive: false,
      readyByActive: false,
      orderedActive: true,
      selectedPriceOptionIndex: false,
      selectedReadyDateOptionIndex: false,
      selectedOrderDateOptionIndex: index,
      selectedSearchOptionIndex: 0,
      selectedOptionValue: ''
    });
  };

  // UTILITY FUNCTIONS ---------------------------------------------------
  onOpenNav = () => {
    this.setState({ openNav: !this.state.openNav });
  };

  signout = () => {
    TokenService.clearAuthToken();
    this.onOpenNav();
  };

  render() {
    const contextVal = {
      onOpenNav: this.onOpenNav,
      openNav: this.state.openNav,

      updateCustomers: this.updateCustomers,
      customers: this.state.customers,

      orders: this.state.orders,
      filteredOrders: this.state.filteredOrders,
      updateOrders: this.updateOrders,
      editOrders: this.editOrders,
      clearOrders: this.clearOrders,
      checkForOrderUpdates: this.checkForOrderUpdates,

      clerks: this.state.clerks,
      updateClerks: this.updateClerks,

      onSearchOrders: this.onSearchOrders,
      onSortOrders: this.onSortOrders,
      onSortByDropdown: this.onSortByDropdown,

      sortByPastBtnActive: this.sortByPastBtnActive,
      pastActive: this.state.pastActive,
      sortByUpcomingBtnActive: this.sortByUpcomingBtnActive,
      upcomingActive: this.state.upcomingActive,
      sortByAllBtnActive: this.sortByAllBtnActive,
      allActive: this.state.allActive,

      sortByPriceBtnActive: this.sortByPriceBtnActive,
      priceActive: this.state.priceActive,
      sortByReadyDateBtnActive: this.sortByReadyDateBtnActive,
      readyByActive: this.state.readyByActive,
      sortByOrderDateBtnActive: this.sortByOrderDateBtnActive,
      orderedActive: this.state.orderedActive,

      onOpenSortDropdown: this.onOpenSortDropdown,
      openPriceSortPanel: this.state.openPriceSortPanel,
      openReadyByDateSortPanel: this.state.openReadyByDateSortPanel,
      openOrderDateSortPanel: this.state.openOrderDateSortPanel,

      onOpenSearchByPanel: this.onOpenSearchByPanel,
      openSearchByPanel: this.state.openSearchByPanel,
      onClickSearchByBtn: this.onClickSearchByBtn,

      selectedPriceOptionIndex: this.state.selectedPriceOptionIndex,
      selectedReadyDateOptionIndex: this.state.selectedReadyDateOptionIndex,
      selectedOrderDateOptionIndex: this.state.selectedOrderDateOptionIndex,
      selectedSearchOptionIndex: this.state.selectedSearchOptionIndex,
      selectedOptionValue: this.state.selectedOptionValue
    };

    let navLinks;

    if (!TokenService.hasAuthToken()) {
      navLinks = [
        <Link to="/sign-in" key="1" className={styles['nav-link']} onClick={this.onOpenNav}>
          Sign-In
        </Link>,
        <Link to="/sign-up" key="2" className={styles['nav-link']} onClick={this.onOpenNav}>
          Sign-Up
        </Link>
      ];
    } else {
      navLinks = [
        <Link to="/home" key="0" className={styles['nav-link']} onClick={this.onOpenNav}>
          Home
        </Link>,
        <Link to="/new-order" key="3" className={styles['nav-link']} onClick={this.onOpenNav}>
          + New Order
        </Link>,
        <Link to="/customers" key="4" className={styles['nav-link']} onClick={this.onOpenNav}>
          Customers
        </Link>,
        <Link to="/sign-in" key="5" className={styles['nav-link']} onClick={this.signout}>
          Sign-Out
        </Link>
      ];
    }

    return (
      <BrowserRouter>
        <Context.Provider value={contextVal}>
          <div className={styles.App}>
            <Navbar />
            {this.state.openNav ? (
              <div className={styles['nav-links-wrapper']}>
                {navLinks.map(link => {
                  return link;
                })}
              </div>
            ) : null}

            {TokenService.hasAuthToken() ? <Redirect to="/home" /> : <Redirect to="/sign-in" />}

            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/sign-in" exact component={SignIn} />
            <Route path="/home" exact component={Home} />
            <Route path="/new-order" exact component={CreateOrder} />
            <Route path="/customers" exact component={Customers} />
            <Route path="/orders/:order_id" exact component={OrderDetails} />
          </div>
          <Footer />
        </Context.Provider>
      </BrowserRouter>
    );
  }
}
