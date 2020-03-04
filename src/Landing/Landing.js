import React from 'react';
import Context from '../Context/Context';
import SignUp from '../SignUp/SignUp';
import styles from './Landing.module.css';
import { faSms, faUsers, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
                    Keep track of your customers and their orders while using automated SMS
                    notifications to keep them in the loop
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
                    <FontAwesomeIcon icon={faSms} className={styles['icon']} />
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
                    <FontAwesomeIcon icon={faUsers} className={styles['ball-icon']} />
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
                    <FontAwesomeIcon icon={faMoneyBill} className={styles['ball-icon']} />
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
                <div className={styles['carousel-wrapper']}>
                  <Carousel
                    className={styles['carousel']}
                    showArrows={true}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    transitionTime={1000}
                    width="320px"
                    dynamicHeight={true}
                  >
                    <div className={styles['home-games-wrapper']}>
                      <img
                        src={require('./images/mc-homescreen.png')}
                        className={styles['home-screenshot']}
                        alt="findgames"
                      />
                    </div>

                    <div className={styles['home-games-wrapper']}>
                      <img
                        src={require('./images/mc-orderform.png')}
                        className={styles['home-screenshot']}
                        alt="creategames"
                      />
                    </div>

                    <div className={styles['home-games-wrapper']}>
                      <img
                        src={require('./images/mc-orderdetails.png')}
                        className={styles['home-screenshot']}
                        alt="getdetails"
                      />
                    </div>

                    <div className={styles['home-games-wrapper']}>
                      <img
                        src={require('./images/mc-customers.png')}
                        className={styles['create-screenshot']}
                        alt="talktrash"
                      />
                    </div>
                  </Carousel>
                </div>

                <div className={styles['screens-wrapper']}>
                  <div className={styles['home-games-wrapper']}>
                    <img
                      src={require('./images/mc-homescreen.png')}
                      className={styles['home-screenshot']}
                      alt="findgames"
                    />
                  </div>

                  <div className={styles['home-games-wrapper']}>
                    <img
                      src={require('./images/mc-orderform.png')}
                      className={styles['home-screenshot']}
                      alt="creategames"
                    />
                  </div>

                  <div className={styles['home-games-wrapper']}>
                    <img
                      src={require('./images/mc-orderdetails.png')}
                      className={styles['home-screenshot']}
                      alt="getdetails"
                    />
                  </div>

                  <div className={styles['home-games-wrapper']}>
                    <img
                      src={require('./images/mc-customers.png')}
                      className={styles['home-screenshot']}
                      alt="talktrash"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className={styles['section-4']}>
              <SignUp toSignIn={this.toSignIn} />
            </section>
          </main>
        ) : null}
      </React.Fragment>
    );
  }
}
