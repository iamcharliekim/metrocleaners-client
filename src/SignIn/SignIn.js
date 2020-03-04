import React from 'react';
import styles from './SignIn.module.css';
import AuthApiService from '../Services/AuthApiService';
import TokenService from '../Services/TokenService';
import Context from '../Context/Context';

export default class SignIn extends React.Component {
  static contextType = Context;

  state = {
    username: this.props.match.path === '/demo' ? 'demouser1' : '',
    password: this.props.match.path === '/demo' ? '129fij#*#F' : '',
    error: null
  };

  userNameHandler = e => {
    this.setState({ username: e.target.value });
  };

  passwordHandler = e => {
    this.setState({ password: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const { username, password } = e.target;
    const user = { user_name: username.value, password: password.value };

    AuthApiService.postUserSignIn(user)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong!');
        }
        return res.json();
      })
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        // this.props.history.push('/home');

        window.location.assign('https://metrocleaners-app.now.sh/home');
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  onInputFocus = () => {
    if (this.state.error) {
      this.setState({ error: null });
    }
  };

  render() {
    return (
      <React.Fragment>
        {!this.context.openNav ? (
          <div className={styles['sign-in-wrapper']}>
            <header>
              {this.state.error ? (
                <h1 className={styles['error']}> {this.state.error}</h1>
              ) : (
                <h1 className={styles['h1-success']}>Sign In</h1>
              )}
              {this.props.match.path === '/demo' ? (
                <h2>Sign in with the login below to try MetroCleaners for free!</h2>
              ) : null}
            </header>
            <form onSubmit={this.onSubmitHandler}>
              <fieldset>
                <label htmlFor="username">
                  Username:
                  <input
                    type="text"
                    id="username"
                    onFocus={this.onInputFocus}
                    onChange={this.userNameHandler}
                    value={this.state.username}
                  />
                </label>

                <label htmlFor="password">
                  Password:
                  <input
                    type="password"
                    id="password"
                    onFocus={this.onInputFocus}
                    onChange={this.passwordHandler}
                    value={this.state.password}
                  />
                </label>

                <div className={styles['btns-div']}>
                  <button className={styles['sign-in-btn']}>Sign In</button>
                </div>
              </fieldset>
            </form>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
