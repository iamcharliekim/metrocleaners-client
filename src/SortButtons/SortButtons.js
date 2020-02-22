import React from 'react';
import Context from '../Context/Context';
import styles from './SortButtons.module.css';

export default class SortButtons extends React.Component {
  static contextType = Context;

  render() {
    return (
      <div className={styles['sort-buttons-wrapper']}>
        <div className={styles['sort-buttons-inner-wrapper']}>
          <button onClick={() => this.context.onSortOrders('past')}>Past Orders</button>
          <button onClick={() => this.context.onSortOrders('upcoming')}>Upcoming Orders</button>
          <button onClick={() => this.context.onSortOrders('all')}>All Orders</button>
        </div>
      </div>
    );
  }
}
