import React from 'react';
import styles from './CreateOrder.module.css';
import OrdersService from '../Services/OrdersService';
import CustomersService from '../Services/CustomersService';
import Context from '../Context/Context';

export default class CreateOrder extends React.Component {
  static contextType = Context;

  state = {
    order_number: '',
    clerk: '',
    customer_name: '',
    phone_number: '',
    order_date: '',
    order_time: '',
    ready_by_date: '',
    ready_by_time: '',
    quantity: '',
    price: ''
  };

  componentDidMount() {}

  orderNumberHandler = e => {
    this.setState({ order_number: e.target.value });
  };

  clerkHandler = e => {
    this.setState({ clerk: e.target.value });
  };

  customerNameHandler = e => {
    this.setState({ customer_name: e.target.value });
  };

  phoneNumberHandler = e => {
    this.setState({ phone_number: e.target.value });
  };

  orderDateHandler = e => {
    this.setState({ order_date: e.target.value });
  };

  orderTimeHandler = e => {
    this.setState({ order_time: e.target.value });
  };

  readyByDateHandler = e => {
    this.setState({ ready_by_date: e.target.value });
  };

  readyByTimeHandler = e => {
    this.setState({ ready_by_time: e.target.value });
  };

  quantityHandler = e => {
    this.setState({ quantity: e.target.value });
  };

  priceHandler = e => {
    this.setState({ price: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    let order_date = new Date(`${this.state.order_date}T${this.state.order_time}`).toISOString();
    let ready_by_date = new Date(
      `${this.state.ready_by_date}T${this.state.ready_by_time}`
    ).toISOString();

    const newOrder = {
      order_number: this.state.order_number,
      clerk: this.state.clerk,
      customer: this.state.customer_name,
      phone_number: this.state.phone_number,
      order_date,
      ready_by_date,
      price: this.state.price,
      quantity: this.state.quantity
    };

    // CHECK TO SEE IF CUSTOMER EXISTS IN DATABASE BY PHONE-NUMBER
    const customers = this.context.customers.filter(
      customer => customer.phone_number === newOrder.phone_number
    );

    // IF CUSTOMER DOES NOT EXIST, postNewCustomer() => postNewOrder()
    if (customers.length === 0) {
      const newCustomer = {
        full_name: this.state.customer_name,
        phone_number: this.state.phone_number
      };
      CustomersService.postNewCustomer(newCustomer).then(res => {
        OrdersService.postNewOrder(newOrder).then(orders => {
          this.resetState();
          this.props.history.push('/home');
        });
      });
    } else {
      // IF CUSTOMER EXISTS: THEN postNewOrder()
      OrdersService.postNewOrder(newOrder).then(orders => {
        this.resetState();
        this.props.history.push('/home');
      });
    }
  };

  resetState = () => {
    this.setState({
      order_number: '',
      clerk: '',
      customer_name: '',
      phone_number: '',
      order_date: '',
      order_time: '',
      ready_by_date: '',
      ready_by_time: '',
      quantity: '',
      price: ''
    });
  };

  render() {
    return (
      <React.Fragment>
        {!this.context.openNav ? (
          <div className={styles['create-game-wrapper']}>
            <form onSubmit={this.onSubmitHandler}>
              <h1>+ New Order</h1>
              <div className={styles['form-row']}>
                <label htmlFor="order_num">Order #:</label>
                <input
                  type="text"
                  id="order_num"
                  required
                  onChange={this.orderNumberHandler}
                  value={this.state.order_number}
                />
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="clerk">Clerk:</label>
                <input
                  type="text"
                  id="clerk"
                  required
                  onChange={this.clerkHandler}
                  value={this.state.clerk}
                />
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="customer_name">Customer Name:</label>
                <input
                  type="text"
                  id="customer_name"
                  required
                  onChange={this.customerNameHandler}
                  value={this.state.customer_name}
                />
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="phone_number"> Phone #:</label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone"
                  pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                  required
                  onChange={this.phoneNumberHandler}
                  value={this.state.phone_number}
                />
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="order-date">Order Date/Time:</label>
                <div className={styles['date-time-inputs-wrapper']}>
                  <input
                    type="date"
                    id="order-date"
                    required
                    className={styles['date-input']}
                    onChange={this.orderDateHandler}
                    value={this.state.order_date}
                  />
                  <input
                    type="time"
                    id="order-time"
                    required
                    className={styles['time-input']}
                    onChange={this.orderTimeHandler}
                    value={this.state.order_time}
                  />
                </div>
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="ready-date">Ready By Date/Time:</label>
                <div className={styles['date-time-inputs-wrapper']}>
                  <input
                    type="date"
                    id="ready-date"
                    required
                    className={styles['date-input']}
                    onChange={this.readyByDateHandler}
                    value={this.state.ready_by_date}
                  />
                  <input
                    type="time"
                    id="ready-time"
                    required
                    className={styles['time-input']}
                    onChange={this.readyByTimeHandler}
                    value={this.state.ready_by_time}
                  />
                </div>
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="quantity">Quantity (pieces of clothing)</label>
                <input
                  type="number"
                  id="quantity"
                  required
                  className={styles['date-input']}
                  onChange={this.quantityHandler}
                  value={this.state.quantity}
                />
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="price">Price ($)</label>
                <input
                  type="text"
                  id="price"
                  required
                  className={styles['date-input']}
                  onChange={this.priceHandler}
                  value={this.state.price}
                />
              </div>

              <div className={styles['btns-panel']}>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
