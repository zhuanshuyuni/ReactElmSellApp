import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import thunk from 'redux-thunk';
import {
	createLogger
} from 'redux-logger';
import reducers from '../reducers';

let middlewares = [thunk];

if (__DEBUG__) {
	middlewares.push(createLogger());
}

function configureStore(preloadedState) {
	const store = createStore(reducers, preloadedState, compose(
		applyMiddleware(...middlewares),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));
	return store;
}

export default configureStore();