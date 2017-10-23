import React from 'react';
import './shopcart.less';
import BScroll from 'better-scroll';
import PubSub from 'pubsub-js';
import CartControl from '../cartcontrol/cartcontrol.js';

import Animate from 'rc-animate';
class Shopcart extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fold: true
		};
		this.totalPrice = 0;
		this.totalCount = 0;
	}
	componentDidUpdate() {

		if (!this.state.fold) {
			if (this.foodScroll) {
				this.foodScroll.refresh();
			} else {
				this.foodScroll = new BScroll(this.refs.foodWrapper, {
					click: true
				});
			}
		}

	}
	componentWillReceiveProps(newProps) {
		let totalPrice = 0;
		let totalCount = 0;
		newProps.selectFoods.map((food) => {
			totalPrice += food.count * food.price;
			totalCount += food.count;
		});
		this.totalPrice = totalPrice;
		this.totalCount = totalCount;
		if (totalCount === 0) {
			this.setState({
				fold: true
			});
		}
	}
	goSettlement() {
		if (this.totalPrice >= this.props.minPrice) {
			alert(`总费用${this.totalPrice}`);
		}
	}

	caculatuDistribution(price) {
		if (price === 0) {
			return `¥${this.props.minPrice}起送`;
		} else if (price < this.props.minPrice) {
			let difference = this.props.minPrice - price;
			return `还差¥${difference}元`;
		} else {
			return '去结算';
		}
	}
	toggleFoodsList() {
		if (this.totalCount === 0) {
			return;
		}
		this.setState({
			fold: !this.state.fold
		});
	}

	empty(event) {

		event.stopPropagation(); // 阻止冒泡
		PubSub.publish('emptyShopcart');
	}

	hideFoodsList() {
			this.setState({
				fold: true
			});
		}
		// 购物车列表
		// style={{display: (this.totalCount > 0 && !this.state.fold) ? 'block' : 'none'}}
	render() {
		return (
			<div>
				<div className='shopcart'>
					<div className="content">
						<div className="shopcart-left" onClick={this.toggleFoodsList.bind(this)}>
							<div className="logo-wrapper">
								<div className="logo">
									<i className={`icon-shopping_cart ${this.totalCount > 0 ? 'active' : ''}`}></i>
								</div>
								{
									this.totalCount > 0 ? <div className="count">{this.totalCount}</div> : null
								}
								
							</div>
							<div className="price">¥{this.totalPrice}</div>
							<div className="deliveryPrice">另需配送费¥{this.props.deliveryPrice}元</div>
						</div>
						<div className={`shopcart-right ${this.totalPrice >= this.props.minPrice ? 'enough' : null}`} onClick={this.goSettlement.bind(this)}>{this.caculatuDistribution(this.totalPrice)}</div>
					</div>

					<Animate transitionName="fold" showProp='data-show'>
						<div className={`shopList ${(this.totalCount > 0 && !this.state.fold) ? 'show' : ''}`} data-show={this.totalCount > 0 && !this.state.fold}>
							<div className="shop-top">
								<div className="shopping-cart">购物车</div>
								<div className="clear" onClick={this.empty.bind(this)}>清空</div>
							</div>
							<div className='list' ref="foodWrapper">
								<ul>
									{
										this.props.selectFoods.map((food, index) => {
											return <li className='item' key={index}>
												<div className="name">{food.name}</div>
												<div className="price">¥{food.count * food.price}</div>
												<div className="cartcontrol-wrapper"><CartControl food={food}></CartControl></div>
											</li>
										})
									}
								</ul>
							</div>
						</div> 
					
			        </Animate>
					
				</div>

				<Animate transitionName="fade">
				{
					this.totalCount > 0 && !this.state.fold ? <div className="cartcontrol-bg" onClick={this.hideFoodsList.bind(this)}></div> : null
				}
			    </Animate>
				
			</div>
		)
	}
}

export default Shopcart;