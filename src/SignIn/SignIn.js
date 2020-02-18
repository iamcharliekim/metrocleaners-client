import React from 'react';
import styles from './SignIn.module.css'
import AuthApiService from '../Services/AuthApiService';
import TokenService from '../Services/TokenService';

export default class SignIn extends React.Component {
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
            this.props.history.push('/home')


            // window.location.assign('https://iamcharliekim-post-up-app.now.sh/home');
          })
          .catch(res => {
            this.setState({ error: res.error });
          });
      };


    render() {
        return (
            <div className={styles['sign-in-wrapper']}>
            {/* {this.props.match.path === '/demo' ? (
              <h2>Sign in with the login below to try Post-Up for free!</h2>
            ) : null} */}

            <form onSubmit={this.onSubmitHandler}>
              <fieldset>
                

                <label htmlFor="username">
                  Username:
                  <input
                    type="text"
                    id="username"
                    onChange={this.userNameHandler}
                    value={this.state.username}
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
                  <button className={styles['sign-in-btn']}>Sign In</button>
                </div>
              </fieldset>
            </form>
          </div>
        );
    }
}
