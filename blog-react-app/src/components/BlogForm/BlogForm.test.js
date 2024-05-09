import React from 'react';
import ReactDOM from 'react-dom';
import BlogForm from './BlogForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BlogForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});