import React from 'react';
import Context from '../Context/Context';
import styles from './SortButtons.module.css';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SortButtons extends React.Component {
  static contextType = Context;

  state = {
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
    ]
  };

  onOpenSortPanel = panel => {
    if (panel === 'price') {
      this.setState((prevState, props) => {
        return {
          openPriceSortPanel: !prevState.openPriceSortPanel
        };
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
    this.context.onSortByDropdown(option.value, option.order);
    this.context.sortByPriceBtnActive(btnIndex);
  };

  onSelectSortByReadyDateBtn = (option, btnIndex) => {
    this.context.onSortByDropdown(option.value, option.order);
    this.context.sortByReadyDateBtnActive(btnIndex);
  };

  onSelectOrderDateBtn = (option, btnIndex) => {
    this.context.onSortByDropdown(option.value, option.order);
    this.context.sortByOrderDateBtnActive(btnIndex);
  };

  onSortOrders = sortBy => {
    if (sortBy === 'past') {
      this.context.onSortOrders('past');
      this.context.sortByPastBtnActive();
    }
    if (sortBy === 'upcoming') {
      this.context.onSortOrders('upcoming');
      this.context.sortByUpcomingBtnActive();
    }
    if (sortBy === 'all') {
      this.context.onSortOrders('all');
      this.context.sortByAllBtnActive();
    }
  };

  render() {
    return (
      <div className={styles['sort-buttons-wrapper']}>
        <div className={styles['sort-buttons-inner-wrapper']}>
          <button
            className={this.context.pastActive ? styles['active'] : styles['sort-button']}
            onClick={() => this.onSortOrders('past')}
            active={this.state.pastActive}
          >
            Past
          </button>
          <button
            className={this.context.upcomingActive ? styles['active'] : styles['sort-button']}
            onClick={() => this.onSortOrders('upcoming')}
            active={this.state.upcomingActive}
          >
            Upcoming
          </button>
          <button
            className={this.context.allActive ? styles['active'] : styles['sort-button']}
            onClick={() => this.onSortOrders('all')}
            active={this.state.allActive}
          >
            All
          </button>
        </div>

        <div className={styles['sort-by-dropdown-wrapper']}>
          <div
            className={styles['sort-by-dropdown']}
            onClick={() => this.context.onOpenSortDropdown('price')}
          >
            <div
              className={
                this.context.priceActive ? styles['select-active'] : styles['select-dropdown']
              }
            >
              <span className={styles['dropdown-label']}>Price</span>
              <div className={styles['icon-wrapper']}>
                <FontAwesomeIcon icon={faCaretDown} className={styles['icon']} />
              </div>
            </div>
            {this.context.openPriceSortPanel
              ? this.state.sortPriceOptions.map((option, i) => {
                  return (
                    <div className={styles['sort-by-panel']} key={i}>
                      <div
                        className={
                          this.context.selectedPriceOptionIndex === i
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
            onClick={() => this.context.onOpenSortDropdown('ready_by_date')}
          >
            <div
              className={
                this.context.readyByActive ? styles['select-active'] : styles['select-dropdown']
              }
            >
              <span className={styles['dropdown-label']}>Ready-By</span>
              <div className={styles['icon-wrapper']}>
                <FontAwesomeIcon icon={faCaretDown} className={styles['icon']} />
              </div>
            </div>

            {this.context.openReadyByDateSortPanel
              ? this.state.sortReadyByDateOptions.map((option, i) => {
                  return (
                    <div className={styles['sort-by-panel']} key={i}>
                      <div
                        className={
                          this.context.selectedReadyDateOptionIndex === i
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
            onClick={() => this.context.onOpenSortDropdown('order_date')}
          >
            <div
              className={
                this.context.orderedActive ? styles['select-active'] : styles['select-dropdown']
              }
            >
              <span className={styles['dropdown-label']}>Ordered</span>
              <div className={styles['icon-wrapper']}>
                <FontAwesomeIcon icon={faCaretDown} className={styles['icon']} />
              </div>
            </div>

            {this.context.openOrderDateSortPanel
              ? this.state.sortOrderDateOptions.map((option, i) => {
                  return (
                    <div className={styles['sort-by-panel']} key={i}>
                      <div
                        className={
                          this.context.selectedOrderDateOptionIndex === i
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
