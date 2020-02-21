import React from 'react';
import styles from './Customer.module.css';
import Context from '../Context/Context';
import { Link } from 'react-router-dom';

export default class Customer extends React.Component {
  static contextType = Context;

  state = {
    customer: this.props.customer
  };

  componentDidMount() {}
  render() {
    return (
      <div className={styles['customer-wrapper']}>
        <div className={styles['th']} id="name">
          {this.state.customer.customer.full_name}
        </div>
        <div className={styles['th']} id="phone">
          {this.state.customer.customer.phone_number}
        </div>
        <div className={styles['orders']} id="orders">
          {this.state.customer.orders.map((order, i) => (
            <Link key={i} to={`/orders/${order.order_number}`}>
              {order.order_number}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
