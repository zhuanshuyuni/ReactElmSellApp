import React from 'react';
import axios from 'axios';
import {
	NavLink,
	hashHistory
} from 'react-router-dom';
import PubSub from 'pubsub-js';

import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux';

import Header from '../header/header.js';
import './app.less';
import '../../config/css/common.css';
import Shopcart from '../shopcart/shopcart.js';
import {
	setGoods
} from '../../actions/GoodsAction.js';
import {
	setRatings
} from '../../actions/RatingAction.js';
import {
	setSeller
} from '../../actions/SellerAction.js';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectFoods: []
		}
	}

	componentDidMount() {
		var _this = this;
		let {
			setSeller,
			setGoods,
			setRatings
		} = _this.props;

		axios.get('/api/seller').then(function(response) {

			setSeller(response.data.data);

		}).catch(function(error) {});

		axios.get('/api/goods').then(function(response) {
			// 更新store树
			setGoods(response.data.data);

		}).catch(function(error) {});

		axios.get('/api/ratings').then(function(response) {

			setRatings(response.data.data);

		}).catch(function(error) {});


		PubSub.subscribe('addFood', this.addFood.bind(this));
		PubSub.subscribe('decreaseFood', this.decreaseFood.bind(this));
		PubSub.subscribe('emptyShopcart', this.emptyShopcart.bind(this));
	}
	componentWillUnmount() {
			PubSub.unsubscribe("addFood");
			PubSub.unsubscribe("decreaseFood");
			PubSub.unsubscribe("emptyShopcart");
		}
		// 添加商品
	addFood(msg, item) {
			if (!item.count) {
				item.count = 1;
			} else {
				item.count++;
			}
			this.calculateSelectFoods();
		}
		// 点击减号
	decreaseFood(msg, item) {

		if (item.count) {
			item.count--;
		}
		this.calculateSelectFoods();
	}
	emptyShopcart() {
			this.state.selectFoods.map((food) => {
				food.count = 0;
			});
			this.setState({
				selectFoods: []
			});

			PubSub.publish('refreshGoods');
		}
		// 计算所有选中的商品
	calculateSelectFoods() {
		let arr = [];
		this.props.goods.map((good) => {
			good.foods.map((food) => {
				if (food.count && food.count > 0) {
					arr.push(food);
				}
			});
		});
		this.setState({
			selectFoods: arr
		});

		PubSub.publish('refreshGoods');
	}

	render() {
		return (
			<div className='app-wrapper'>
				<Header seller={this.props.seller}></Header>
				<div className="divider-wrapper">
					<div className="divider">
						<NavLink exact to='/' activeClassName="active">商品</NavLink>
					</div>
					<div className="divider">
						<NavLink to='/ratings' activeClassName="active">评价</NavLink>
					</div>
					<div className="divider">
						<NavLink to='/seller' activeClassName="active">商家</NavLink>
					</div>
				</div>
				{this.props.children}
				<Shopcart minPrice='20' deliveryPrice='4' selectFoods={this.state.selectFoods}></Shopcart>

			</div>
		)
	}
}

let mapStateToProps = state => ({
	seller: state.Seller.seller,
	goods: state.Goods.goods
});

let mapDispatchToProps = dispatch => ({
	setGoods: bindActionCreators(setGoods, dispatch),
	setRatings: bindActionCreators(setRatings, dispatch),
	setSeller: bindActionCreators(setSeller, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);