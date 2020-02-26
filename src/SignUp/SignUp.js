import React from 'react';
import styles from './SignUp.module.css';
import AuthApiService from '../Services/AuthApiService';

export default class SignUp extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    user_name: '',
    password: '',
    error: ''
  };

  firstNameHandler = e => {
    this.setState({ first_name: e.target.value });
  };

  lastNameHandler = e => {
    this.setState({ last_name: e.target.value });
  };

  userNameHandler = e => {
    this.setState({ user_name: e.target.value });
  };

  passwordHandler = e => {
    this.setState({ password: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newAdmin = {
      full_name: this.state.first_name + ' ' + this.state.last_name,
      user_name: this.state.user_name,
      password: this.state.password
    };

    AuthApiService.postAdminSignup(newAdmin)
      .then(res => {
        this.setState({
          first_name: '',
          last_name: '',
          user_name: '',
          password: ''
        });

        this.props.history.push('/sign-in');
      })
      .catch(res => {
        // this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <div className={styles['sign-up-wrapper']}>
        {this.state.error ? <h1 className={styles['error']}> {this.state.error}</h1> : null}
        <form onSubmit={this.onSubmitHandler}>
          <fieldset>
            <legend>Sign-Up</legend>

            <label htmlFor="firstname">
              First Name:
              <input
                type="text"
                id="firstname"
                onChange={this.firstNameHandler}
                value={this.state.first_name}
              />
            </label>

            <label htmlFor="lastname">
              Last Name:
              <input
                type="text"
                id="lastname"
                onChange={this.lastNameHandler}
                value={this.state.last_name}
              />
            </label>

            <label htmlFor="username">
              Username:
              <input
                type="text"
                id="username"
                onChange={this.userNameHandler}
                value={this.state.user_name}
              />
            </label>

            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                onChange={this.passwordHandler}
                value={this.state.password}
              />
            </label>

            <div className={styles['btns-div']}>
              <button className={styles['sign-up-btn']}>Sign Up</button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}