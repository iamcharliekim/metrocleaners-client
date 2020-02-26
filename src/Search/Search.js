import React from 'react';
import Context from '../Context/Context';
import SortButtons from '../SortButtons/SortButtons';
import styles from './Search.module.css';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Search extends React.Component {
  static contextType = Context;

  state = {
    sortOptions: [
      { label: '', value: 'all' },
      { label: 'Order #', value: 'order_number' },
      { label: 'Clerk', value: 'clerk' },
      { label: 'Customer', value: 'customer' },
      { label: 'Phone #', value: 'phone_number' },
      { label: 'Price', value: 'price' }
    ]
  };

  render() {
    return (
      <div className={styles['search-games-wrapper']}>
        <div className={styles['search-input-wrapper']}>
          <input
            type="text"
            placeholder="Search orders by...."
            onChange={this.context.onSearchOrders}
            value={this.context.searchString}
          />
          <div className={styles['search-by-dropdown']} onClick={this.context.onOpenSearchByPanel}>
            <span className={styles['dropdown-label']}>{this.context.selectedOptionValue}</span>
            <div className={styles['icon-wrapper']}>
              <FontAwesomeIcon icon={faCaretDown} className={styles['icon']} />
            </div>
          </div>
        </div>

        {this.context.openSearchByPanel ? (
          <div className={styles['search-by-panel-wrapper']}>
            <div className={styles['search-by-panel']}>
              {this.state.sortOptions.map((sortOption, i) => (
                <div
                  className={
                    this.context.selectedSearchOptionIndex === i
                      ? styles['search-by-div-selected']
                      : styles['search-by-div']
                  }
                  onMouseOver={this.onSearchByDivBlur}
                  key={i}
                  value={sortOption.value}
                  id={sortOption.value}
                  onClick={e => this.context.onClickSearchByBtn(e.target.id)}
                >
                  {sortOption.label}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <SortButtons />
      </div>
    );
  }
}
