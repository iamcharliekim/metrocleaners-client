import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';
import styles from './App.module.css';
import Context from './Context/Context';
import CreateOrder from './CreateOrder/CreateOrder';
import Customers from './Customers/Customers';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import OrderDetails from './OrderDetails/OrderDetails';
import ClerksService from './Services/ClerksService';
import CustomersService from './Services/CustomersService';
import OrdersService from './Services/OrdersService';
import TokenService from './Services/TokenService';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import moment from 'moment';

export default class App extends React.Component {
  static contextType = Context;

  state = {
    openNav: false,
    customers: '',
    clerks: '',

    orders: [],
    filteredOrders: []
  };

  componentDidMount() {
    let parsedOrders;

    OrdersService.getOrders().then(orders => {
      if (orders) {
        CustomersService.getCustomers().then(customers => {
          if (customers) {
            parsedOrders = orders.map(order => {
              return {
                ...order,
                customer: customers.find(customer => customer.id === order.customer).full_name
              };
            });

            ClerksService.getClerks().then(clerks => {
              if (clerks) {
                this.setState({
                  customers,
                  orders: parsedOrders,
                  filteredOrders: orders,
                  clerks
                });
              }
            });
          }
        });
      }
    });
  }

  updateCustomers = customers => {
    const customersCopy = [...this.state.customers];
    customersCopy.push(customers);
    this.setState({ customers: customersCopy });
  };

  updateClerks = clerks => {
    const clerksCopy = [...this.state.clerks];
    clerksCopy.push(clerks);
    this.setState({ clerks: clerksCopy });
  };

  updateOrders = orders => {
    const ordersCopy = [...this.state.orders];
    ordersCopy.push(orders);
    this.setState({ filteredOrders: ordersCopy });
  };

  editOrders = editedOrder => {
    const ordersCopy = [...this.state.orders];
    const index = ordersCopy.findIndex(order => order.id === editedOrder.id);
    ordersCopy[index] = editedOrder;
    this.setState({ filteredOrders: ordersCopy });
  };

  onOpenNav = () => {
    this.setState({ openNav: !this.state.openNav });
  };

  signout = () => {
    TokenService.clearAuthToken();
    this.onOpenNav();
  };

  onSearchOrders = (e, searchBy) => {
    const searchString = e.target.value;

    let ordersCopy = [...this.state.orders];
    let filteredOrders;

    if (searchBy === 'all') {
      filteredOrders = ordersCopy.filter(order => {
        return (
          order['order_number'].toLowerCase().includes(searchString.toLowerCase()) ||
          order['clerk'].toLowerCase().includes(searchString.toLowerCase()) ||
          order['customer'].toLowerCase().includes(searchString.toLowerCase()) ||
          order['phone_number'].toLowerCase().includes(searchString.toLowerCase()) ||
          order['price'].toLowerCase().includes(searchString.toLowerCase())
        );
      });
    } else {
      filteredOrders = ordersCopy.filter(order => {
        return order[searchBy].toLowerCase().includes(searchString.toLowerCase());
      });
    }

    this.setState({
      filteredOrders,
      searchString
    });
  };

  onSortOrders = sortBy => {
    const today = new Date().getTime();
    const ordersCopy = [...this.state.orders];
    let filteredOrders;

    if (sortBy === 'all') {
      filteredOrders = ordersCopy;
    }
    if (sortBy === 'past') {
      filteredOrders = ordersCopy.filter(
        order =>
          moment(order.order_date)
            .local(true)
            .valueOf() < today
      );
    }
    if (sortBy === 'upcoming') {
      filteredOrders = ordersCopy.filter(
        order =>
          moment(order.order_date)
            .local(true)
            .valueOf() > today
      );
    }

    this.setState({
      filteredOrders
    });
  };

  onSortByDropdown = (sortBy, sortOrder) => {
    const ordersCopy = [...this.state.orders];
    let sortedOrders;

    if (sortBy === 'price' && sortOrder === 'Highest') {
      sortedOrders = ordersCopy.sort((a, b) => {
        if (Number(a[sortBy]) > Number(b[sortBy])) {
          return -1;
        } else if (Number(a[sortBy]) < Number(b[sortBy])) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    if (sortBy === 'price' && sortOrder === 'Lowest') {
      sortedOrders = ordersCopy.sort((a, b) => {
        if (Number(a[sortBy]) > Number(b[sortBy])) {
          return 1;
        } else if (Number(a[sortBy]) < Number(b[sortBy])) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    // DATES NEED TO SORT PROPERLY IN BOTH IF-BLOCKS BELOW!
    if ((sortBy === 'ready_by_date' || sortBy === 'order_date') && sortOrder === 'Newest') {
      sortedOrders = ordersCopy.sort((a, b) => {
        if (moment(a[sortBy]).valueOf() > moment(b[sortBy]).valueOf()) {
          return -1;
        } else if (moment(a[sortBy]).valueOf() < moment(b[sortBy]).valueOf()) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    if ((sortBy === 'ready_by_date' || sortBy === 'order_date') && sortOrder === 'Oldest') {
      sortedOrders = ordersCopy.sort((a, b) => {
        if (new Date(a[sortBy]).getTime() > new Date(b[sortBy]).getTime()) {
          return 1;
        } else if (new Date(a[sortBy]) < new Date(b[sortBy])) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    this.setState({ filteredOrders: sortedOrders });
  };

  render() {
    const contextVal = {
      openNav: this.state.openNav,
      onOpenNav: this.onOpenNav,
      customers: this.state.customers,
      orders: this.state.orders,
      clerks: this.state.clerks,
      updateCustomers: this.updateCustomers,
      updateClerks: this.updateClerks,
      updateOrders: this.updateOrders,
      editOrders: this.editOrders,
      filteredOrders: this.state.filteredOrders,
      onSearchOrders: this.onSearchOrders,
      onSortOrders: this.onSortOrders,
      onSortByDropdown: this.onSortByDropdown
    };

    let navLinks;

    if (!TokenService.hasAuthToken()) {
      navLinks = [
        <Link to="/sign-in" key="1" className={styles['nav-link']} onClick={this.onOpenNav}>
          Sign-In
        </Link>,
        <Link to="/sign-up" key="2" className={styles['nav-link']} onClick={this.onOpenNav}>
          Sign-Up
        </Link>
      ];
    } else {
      navLinks = [
        <Link to="/home" key="0" className={styles['nav-link']} onClick={this.onOpenNav}>
          Home
        </Link>,
        <Link to="/new-order" key="3" className={styles['nav-link']} onClick={this.onOpenNav}>
          + New Order
        </Link>,
        <Link to="/customers" key="4" className={styles['nav-link']} onClick={this.onOpenNav}>
          Customers
        </Link>,
        <Link to="/sign-in" key="5" className={styles['nav-link']} onClick={this.signout}>
          Sign-Out
        </Link>
      ];
    }

    return (
      <BrowserRouter>
        <Context.Provider value={contextVal}>
          <div className={styles.App}>
            <Navbar />
            {this.state.openNav ? (
              <div className={styles['nav-links-wrapper']}>
                {navLinks.map(link => {
                  return link;
                })}
              </div>
            ) : null}

            {TokenService.hasAuthToken() ? <Redirect to="/home" /> : <Redirect to="/landing" />}

            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/sign-in" exact component={SignIn} />
            <Route path="/home" exact component={Home} />
            <Route path="/new-order" exact component={CreateOrder} />
            <Route path="/customers" exact component={Customers} />
            <Route path="/orders/:order_id" exact component={OrderDetails} />
          </div>
          <Footer />
        </Context.Provider>
      </BrowserRouter>
    );
  }
}
