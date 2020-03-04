import React from 'react';
import ReactDOM from 'react-dom';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';

describe.only('PrivateRoute component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <PrivateRoute path={'/home'} component={Home} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
