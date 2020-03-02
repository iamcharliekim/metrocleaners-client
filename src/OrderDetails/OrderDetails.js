import React from 'react';
import styles from './OrderDetails.module.css';
import Context from '../Context/Context';
import moment from 'moment';
import Messanger from '../Messanger/Messanger';

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

    const customer = this.context.customers.find(customer => customer.full_name === order.customer);

    let phone = order.phone_number;
    let formattedPhoneNumber = `(${phone[0]}${phone[1]}${phone[2]}) ${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}${phone[8]}${phone[9]}`;

    let formattedOrderDateTime = moment(order.order_date)
      .local(true)
      .format('M/D/YY h:mm A');
    let formattedReadyDateTime = moment(order.ready_by_date)
      .local(true)
      .format('M/D/YY h:mm A');

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
        {!this.context.openNav ? (
          <div className={styles['order-details-inner-wrapper']}>
            <div className={styles['customer-details-wrapper']}>
              <h1>
                {this.state.order.customer} (#{this.state.order.order_number})
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
                <span
                  className={styles['quantity']}
                >{`(${this.state.order.quantity} pieces)`}</span>
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
                  readOnly
                  className={styles['checkbox']}
                  checked={!!this.state.order.picked_up}
                />
                <span className={styles['order-label']}>Picked Up</span>
                {this.state.order.picked_up ? (
                  <span className={styles['order-picked-up-date']}>
                    (
                    {moment(this.state.picked_up_date)
                      .local(true)
                      .format('M/D/YY h:mm A')}
                    )
                  </span>
                ) : null}
              </div>

              <div className={styles['order-row']}>
                <input
                  type="checkbox"
                  readOnly
                  className={styles['checkbox']}
                  checked={!!this.state.order.notification_sent}
                />
                <span className={styles['order-label']}>Notification Sent</span>
                <span className={styles['notification-sent-date']}>
                  {this.state.order.notification_sent
                    ? `(${moment(this.state.order.notification_sent)
                        .local(true)
                        .format('M/D/YY h:mm A')})`
                    : null}
                </span>
              </div>
            </div>

            <Messanger state={this.state} />
          </div>
        ) : null}
      </div>
    );
  }
}
