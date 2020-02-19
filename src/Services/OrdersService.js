import config from '../config';
import TokenService from './TokenService';

const OrdersService = {
  getOrders() {
    return fetch(`${config.API_ENDPOINT}/orders`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  },

  postNewOrder(order) {
    return fetch(`${config.API_ENDPOINT}/orders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(order)
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res));
  }
};

export default OrdersService;
