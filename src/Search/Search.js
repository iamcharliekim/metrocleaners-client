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
    ],
    placeholder: '',
    openSearchByPanel: false,
    selectedOptionIndex: 0,
    selectedOptionValue: '',
    searchBy: 'all'
  };

  openSearchByPanel = () => {
    this.setState({ openSearchByPanel: !this.state.openSearchByPanel });
  };

  onSearchFocus = e => {
    this.setState({});
  };

  onSearchBlur = e => {
    this.setState({
      placeholder: ''
    });
  };

  onClickSearchByBtn = (e, btnIndex) => {
    this.setState({
      selectedOptionIndex: btnIndex,
      selectedOptionValue: e.target.textContent,
      searchBy: e.target.id
    });
    setTimeout(() => {
      this.setState({ openSearchByPanel: false });
    }, 110);
  };

  onSearchByDivBlur = () => {
    // this.setState({ selectedOptionIndex: null });
  };

  render() {
    return (
      <div className={styles['search-games-wrapper']}>
        <div className={styles['search-input-wrapper']}>
          <input
            type="text"
            placeholder="Search orders by...."
            onChange={e => this.context.onSearchOrders(e, this.state.searchBy)}
            onFocus={this.onSearchFocus}
            onBlur={this.onSearchBlur}
            value={this.context.searchString}
          />
          <div className={styles['search-by-dropdown']} onClick={this.openSearchByPanel}>
            <span className={styles['dropdown-label']}>{this.state.selectedOptionValue}</span>
            <div className={styles['icon-wrapper']}>
              <FontAwesomeIcon icon={faCaretDown} className={styles['icon']} />
            </div>
          </div>

          {/* {this.state.selectedOptionValue !== '' ? (
            <div className={styles['search-by-badge-wrapper']}>
              <span className={styles['search-by-label']}>Searching:</span>
              <span className={styles['search-by-badge']}>{this.state.selectedOptionValue}</span>
            </div>
          ) : null} */}
        </div>

        {this.state.openSearchByPanel ? (
          <div className={styles['search-by-panel-wrapper']}>
            <div className={styles['search-by-panel']}>
              {this.state.sortOptions.map((sortOption, i) => (
                <div
                  className={
                    this.state.selectedOptionIndex === i
                      ? styles['search-by-div-selected']
                      : styles['search-by-div']
                  }
                  onMouseOver={this.onSearchByDivBlur}
                  key={i}
                  value={sortOption.value}
                  id={sortOption.value}
                  onClick={e => this.onClickSearchByBtn(e, i)}
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
