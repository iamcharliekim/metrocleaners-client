import React from 'react';
import Autocomplete from 'react-autocomplete';
import Context from '../Context/Context';
import CustomersService from '../Services/CustomersService';
import OrdersService from '../Services/OrdersService';
import styles from './CreateOrder.module.css';
import moment from 'moment';

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

    if (this.props.location.pathname.includes('edit-order')) {
      const orderId = +this.props.match.params.id;
      const orderToEdit = this.context.orders.find(order => order.id === orderId);

      this.setState({
        order_number: orderToEdit.order_number,
        clerk: orderToEdit.clerk,
        customer_name: orderToEdit.customer,
        phone_number: orderToEdit.phone_number,
        order_date: moment(orderToEdit.order_date).format('YYYY-MM-DD'),
        order_time: moment(orderToEdit.order_date).format('HH:mm'),
        ready_by_date: moment(orderToEdit.ready_by_date).format('YYYY-MM-DD'),
        ready_by_time: moment(orderToEdit.ready_by_date).format('HH:mm'),
        quantity: orderToEdit.quantity,
        price: orderToEdit.price
      });
    }
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

    let order_date = new Date(`${this.state.order_date} ${this.state.order_time}`);
    let ready_by_date = new Date(`${this.state.ready_by_date} ${this.state.ready_by_time}`);

    const newOrder = {
      order_number: this.state.order_number,
      clerk: this.state.clerk,
      customer: this.state.customer_name,
      phone_number: this.state.phone_number,
      order_date,
      ready_by_date,
      price: this.state.price.toString(),
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
        // IF NEW-ORDER, POST
        if (!this.props.location.pathname.includes('edit-order')) {
          OrdersService.postNewOrder(newOrder)
            .then(order => {
              this.context.updateCustomers(customer);
              this.context.updateOrders(order);
              this.resetState();
              this.props.history.push('/home');
            })
            .catch(res => {
              this.setState({ error: res.error });
            });
        } else {
          // IF EDITING-ORDER, PUT
          OrdersService.putUpdateOrder(newOrder, +this.props.match.params.id)
            .then(order => {
              this.context.updateCustomers(customer);
              this.context.editOrders(order);
              this.resetState();
              this.props.history.push('/home');
            })
            .catch(res => {
              this.setState({ error: res.error });
            });
        }
      });
    } else {
      // IF CUSTOMER EXISTS:
      if (!this.props.location.pathname.includes('edit-order')) {
        // IF NEW ORDER, POST
        OrdersService.postNewOrder(newOrder)
          .then(order => {
            this.context.updateOrders(order);
            this.resetState();
            this.props.history.push('/home');
          })
          .catch(res => {
            this.setState({ error: res.error });
          });
      } else {
        // IF EDITING ORDER, PUT
        OrdersService.putUpdateOrder(newOrder, +this.props.match.params.id)
          .then(order => {
            this.context.editOrders(order);
            this.resetState();
            this.props.history.push('/home');
          })
          .catch(res => {
            this.setState({ error: res.error });
          });
      }
    }
  };

  orderNumOnBlur = e => {
    const typedOrderNumber = e.target.value;
    const orderNumberIsNotUnique = this.context.orders.find(
      order => order.order_number === typedOrderNumber
    );

    if (orderNumberIsNotUnique && !this.props.location.pathname.includes('edit-order')) {
      this.setState({ error: 'Order Number already exists!  Please create a unique order number' });
    }
  };

  orderNumOnFocus = () => {
    this.setState({ error: null });
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
            <header>
              {this.state.error ? <h1 className={styles['error']}> {this.state.error}</h1> : null}
            </header>
            <form onSubmit={this.onSubmitHandler}>
              <div className={styles['form-row']}>
                <label htmlFor="order_num">Order #:</label>
                <input
                  className={this.state.error ? styles['error-border'] : null}
                  type="text"
                  id="order_num"
                  required
                  onChange={this.orderNumberHandler}
                  onBlur={this.orderNumOnBlur}
                  onFocus={this.orderNumOnFocus}
                  value={this.state.order_number}
                  ref={input => {
                    this.orderInput = input;
                  }}
                />
                <span className={styles['form-validator']}>
                  {this.state.error ? this.state.error : null}
                </span>
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
                  inputProps={{
                    id: 'customer_name',
                    required: true
                  }}
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
                    min={this.state.order_date}
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
                  type="number"
                  id="price"
                  required
                  className={styles['date-input']}
                  onChange={this.priceHandler}
                  value={this.state.price}
                />
              </div>

              <div className={styles['btns-panel']}>
                <button
                  className={this.state.error ? styles['disabled'] : null}
                  type="submit"
                  disabled={this.state.error}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
