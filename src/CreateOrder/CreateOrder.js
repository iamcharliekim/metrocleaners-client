import moment from 'moment';
import React from 'react';
import Autocomplete from 'react-autocomplete';
import Context from '../Context/Context';
import CustomersService from '../Services/CustomersService';
import OrdersService from '../Services/OrdersService';
import styles from './CreateOrder.module.css';

export default class CreateOrder extends React.Component {
  static contextType = Context;

  state = {
    order_number: '',
    clerk: '',
    customer_name: '',
    phone_number: '',
    order_date: moment().format('YYYY-MM-DD'),
    order_time: '',
    ready_by_date: '',
    ready_by_time: '',
    quantity: '',
    price: ''
  };

  componentDidMount() {
    let time = new Date()
      .toString()
      .split(' ')[4]
      .split(':');
    time = `${time[0]}:${time[1]}`;
    this.setState({ order_time: time });

    this.orderInput.focus();
  }

  orderNumberHandler = e => {
    this.setState({ order_number: e.target.value });
  };

  clerkHandler = e => {
    this.setState({ clerk: e.target.value });
  };

  onSelectClerk = clerk => {
    this.setState({ clerk });
  };

  customerNameHandler = e => {
    this.setState({ customer_name: e.target.value });
  };

  onSelectCustomerName = customer_name => {
    let selectedCustomer = this.context.customers.find(
      customer => customer.full_name === customer_name
    );
    let phone_number = selectedCustomer.phone_number;

    this.setState({ customer_name, phone_number });

    this.readyByInput.focus();
  };

  phoneNumberHandler = e => {
    this.setState({ phone_number: e.target.value });
  };

  onSelectPhoneNumber = phone_number => {
    let selectedCustomer = this.context.customers.find(
      customer => customer.phone_number === phone_number
    );
    let customer_name = selectedCustomer.full_name;

    this.setState({ phone_number, customer_name });
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

    // let order_date = moment(`${this.state.order_date} ${this.state.order_time}`)
    //   .utc(true)
    //   .format();
    let order_date = new Date(`${this.state.order_date} ${this.state.order_time}`);

    // let ready_by_date = moment(`${this.state.ready_by_date} ${this.state.ready_by_time}`)
    //   .utc(true)
    //   .format();

    let ready_by_date = new Date(`${this.state.ready_by_date} ${this.state.ready_by_time}`);

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
      CustomersService.postNewCustomer(newCustomer).then(customer => {
        OrdersService.postNewOrder(newOrder).then(order => {
          this.context.updateCustomers(customer);
          this.context.updateOrders(order);
          this.resetState();
          this.props.history.push('/home');
        });
      });
    } else {
      // IF CUSTOMER EXISTS: THEN postNewOrder()
      OrdersService.postNewOrder(newOrder).then(order => {
        this.context.updateOrders(order);
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
                  ref={input => {
                    this.orderInput = input;
                  }}
                />
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="clerk">Clerk:</label>
                <Autocomplete
                  inputProps={{ id: 'clerk', required: true }}
                  wrapperStyle={{ width: '100%' }}
                  getItemValue={item => item.full_name}
                  items={this.context.clerks}
                  renderItem={(item, isHighlighted) => (
                    <div
                      key={item.id}
                      style={{
                        background: isHighlighted ? 'lightgray' : 'white',
                        color: 'black'
                      }}
                    >
                      {item.full_name}
                    </div>
                  )}
                  value={this.state.clerk}
                  onChange={this.clerkHandler}
                  onSelect={this.onSelectClerk}
                  shouldItemRender={(item, value) => {
                    return item ? item.full_name.toLowerCase().includes(value.toLowerCase()) : null;
                  }}
                  selectOnBlur={true}
                />
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="customer_name">Customer Name:</label>
                <Autocomplete
                  inputProps={{ id: 'customer_name', required: true }}
                  wrapperStyle={{ width: '100%' }}
                  getItemValue={item => item.full_name}
                  autoHighlight={true}
                  items={this.context.customers}
                  renderItem={(item, isHighlighted) => (
                    <div
                      key={item.id}
                      style={{
                        background: isHighlighted ? 'lightgray' : 'white',
                        color: 'black'
                      }}
                    >
                      {item.full_name}
                    </div>
                  )}
                  value={this.state.customer_name}
                  onChange={this.customerNameHandler}
                  onSelect={this.onSelectCustomerName}
                  shouldItemRender={(item, value) => {
                    return item ? item.full_name.toLowerCase().includes(value.toLowerCase()) : null;
                  }}
                  selectOnBlur={true}
                />
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="phone_number"> Phone #:</label>
                <Autocomplete
                  inputProps={{
                    id: 'phone_number',
                    pattern: '[0-9]{3}[0-9]{3}[0-9]{4}',
                    type: 'tel',
                    required: true
                  }}
                  wrapperStyle={{ width: '100%' }}
                  getItemValue={item => item.phone_number}
                  autoHighlight={true}
                  items={this.context.customers}
                  renderItem={(item, isHighlighted) => (
                    <div
                      key={item.id}
                      style={{
                        background: isHighlighted ? 'lightgray' : 'white',
                        color: 'black'
                      }}
                    >
                      {item.phone_number}
                    </div>
                  )}
                  value={this.state.phone_number}
                  onChange={this.phoneNumberHandler}
                  onSelect={this.onSelectPhoneNumber}
                  shouldItemRender={(item, value) => {
                    return item ? item.phone_number.includes(value) : null;
                  }}
                  selectOnBlur={true}
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
                    min="07:00"
                    max="19:00"
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
                    ref={input => {
                      this.readyByInput = input;
                    }}
                  />
                  <input
                    type="time"
                    id="ready-time"
                    required
                    className={styles['time-input']}
                    onChange={this.readyByTimeHandler}
                    value={this.state.ready_by_time}

                    // min="07:00"
                    // max="19:00"
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
