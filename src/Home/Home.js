import React from 'react';
import Context from '../Context/Context';
import OrderItem from '../OrderItem/OrderItem';
import Search from '../Search/Search';
import styles from './Home.module.css';

export default class Home extends React.Component {
  static contextType = Context;

  render() {
    return (
      <React.Fragment>
        {!this.context.openNav ? (
          <div className={styles['home-wrapper']} ref={this.listRef}>
            <Search />

            <div className={styles['orders-list-wrapper']}>
              {this.context.filteredOrders
                ? this.context.filteredOrders.map(order => {
                    return (
                      <OrderItem
                        orderItem={order}
                        key={order.id}
                        boxChecked={this.props.boxChecked}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
