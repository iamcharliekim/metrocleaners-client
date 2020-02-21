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
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  },

  postNewOrder(order) {
    return fetch(`${config.API_ENDPOINT}/orders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(order)
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  },

  putUpdateOrder(order, id) {
    return fetch(`${config.API_ENDPOINT}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(order)
    }).then(res => (!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()));
  }
};

export default OrdersService;
