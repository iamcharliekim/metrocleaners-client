import React from 'react';
import styles from './OrderDetails.module.css';

export default class OrderDetails extends React.Component {
  render() {
    return (
      <div className={styles['order-details-wrapper']}>
        <div className={styles['order-details-inner-wrapper']}>
          <div className={styles['customer-details-wrapper']}>
            <h1>David Kim</h1>
            <span>#94823</span>
          </div>

          <div className={styles['order-dates-wrapper']}>
            <div className={styles['order-created-wrapper']}>
              <span className={styles['order-label']}>Created:</span>
              <span className={styles['order-info']}>2-04-2020</span>
            </div>

            <div className={styles['order-ready-wrapper']}>
              <span className={styles['order-label']}>Ready:</span>
              <span className={styles['order-info']}>2-12-2020</span>
            </div>
          </div>

          <div className={styles['order-invoice-wrapper']}>
            <h2>Order Invoice</h2>
          </div>
        </div>
      </div>
    );
  }
}
