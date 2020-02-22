import config from '../config';
import TokenService from './TokenService';

const MessangerService = {
  postNewMessage(message) {
    return fetch(`${config.API_ENDPOINT}/sms`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(message)
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  }
};

export default MessangerService;
