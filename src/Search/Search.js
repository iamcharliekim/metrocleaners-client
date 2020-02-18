import React from 'react';
import Context from '../Context/Context';
import styles from './Search.module.css';
import SortButtons from '../SortButtons/SortButtons';

export default class Search extends React.Component {
  static contextType = Context;

  render() {
    return (
      <React.Fragment>
        <div className={styles['search-games-wrapper']}>
          <input
            type="text"
            placeholder="Search Orders..."
            onChange={this.context.onSearchGames}
            value={this.context.searchString}
          />
        
        <SortButtons/>

        </div>
      </React.Fragment>
    );
  }
}
