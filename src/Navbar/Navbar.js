import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import TokenService from '../Services/TokenService';
import styles from './Navbar.module.css';
import Context from '../Context/Context';

class Navbar extends React.Component {
  static contextType = Context;

  onSignOut = e => {
    TokenService.clearAuthToken();
  };

  onClickLogo = () => {
    if (this.context.openNav) {
      this.context.onOpenNav();
    }
  };

  render() {
    let navLinks, signOutLink;

    if (!TokenService.hasAuthToken()) {
      navLinks = [
        <Link to="/sign-in" key="1" className={styles['nav-link']}>
          Sign-In
        </Link>,
        <Link to="/sign-up" key="2" className={styles['nav-link']}>
          Sign-Up
        </Link>
      ];
    } else {
      navLinks = [
        <Link to="/home" key="0" className={styles['nav-link']}>
          Home
        </Link>,
        <Link to="/new-order" key="3" className={styles['nav-link']}>
          + New Order
        </Link>,
        <Link to="/customers" key="4" className={styles['nav-link']}>
          Customers
        </Link>
      ];

      signOutLink = (
        <Link to="/sign-in" key="5" onClick={this.onSignOut} className={styles['nav-link']}>
          Sign-Out
        </Link>
      );
    }

    return (
      <nav className={styles['navbar']}>
        <div className={styles['inner-nav']}>
          <Link to="/home" className={styles['logo']} onClick={this.onClickLogo}>
            <div className={styles['logo-wrapper']}>
              <span>Metro</span>
              <span>Cleaners</span>
            </div>
          </Link>

          <div
            className={
              TokenService.hasAuthToken()
                ? styles['nav-links-wrapper']
                : styles['no-auth-nav-links-wrapper']
            }
          >
            {navLinks.map(link => link)}
          </div>

          <div
            className={
              TokenService.hasAuthToken() ? styles['sign-out-link'] : styles['display-none']
            }
          >
            {signOutLink}
          </div>

          <div className={styles['hamburger']} onClick={this.context.onOpenNav}>
            <div />
            <div />
            <div />
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
