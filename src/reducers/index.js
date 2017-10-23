import {
	combineReducers
} from 'redux';
import Seller from './Seller.js';
import Goods from './Goods.js';
import Ratings from './Ratings.js';

const reducers = combineReducers({
	Seller,
	Goods,
	Ratings
});

export default reducers;