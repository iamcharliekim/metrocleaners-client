import React from 'react';
import Context from '../Context/Context';
import SignUp from '../SignUp/SignUp';
import styles from './Landing.module.css';
import { faUser, faBasketballBall, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Landing extends React.Component {
  static contextType = Context;

  signUpButton = e => {
    e.preventDefault();
    this.props.history.push('/sign-up');
  };

  toSignIn = () => {
    this.props.history.push('/sign-in');
  };

  toDemo = () => {
    this.props.history.push('/demo');
  };

  render() {
    return (
      <React.Fragment>
        {!this.context.openNav ? (
          <main role="main" className={styles['landing-wrapper']}>
            <section className={styles['section-1']}>
              <div className={styles['section-1-hero-div']}>
                <div className={styles['section-1-hero-text']}>
                  <h1>YOUR DRYCLEANING IS READY</h1>
                  <span>
                    Keep track of your customers drycleaning while automating the process of
                    notifying them when their order is ready for pickup!
                  </span>
                  <button className={styles['explore-btn']} onClick={this.toDemo}>
                    EXPLORE METROCLEANERS
                  </button>
                </div>
              </div>
            </section>

            <section className={styles['section-2']}>
              <div className={styles['cards-wrapper']}>
                <div className={styles['section-2-card']}>
                  <div className={styles['players-icon']}>
                    <FontAwesomeIcon icon={faUser} className={styles['icon']} />
                  </div>
                  <div className={styles['card-text-wrapper']}>
                    <p className={styles['card-text-main']}>Automate Notifications</p>
                  </div>
                  <p className={styles['card-text-sub']}>
                    Automatically send SMS notifications to your customers when their drycleaning is
                    ready
                  </p>
                </div>

                <div className={styles['section-2-card']}>
                  <div className={styles['players-icon']}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className={styles['ball-icon']} />
                    <FontAwesomeIcon icon={faBasketballBall} className={styles['ball-pin']} />
                  </div>
                  <div className={styles['card-text-wrapper']}>
                    <p className={styles['card-text-main']}>Keep Track of Your Customers</p>
                  </div>
                  <p className={styles['card-text-sub']}>
                    Get to know your customer base and their habits by keeping track of their data
                    to better serve them
                  </p>
                </div>

                <div className={styles['section-2-card']}>
                  <div className={styles['players-icon']}>
                    <FontAwesomeIcon icon={faBasketballBall} className={styles['ball-icon']} />
                  </div>
                  <div className={styles['card-text-wrapper']}>
                    <p className={styles['card-text-main']}>Maximize Receivables Turnover</p>
                  </div>
                  <p className={styles['card-text-sub']}>
                    A better notification system means a higher chance of your customers picking up
                    their drycleaning on time
                  </p>
                </div>
              </div>
            </section>

            <section className={styles['section-3']}>
              <div className={styles['section-3-div-wrapper']}>
                <h1>TAKE A PEEK</h1>
              </div>
            </section>

            <section className={styles['section-4']}>
              <h1>SIGN-UP TODAY</h1>

              <SignUp toSignIn={this.toSignIn} />
            </section>
          </main>
        ) : null}
      </React.Fragment>
    );
  }
}
