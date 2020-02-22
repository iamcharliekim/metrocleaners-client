import React from 'react';
import styles from './OrderItem.module.css';
import Context from '../Context/Context';
import { Link } from 'react-router-dom';
import moment from 'moment';
import OrdersService from '../Services/OrdersService';

export default class OrderItem extends React.Component {
  static contextType = Context;

  state = {
    order: this.props.orderItem,
    customer: '',
    clerk: '',
    formattedOrderDateTime: '',
    formattedReadyDateTime: '',
    formattedPhoneNumber: '',
    notificationSent: this.props.orderItem.notification_sent ? true : false,
    notification_date_time: ''
  };

  componentDidMount() {
    const order = this.props.orderItem;

    const customer = this.context.customers.find(
      customer => customer.id === this.state.order.customer
    );

    let phone = order.phone_number;
    let formattedPhoneNumber = `(${phone[0]}${phone[1]}${phone[2]}) ${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}${phone[8]}${phone[9]}`;

    let formattedOrderDateTime = moment(order.order_date)
      .local(true)
      .format('M/D/YY h:mm A');

    let formattedReadyDateTime = moment(order.ready_by_date)
      .local(true)
      .format('M/D/YY h:mm A');

    let notification_date_time;

    if (order.notification_sent) {
      notification_date_time = moment(order.notification_sent)
        .local(true)
        .format('M/D/YY h:mm A');
    }

    this.setState({
      customer,
      formattedOrderDateTime,
      formattedReadyDateTime,
      formattedPhoneNumber,
      notification_date_time
    });
  }

  onPickedUp = () => {
    const orderCopy = { ...this.state.order };
    orderCopy.picked_up = !orderCopy.picked_up;

    this.setState({ order: orderCopy });

    this.updateOrder();
  };

  updateOrder = () => {
    const picked_up_prev = this.state.order.picked_up;

    const updatedOrder = {
      ...this.state.order,
      customer: this.state.customer.id,
      clerk: this.state.clerk.id,
      picked_up: !picked_up_prev
    };

    OrdersService.putUpdateOrder(updatedOrder, this.state.order.id).then(newOrder => {
      this.context.editOrders(newOrder);
    });
  };

  render() {
    return (
      <div className={styles['orders-card']}>
        <header className={styles['orders-card-header']}>
          <div className={styles['order-customer-details']}>
            <Link to={`orders/${this.state.order.order_number}`} className={styles['order-link']}>
              {`#${this.state.order.order_number}`}
            </Link>
            <h4>{this.state.customer.full_name}</h4>
            <span className={styles['phone_number']}>{this.state.formattedPhoneNumber}</span>
          </div>

          <div className={styles['order-details']}>
            <span className={styles['order_date']}>
              <strong>Ordered: </strong>
              {this.state.formattedOrderDateTime}
            </span>
            <span className={styles['clerk']}>
              <strong>Clerk:</strong> {this.state.order.clerk}
            </span>
          </div>
        </header>

        <div className={styles['order-ready-wrapper']}>
          <div className={styles['order-price']}>
            {`$${this.state.order.price}`}
            <span className={styles['quantity']}>{`(${this.state.order.quantity} pieces)`}</span>
          </div>

          <div className={styles['order-row']}>
            <div className={styles['ready-by-date-wrapper']}>
              <span className={styles['order-label']}>
                <strong>Ready By:</strong>
              </span>
              <span className={styles['order-info']}>{this.state.formattedReadyDateTime}</span>
            </div>
          </div>

          <div className={styles['order-row']}>
            <div className={styles['checkbox-wrapper']}>
              <input
                type="checkbox"
                className={styles['checkbox']}
                onChange={this.onPickedUp}
                checked={this.state.order.picked_up}
              />
            </div>
            <span className={styles['order-label']}>Picked Up</span>
          </div>

          <div className={styles['order-row']}>
            <div className={styles['checkbox-wrapper']}>
              <input
                type="checkbox"
                className={styles['checkbox']}
                checked={this.state.notificationSent}
              />
            </div>
            <span className={styles['order-label']}>Notification Sent</span>
            {this.state.notificationSent ? (
              <span className={styles['notification-sent-date']}>
                ({this.state.notification_date_time})
              </span>
            ) : null}
            <span className={styles['order-label']}></span>
          </div>
        </div>
      </div>
    );
  }
}
