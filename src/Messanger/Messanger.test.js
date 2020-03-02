import React from 'react';
import ReactDOM from 'react-dom';
import Messanger from './Messanger';
import { BrowserRouter } from 'react-router-dom';

describe('Messanger component', () => {
  it('renders without crashing', () => {
    const state = {
      order: {
        id: 2,
        order_number: 'M2021',
        clerk: 'David',
        customer: 'Charles Kim ',
        phone_number: '3015255589',
        order_date: '2020-02-28T23:07:00.000Z',
        ready_by_date: '2020-02-28T23:08:00.000Z',
        price: '20',
        quantity: 2,
        picked_up: true,
        picked_up_date: '2020-02-28T23:10:09.986Z',
        paid: false,
        notification_sent: '2020-02-28T23:08:00.000Z',
        date_created: '2020-02-28T23:05:37.381Z',
        date_modified: '2020-02-28T23:08:09.288Z'
      },
      customer: {
        id: 1,
        full_name: 'Charles Kim ',
        phone_number: '3015255589',
        date_created: '2020-02-27T22:51:16.853Z',
        date_modified: null
      },
      formattedPhoneNumber: '(301) 525-5589',
      formattedOrderDateTime: '2/28/20 6:07 PM',
      formattedReadyDateTime: '2/28/20 6:08 PM'
    };

    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Messanger state={state} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
