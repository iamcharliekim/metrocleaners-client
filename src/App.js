import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';
import styles from './App.module.css';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import Navbar from './Navbar/Navbar';
import TokenService from './Services/TokenService';
import Context from './Context/Context';
import CreateOrder from './CreateOrder/CreateOrder';
import Footer from './Footer/Footer';
import OrderDetails from './OrderDetails/OrderDetails';
import CustomersService from './Services/CustomersService';
import OrdersService from './Services/OrdersService';
import ClerksService from './Services/ClerksService';
import Customers from './Customers/Customers';

export default class App extends React.Component {
  static contextType = Context;

  state = {
    openNav: false,
    customers: '',
    clerks: '',
    orders: ''
  };

  componentDidMount() {
    OrdersService.getOrders().then(orders => {
      if (orders) {
        CustomersService.getCustomers().then(customers => {
          if (customers) {
            ClerksService.getClerks().then(clerks => {
              if (clerks) {
                this.setState({ customers, orders, clerks });
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
      editOrders: this.editOrders
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
