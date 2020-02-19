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

export default class App extends React.Component {
  static contextType = Context;

  state = {
    openNav: false,
    customers: ''
  };

  componentDidMount() {
    CustomersService.getCustomers().then(customers => {
      this.setState({ customers });
    });
  }

  onOpenNav = () => {
    this.setState({ openNav: !this.state.openNav });
  };

  signout = () => {
    TokenService.clearAuthToken();
    this.onOpenNav();
  };

  render() {
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
        <Link to="/sign-in" key="5" className={styles['nav-link']} onClick={this.signout}>
          Sign-Out
        </Link>
      ];
    }

    const contextVal = {
      openNav: this.state.openNav,
      onOpenNav: this.onOpenNav,
      customers: this.state.customers
    };

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
            {/* <Route path="/sign-in" exact component={SignIn} />
              <Route path="/demo" exact component={SignIn} /> */}
            <Route path="/" exact component={SignUp} />
            <Route path="/home" exact component={Home} />
            <Route path="/new-order" exact component={CreateOrder} />
            <Route path="/orders/:order_id" exact component={OrderDetails} />
          </div>
          <Footer />
        </Context.Provider>
      </BrowserRouter>
    );
  }
}
