import React from 'react';
import styles from './OrderDetails.module.css';
import Context from '../Context/Context';
import moment from 'moment';

export default class OrderDetails extends React.Component {
  static contextType = Context;

  state = {
    order: {},
    customer: {},
    formattedPhoneNumber: '',
    formattedOrderDateTime: '',
    formattedReadyDateTime: ''
  };

  componentDidMount() {
    const order = this.context.orders.find(
      order => order.order_number === this.props.match.params.order_id
    );

    const customer = this.context.customers.find(customer => customer.id === order.customer);

    let phone = order.phone_number;
    let formattedPhoneNumber = `(${phone[0]}${phone[1]}${phone[2]}) ${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}${phone[8]}${phone[9]}`;

    let formattedOrderDate = moment(order.order_date.split('T')[0]).format('M/D/YY');
    let formattedOrderTime = moment(order.order_date.split('T')[1], 'HH:mm:ss').format('h:mm A');

    let formattedReadyByDate = moment(order.ready_by_date.split('T')[0]).format('MMMM Do ');
    let formattedReadyByTime = moment(order.ready_by_date.split('T')[1], 'HH:mm:ss').format(
      'h:mm A'
    );

    let formattedOrderDateTime = `${formattedOrderDate} ${formattedOrderTime}`;
    let formattedReadyDateTime = `${formattedReadyByDate}@ ${formattedReadyByTime}`;

    this.setState({
      order,
      customer,
      formattedPhoneNumber,
      formattedOrderDateTime,
      formattedReadyDateTime
    });
  }

  render() {
    return (
      <div className={styles['order-details-wrapper']}>
        <div className={styles['order-details-inner-wrapper']}>
          <div className={styles['customer-details-wrapper']}>
            <h1>
              {this.state.customer.full_name} (#{this.state.order.order_number})
            </h1>
            <span>{this.state.formattedPhoneNumber}</span>
          </div>

          <div className={styles['order-info-wrapper']}>
            <span>
              <strong>Ordered:</strong> {this.state.formattedOrderDateTime}
            </span>
            <span>
              <strong>Clerk:</strong> {this.state.order.clerk}
            </span>
          </div>

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
                <span className={styles['order-ready-date']}>
                  {this.state.formattedReadyDateTime}
                </span>
              </div>
            </div>

            <div className={styles['order-row']}>
              <input
                type="checkbox"
                className={styles['checkbox']}
                onChange={this.onPickedUp}
                checked={this.state.order.picked_up}
              />
              <span className={styles['order-label']}>Picked Up</span>
            </div>

            <div className={styles['order-row']}>
              <input type="checkbox" className={styles['checkbox']} />
              <span className={styles['order-label']}>Notification Sent</span>
              <span className={styles['order-label']}></span>
            </div>
          </div>

          <div className={styles['send-sms-wrapper']}>
            <h3>Send {this.state.customer.full_name} a text-message:</h3>
            <div className={styles['textarea-wrapper']}>
              <textarea />
            </div>
            <div className={styles['button-wrapper']}>
              <button>Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
