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

export default class App extends React.Component {
  static contextType = Context;

  state = {
    openNav: false,
    customers: '',
    clerks: '',

    orders: [],
    filteredOrders: []
  };

  componentDidMount() {
    OrdersService.getOrders().then(orders => {
      if (orders) {
        CustomersService.getCustomers().then(customers => {
          if (customers) {
            ClerksService.getClerks().then(clerks => {
              if (clerks) {
                this.setState({
                  customers,
                  orders,
                  filteredOrders: orders,
                  clerks
                });
              }
            });
          }
        });
      }
    });
  }

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
    this.setState({ orders: ordersCopy });
  };

  editOrders = editedOrder => {
    const ordersCopy = [...this.state.orders];
    const index = ordersCopy.findIndex(order => order.id === editedOrder.id);
    ordersCopy[index] = editedOrder;
    this.setState({ orders: ordersCopy });
  };

  onOpenNav = () => {
    this.setState({ openNav: !this.state.openNav });
  };

  signout = () => {
    TokenService.clearAuthToken();
    this.onOpenNav();
  };

  onSearchOrders = (e, searchBy) => {
    const searchString = e.target.value;

    let ordersCopy = [...this.state.orders];
    let filteredOrders;

    // let customersCopy = [...this.state.customers];

    // MANIPULATE ordersCopy.customer = customer.full_name

    if (searchBy === 'all') {
      filteredOrders = ordersCopy.filter(order => {
        return (
          order['order_number'].toLowerCase().includes(searchString.toLowerCase()) ||
          order['clerk'].toLowerCase().includes(searchString.toLowerCase()) ||
          // order["customer"]
          //   .toLowerCase()
          //   .includes(searchString.toLowerCase()) ||
          order['phone_number'].toLowerCase().includes(searchString.toLowerCase()) ||
          order['price'].toLowerCase().includes(searchString.toLowerCase())
        );
      });
    } else {
      filteredOrders = ordersCopy.filter(order => {
        return order[searchBy].toLowerCase().includes(searchString.toLowerCase());
      });
    }

    this.setState({
      filteredOrders,
      searchString
    });
  };

  onSortOrders = sortBy => {
    const today = new Date().getTime();
    const ordersCopy = [...this.state.orders];
    let filteredOrders;

    if (sortBy === 'all') {
      filteredOrders = ordersCopy;
    }
    if (sortBy === 'past') {
      filteredOrders = ordersCopy.filter(order => new Date(order.order_date).getTime() < today);
    }
    if (sortBy === 'upcoming') {
      filteredOrders = ordersCopy.filter(order => new Date(order.order_date).getTime() > today);
    }

    // DescendingOrder
    filteredOrders = filteredOrders.sort(
      (a, b) =>
        +(b['order_date'] === null) - +(a['order_date'] === null) ||
        +(b['order_date'] > a['order_date']) ||
        -(b['order_date'] < a['order_date'])
    );

    // AscendingOrder
    // filteredOrders = filteredOrders.sort(
    //   (a, b) =>
    //     +(b["order_date"] === null) - +(a["order_date"] === null) ||
    //     +(a["order_date"] > b["order_date"]) ||
    //     -(a["order_date"] < b["order_date"])
    // );

    this.setState({
      filteredOrders
    });
  };

  render() {
    const contextVal = {
      openNav: this.state.openNav,
      onOpenNav: this.onOpenNav,
      customers: this.state.customers,
      orders: this.state.orders,
      clerks: this.state.clerks,
      updateCustomers: this.updateCustomers,
      updateClerks: this.updateClerks,
      updateOrders: this.updateOrders,
      editOrders: this.editOrders,
      filteredOrders: this.state.filteredOrders,
      onSearchOrders: this.onSearchOrders,
      onSortOrders: this.onSortOrders
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

            {TokenService.hasAuthToken() ? <Redirect to="/home" /> : <Redirect to="/landing" />}

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
