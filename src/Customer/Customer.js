import React from 'react';
import { withRouter } from 'react-router-dom';
import Context from '../Context/Context';
import styles from './Customer.module.css';

class Customer extends React.Component {
  static contextType = Context;

  state = {
    customer: this.props.customer.customer,
    order_id: this.props.customer.orders[0].order_number,
    orders: this.props.customer.orders
  };

  componentDidMount() {}

  onSelectOrders = e => {
    this.setState({ order_id: e.target.value });
  };

  onOpenOrdersPage = () => {
    this.props.history.push(`/orders/${this.state.order_id}`);
  };

  render() {
    return (
      <div className={styles['customer-wrapper']}>
        <div className={styles['th']} id="name">
          {this.state.customer.full_name}
        </div>
        <div className={styles['th']} id="phone">
          {this.state.customer.phone_number}
        </div>
        <div className={styles['orders']} id="orders">
          <select onChange={this.onSelectOrders}>
            {this.state.orders.map((order, i) => (
              <option key={i} value={order.order_number}>
                {order.order_number}
              </option>
            ))}
          </select>
          <button onClick={this.onOpenOrdersPage} className={styles['select-btn']}>
            >
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Customer);
