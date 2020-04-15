import React from 'react';
import ReactDOM from 'react-dom';
import CreateOrder from './CreateOrder';

describe('Navbar component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const location = { pathname: 'edit-order' };
    const match = { params: { id: 1 } };

    ReactDOM.render(<CreateOrder location={location} match={match} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
