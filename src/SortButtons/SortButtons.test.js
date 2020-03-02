import React from 'react';
import ReactDOM from 'react-dom';
import SortButtons from './SortButtons';

describe('SortButtons component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SortButtons />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
