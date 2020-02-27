import React from 'react';
import Context from '../Context/Context';
import OrderItem from '../OrderItem/OrderItem';
import Search from '../Search/Search';
import styles from './Home.module.css';

export default class Home extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.boxIsChecked.length < this.props.boxIsChecked.length) {
      const list = this.listRef.current;

      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <React.Fragment>
        {!this.context.openNav ? (
          <div className={styles['home-wrapper']} ref={this.listRef}>
            <Search />
            <header className={styles['home-wrapper-header']}>
              <h3> </h3>
            </header>
            <div className={styles['orders-list-wrapper']}>
              {this.context.filteredOrders
                ? this.context.filteredOrders.map(order => {
                    return <OrderItem orderItem={order} key={order.id} />;
                  })
                : null}
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
