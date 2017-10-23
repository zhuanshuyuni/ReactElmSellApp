import * as types from '../actions/actionTypes.js';

export function setGoods(goods) {
	return {
		type: types.Goods,
		goods: goods
	}
}