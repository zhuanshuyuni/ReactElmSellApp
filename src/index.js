import React from 'react';
import ReactDom from 'react-dom';
import Root from './components/root/root.js';
import store from './store/store.js';

ReactDom.render(
	<Root store={store}/>,
	document.getElementById('root')
);