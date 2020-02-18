import React from 'react';
import styles from './CreateOrder.module.css'


export default class CreateOrder extends React.Component {


    render() {
        return (
            <React.Fragment>
              {!this.context.openNav ? (
                <div className={styles['create-game-wrapper']}>
                    <h1>New Order</h1>
                  <form onSubmit={this.onSubmitHandler}>
                    <div className={styles['form-row']}>
                      <label htmlFor="game_name">Customer Name:</label>
                      <input
                        type="text"
                        placeholder="Give your game a name"
                        id="game_name"
                        required
                      />
                    </div>
      
                    <div className={styles['form-row']}>
                      <label htmlFor="game_name"> Phone #:</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                        required
                        />
                    </div> 

                    <div className={styles['form-row']}>
                      <label htmlFor="date">Order Ready Date:</label>
                      <input
                        type="date"
                        id="date"
                        required
                        className={styles['date-input']}
                      />
                    </div>
      
                    <div className={styles['form-row']}>
                      <label htmlFor="time">Price ($)</label>
                      <input
                        type="text"
                        id="time"
                        required
                        className={styles['date-input']}
                      />
                    </div>

                    
      

                    <div className={styles['btns-panel']}>
                      <button type="submit">Submit</button>
                    </div>
                  </form>
                </div>
              ) : null}
            </React.Fragment>
          );
    }
}

