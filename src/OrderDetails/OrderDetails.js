import React from 'react';
import styles from './OrderDetails.module.css'

export default class OrderDetails extends React.Component {
    render() {
        return (
            <div className={styles["order-details-wrapper"]}>
                <div className={styles["order-details-inner-wrapper"]}>
                    <div className={styles["customer-details-wrapper"]}>
                        <h1>David Kim</h1>
                        <span>301.525.5589</span>
                        <span>davidk89@gmail.com</span>
                    </div>
                    
                    <div className={styles["order-dates-wrapper"]}>
                        <span>Order Created: 02-04-2020 @ 2:30PM</span>
                        <span>Order Ready Date: 02-12-2020</span>
                    </div>
                    
                    <div className={styles["order-invoice-wrapper"]}>
                        <h2>Order Invoice</h2>
                    </div>
                </div>
            </div>
        );
    }
}
