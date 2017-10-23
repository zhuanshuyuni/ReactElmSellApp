import * as types from '../actions/actionTypes.js';

const initialState = {
	ratings: []
};

function Ratings(state = initialState, action) {
	switch (action.type) {

		case types.Ratings:
			return Object.assign({}, state, {
				ratings: action.ratings
			});
		default:
			return state;
	}
}

export default Ratings;