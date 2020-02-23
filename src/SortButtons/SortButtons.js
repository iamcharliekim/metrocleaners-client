import React from 'react';
import Context from '../Context/Context';
import styles from './SortButtons.module.css';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SortButtons extends React.Component {
  static contextType = Context;

  state = {
    openPriceSortPanel: false,
    openReadyByDateSortPanel: false,
    openOrderDateSortPanel: false,
    sortPriceOptions: [
      { label: 'Price', value: 'price', order: 'Highest' },
      { label: 'Price', value: 'price', order: 'Lowest' }
    ],
    sortOrderDateOptions: [
      { label: 'Order-Date', value: 'order_date', order: 'Newest' },
      { label: 'Order-Date', value: 'order_date', order: 'Oldest' }
    ],
    sortReadyByDateOptions: [
      { label: 'Ready-By-Date', value: 'ready_by_date', order: 'Newest' },
      { label: 'Ready-By-Date', value: 'ready_by_date', order: 'Oldest' }
    ],
    selectedPriceOptionIndex: 0,
    selectedReadyDateOptionIndex: 0,
    selectedOrderDateOptionIndex: 0,
    selectedOptionValue: ''
  };

  onOpenSortPanel = panel => {
    console.log(panel);
    if (panel === 'price') {
      this.setState((prevState, props) => {
        return { openPriceSortPanel: !prevState.openPriceSortPanel };
      });
    }

    if (panel === 'ready_by_date') {
      this.setState((prevState, props) => {
        return { openReadyByDateSortPanel: !prevState.openReadyByDateSortPanel };
      });
    }

    if (panel === 'order_date') {
      this.setState((prevState, props) => {
        return { openOrderDateSortPanel: !prevState.openOrderDateSortPanel };
      });
    }
  };

  onSelectSortByPriceBtn = (option, btnIndex) => {
    this.setState((prevState, props) => {
      return {
        openPriceSortPanel: !!prevState.openPriceSortPanel,
        selectedPriceOptionIndex: btnIndex,
        searchBy: 'price',
        order: option.order
      };
    });

    this.context.onSortByDropdown(option.value, option.order);
  };

  onSelectSortByReadyDateBtn = (option, btnIndex) => {
    this.setState((prevState, props) => {
      return {
        openReadyByDateSortPanel: !!prevState.openReadyByDateSortPanel,
        selectedReadyDateOptionIndex: btnIndex,
        searchBy: 'price',
        order: option.order
      };
    });

    this.context.onSortByDropdown(option.value, option.order);
  };

  onSelectOrderDateBtn = (option, btnIndex) => {
    this.setState((prevState, props) => {
      return {
        openOrderDateSortPanel: !!prevState.openOrderDateSortPanel,
        selectedOrderDateOptionIndex: btnIndex,
        searchBy: 'price',
        order: option.order
      };
    });
    this.context.onSortByDropdown(option.value, option.order);
  };

  render() {
    return (
      <div className={styles['sort-buttons-wrapper']}>
        <div className={styles['sort-buttons-inner-wrapper']}>
          <button onClick={() => this.context.onSortOrders('past')}>Past</button>
          <button onClick={() => this.context.onSortOrders('upcoming')}>Upcoming</button>
          <button onClick={() => this.context.onSortOrders('all')}>All</button>
        </div>

        <div className={styles['sort-by-dropdown-wrapper']}>
          <div className={styles['sort-by-dropdown']} onClick={() => this.onOpenSortPanel('price')}>
            <div className={styles['select-dropdown']}>
              <span className={styles['dropdown-label']}>Price</span>
              <div className={styles['icon-wrapper']}>
                <FontAwesomeIcon icon={faCaretDown} className={styles['icon']} />
              </div>
            </div>

            {this.state.openPriceSortPanel
              ? this.state.sortPriceOptions.map((option, i) => {
                  return (
                    <div className={styles['sort-by-panel']} key={i}>
                      <div
                        className={
                          this.state.selectedPriceOptionIndex === i
                            ? styles['sort-by-div-selected']
                            : styles['sort-by-div']
                        }
                        id={option.value}
                        onClick={e => this.onSelectSortByPriceBtn(option, i)}
                      >
                        {option.order}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>

          <div
            className={styles['sort-by-dropdown']}
            onClick={() => this.onOpenSortPanel('ready_by_date')}
          >
            <div className={styles['select-dropdown']}>
              <span className={styles['dropdown-label']}>Ready-Date</span>
              <div className={styles['icon-wrapper']}>
                <FontAwesomeIcon icon={faCaretDown} className={styles['icon']} />
              </div>
            </div>

            {this.state.openReadyByDateSortPanel
              ? this.state.sortReadyByDateOptions.map((option, i) => {
                  return (
                    <div className={styles['sort-by-panel']}>
                      <div
                        className={
                          this.state.selectedReadyDateOptionIndex === i
                            ? styles['sort-by-div-selected']
                            : styles['sort-by-div']
                        }
                        id={option.value}
                        onClick={e => this.onSelectSortByReadyDateBtn(option, i)}
                      >
                        {option.order}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>

          <div
            className={styles['sort-by-dropdown']}
            onClick={() => this.onOpenSortPanel('order_date')}
          >
            <div className={styles['select-dropdown']}>
              <span className={styles['dropdown-label']}>Order-Date</span>
              <div className={styles['icon-wrapper']}>
                <FontAwesomeIcon icon={faCaretDown} className={styles['icon']} />
              </div>
            </div>

            {this.state.openOrderDateSortPanel
              ? this.state.sortReadyByDateOptions.map((option, i) => {
                  return (
                    <div className={styles['sort-by-panel']}>
                      <div
                        className={
                          this.state.selectedOrderDateOptionIndex === i
                            ? styles['sort-by-div-selected']
                            : styles['sort-by-div']
                        }
                        id={option.value}
                        onClick={e => this.onSelectOrderDateBtn(option, i)}
                      >
                        {option.order}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}

{
  /* <div className={styles['search-by-panel']}>
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
  </div> */
}
