import React from 'react';
import ReactDOM from 'react-dom';
import Customers from './Customers';

describe('Customers component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Customers />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
