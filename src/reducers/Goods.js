import * as types from '../actions/actionTypes.js';

const initialState = {
	goods: []
};

function Goods(state = initialState, action) {
	switch (action.type) {

		case types.Goods:
			return Object.assign({}, state, {
				goods: action.goods
			});

		default:
			return state;
	}
}

export default Goods;