import React from 'react';
import styles from './SortButtons.module.css'

export default class SortButtons extends React.Component {
    render() {
        return (
            <div className={styles["sort-buttons-wrapper"]}>
                <div className={styles["sort-buttons-inner-wrapper"]}>
                    <button>Past Orders</button>
                    <button>Upcoming Orders</button>
                    <button>All Orders</button>
                </div>
            </div>
        );
    }
}
