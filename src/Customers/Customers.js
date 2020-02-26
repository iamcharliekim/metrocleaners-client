import React from 'react';
import styles from './Customers.module.css';
import Context from '../Context/Context';
import Customer from '../Customer/Customer';

export default class Customers extends React.Component {
  static contextType = Context;

  state = {
    customers: []
  };

  componentDidMount() {
    let customersArr = this.context.customers.map(customer => {
      return {
        customer: customer,
        orders: this.context.orders.filter(order => order.customer === customer.full_name)
      };
    });

    this.setState({ customers: customersArr });
  }

  render() {
    return (
      <React.Fragment>
        {!this.context.openNav ? (
          <div className={styles['customers-wrapper']}>
            <div className={styles['customers-headers']}>
              <div className={styles['th']}>Name</div>
              <div className={styles['th']}>Phone #</div>
              <div className={styles['th']}>Orders</div>
            </div>

            {this.state.customers.map((customer, i) => {
              return <Customer key={i} customer={customer} />;
            })}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
