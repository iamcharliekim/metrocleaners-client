import config from '../config';
import TokenService from './TokenService';

const CustomersService = {
  getCustomers() {
    return fetch(`${config.API_ENDPOINT}/customers`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  },

  postNewCustomer(customer) {
    return fetch(`${config.API_ENDPOINT}/customers`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(customer)
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  }
};

export default CustomersService;
