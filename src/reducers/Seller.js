import * as types from '../actions/actionTypes.js';

const initialState = {
	seller: {}
};

function Seller(state = initialState, action) {
	switch (action.type) {

		case types.Seller:
			return Object.assign({}, state, {
				seller: action.seller
			});

		default:
			return state;
	}
}

export default Seller;