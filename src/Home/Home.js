import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';

export default class Home extends React.Component {
  render() {
    return (
      <div className={styles['home-wrapper']}>
        <Search />

        <header className={styles['home-wrapper-header']}>
          <h3>February 22, 2020</h3>
        </header>

        <div className={styles['orders-list-wrapper']}>
          <div className={styles['orders-card']}>
            <header className={styles['orders-card-header']}>
              <div className={styles['order-customer-details']}>
                <h4>David Kim</h4>
                <Link to="orders/94823" className={styles['order-link']}>
                  #94823
                </Link>
              </div>
              <span className={styles['order-not-picked-up-btn']}>.</span>
            </header>

            <div className={styles['order-price']}>$ 20.84</div>

            <div className={styles['order-row']}>
              <div className={styles['checkbox-wrapper']}>
                <input type="checkbox" className={styles['checkbox']} />
              </div>
              <span className={styles['order-label']}>Picked Up</span>
            </div>
          </div>

          <div className={styles['orders-card']}>
            <header className={styles['orders-card-header']}>
              <div className={styles['order-customer-details']}>
                <h4>Young Choi</h4>
                <Link to="orders/94824" className={styles['order-link']}>
                  #94826
                </Link>
              </div>
              <span className={styles['order-picked-up-btn']}>.</span>
            </header>

            <div className={styles['order-price']}>$ 80.12</div>

            <div className={styles['order-row']}>
              <div className={styles['checkbox-wrapper']}>
                <input type="checkbox" className={styles['checkbox']} checked />
              </div>
              <span className={styles['order-label']}>Picked Up</span>
            </div>
          </div>

          <div className={styles['orders-card']}>
            <header className={styles['orders-card-header']}>
              <div className={styles['order-customer-details']}>
                <h4>John Smith</h4>
                <Link to="orders/94824" className={styles['order-link']}>
                  #94828
                </Link>
              </div>
              <span className={styles['order-picked-up-btn']}>.</span>
            </header>

            <div className={styles['order-price']}>$ 10.00</div>

            <div className={styles['order-row']}>
              <div className={styles['checkbox-wrapper']}>
                <input type="checkbox" className={styles['checkbox']} checked />
              </div>
              <span className={styles['order-label']}>Picked Up</span>
            </div>
          </div>

          <div className={styles['orders-card']}>
            <header className={styles['orders-card-header']}>
              <div className={styles['order-customer-details']}>
                <h4>TJ Stalcup</h4>
                <Link to="orders/94824" className={styles['order-link']}>
                  #94840
                </Link>
              </div>
              <span className={styles['order-picked-up-btn']}>.</span>
            </header>

            <div className={styles['order-price']}>$ 50.00</div>

            <div className={styles['order-row']}>
              <div className={styles['checkbox-wrapper']}>
                <input type="checkbox" className={styles['checkbox']} checked />
              </div>
              <span className={styles['order-label']}>Picked Up</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
