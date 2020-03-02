import React from 'react';
import ReactDOM from 'react-dom';
import OrderItem from './OrderItem';
import { BrowserRouter } from 'react-router-dom';

describe('OrderItem component', () => {
  it('renders without crashing', () => {
    const orderItem = {
      id: 1,
      order_number: 'M2020',
      clerk: 'David Kim',
      customer: 'Charles Kim ',
      phone_number: '3015255589',
      order_date: '2020-02-27T20:00:00.000Z',
      ready_by_date: '2020-02-29T21:00:00.000Z',
      price: '20',
      quantity: 2,
      picked_up: true,
      picked_up_date: '2020-02-28T23:07:48.257Z',
      paid: false,
      notification_sent: '2020-02-29T21:00:00.000Z',
      date_created: '2020-02-27T22:51:16.953Z',
      date_modified: '2020-02-28T23:05:47.547Z'
    };

    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <OrderItem orderItem={orderItem} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
