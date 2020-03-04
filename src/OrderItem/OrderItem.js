import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import OrdersService from '../Services/OrdersService';
import styles from './OrderItem.module.css';

export default class OrderItem extends React.Component {
  static contextType = Context;

  state = {
    order: this.props.orderItem,
    formattedOrderDateTime: '',
    formattedReadyDateTime: '',
    formattedPhoneNumber: '',
    notificationSent: this.props.orderItem.notification_sent ? true : false,
    notification_date_time: '',
    formatted_picked_up_date: ''
  };

  componentDidMount() {
    const order = this.props.orderItem;

    let phone = order.phone_number;
    let formattedPhoneNumber = `(${phone[0]}${phone[1]}${phone[2]}) ${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}${phone[8]}${phone[9]}`;

    let formattedOrderDateTime = moment(order.order_date)
      .local(true)
      .format('M/D/YY h:mm A');

    let formattedReadyDateTime = moment(order.ready_by_date)
      .local(true)
      .format('M/D/YY h:mm A');

    let notification_date_time, notificationSent;

    if (order.notification_sent) {
      notification_date_time = moment(order.notification_sent)
        .local(true)
        .format('M/D/YY h:mm A');

      notificationSent = true;
    }

    let formatted_picked_up_date;

    if (order.picked_up) {
      formatted_picked_up_date = moment(order.picked_up_date)
        .local(true)
        .format('M/D/YY h:mm A');
    }

    this.setState({
      order,
      formattedOrderDateTime,
      formattedReadyDateTime,
      formattedPhoneNumber,
      notification_date_time,
      notificationSent,
      formatted_picked_up_date
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.orderItem.notification_sent !== prevProps.orderItem.notification_sent) {
      let notification_date_time = moment(this.props.orderItem.notification_sent)
        .local(true)
        .format('M/D/YY h:mm A');
      this.setState({
        order: this.props.orderItem,
        notification_date_time,
        notificationSent: true
      });
    }

    if (
      this.props.orderItem.picked_up !== prevProps.orderItem.picked_up &&
      this.props.orderItem.picked_up_date !== prevProps.orderItem.picked_up_date
    ) {
      let formatted_picked_up_date = moment(this.props.orderItem.picked_up_date)
        .local(true)
        .format('M/D/YY h:mm A');

      this.setState({ order: this.props.orderItem, formatted_picked_up_date });
    }
  }

  onPickedUp = () => {
    let orderCopy = { ...this.state.order };

    orderCopy.picked_up = !orderCopy.picked_up;
    orderCopy.picked_up_date = orderCopy.picked_up ? new Date() : null;

    OrdersService.putUpdateOrder(orderCopy, orderCopy.id).then(newOrder => {
      let formatted_picked_up_date = moment(orderCopy.picked_up_date)
        .local(true)
        .format('M/D/YY h:mm A');

      this.setState({ order: newOrder, formatted_picked_up_date });
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
            <h4>{this.state.order.customer}</h4>
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

            {this.state.order.picked_up ? (
              <span className={styles['order-picked-up-date']}>
                ({this.state.formatted_picked_up_date})
              </span>
            ) : null}
          </div>

          <div className={styles['order-row']}>
            <div className={styles['checkbox-wrapper']}>
              <input
                type="checkbox"
                readOnly
                className={styles['checkbox']}
                checked={this.state.notificationSent ? true : null}
                disabled={!this.state.notificationSent}
              />
            </div>
            <span className={styles['order-label']}>Notification </span>
            {this.state.order.notification_sent ? (
              <span className={styles['notification-sent-date']}>
                ({this.state.notification_date_time})
              </span>
            ) : null}
            <span className={styles['order-label']} />
          </div>
        </div>
      </div>
    );
  }
}
