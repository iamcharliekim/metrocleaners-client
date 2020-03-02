import React from 'react';
import ReactDOM from 'react-dom';
import CreateOrder from './CreateOrder';

describe('Navbar component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateOrder />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
