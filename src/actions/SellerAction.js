import * as types from '../actions/actionTypes.js';

export function setSeller(seller) {
	return {
		type: types.Seller,
		seller: seller
	}
}