import React from 'react';
import Context from '../Context/Context';
import OrderItem from '../OrderItem/OrderItem';
import Search from '../Search/Search';
import styles from './Home.module.css';

export default class Home extends React.Component {
  static contextType = Context;
  render() {
    return (
      <div className={styles['home-wrapper']}>
        <Search />

        <header className={styles['home-wrapper-header']}>
          <h3> </h3>
        </header>

        <div className={styles['orders-list-wrapper']}>
          {this.context.filteredOrders
            ? this.context.filteredOrders.map(order => {
                return <OrderItem orderItem={order} key={order.id} />;
              })
            : null}
        </div>
      </div>
    );
  }
}
