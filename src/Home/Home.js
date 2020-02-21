import React from 'react';
import styles from './Home.module.css';
import Search from '../Search/Search';
import OrderItem from '../OrderItem/OrderItem';
import Context from '../Context/Context';

export default class Home extends React.Component {
  static contextType = Context;

  render() {
    return (
      <div className={styles['home-wrapper']}>
        <Search />

        <header className={styles['home-wrapper-header']}>
          <h3>February 22, 2020</h3>
        </header>

        <div className={styles['orders-list-wrapper']}>
          {this.context.orders
            ? this.context.orders.map(order => {
                return <OrderItem orderItem={order} key={order.id} />;
              })
            : null}
        </div>
      </div>
    );
  }
}
