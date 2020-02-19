import config from '../config';

const AuthApiService = {
  postAdminSignup(admin) {
    return fetch(`${config.API_ENDPOINT}/admins`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(admin)
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  },

  postUserSignIn(user) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  }
};

export default AuthApiService;
