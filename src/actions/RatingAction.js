import * as types from '../actions/actionTypes.js';

export function setRatings(ratings) {
	return {
		type: types.Ratings,
		ratings: ratings
	}
}