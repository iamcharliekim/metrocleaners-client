import config from '../config';
import TokenService from './TokenService';

const ClerksService = {
  getClerks() {
    return fetch(`${config.API_ENDPOINT}/clerks`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  },

  postNewClerk(clerk) {
    return fetch(`${config.API_ENDPOINT}/clerks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(clerk)
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  }
};

export default ClerksService;
