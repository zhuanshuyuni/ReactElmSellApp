import React from 'react';
import './goods.less';
import axios from 'axios';
import BScroll from 'better-scroll';
import CartControl from '../cartcontrol/cartcontrol.js';
import PubSub from 'pubsub-js';
import Shopcart from '../shopcart/shopcart.js';
import Food from '../food/food.js';

import Animate from 'rc-animate';

import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux';

class Goods extends React.Component {

		constructor(props) {
			super(props);
			this.state = {
				refreshSelf: false,
				showFoodComponent: false
			}
			this.selectFood = {};
			this.oldIndex = 0;
			this.heights = [];
			this.scorlling = false;
			this.supportClasses = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
		}

		componentDidMount() {
			this.oldIndex = 0;
			this.initScroll();
			PubSub.subscribe('refreshGoods', this.refreshGoods.bind(this));
		}

		// 组件渲染完毕
		componentDidUpdate() {
				this.initScroll();
			}
			// 解绑监听
		componentWillUnmount() {
			PubSub.unsubscribe("refreshGoods");
		}
		refreshGoods() {
				this.setState({
					refreshSelf: true
				});
			}
			// 初始化scroll
		initScroll() {

				this.calculateHeight();

				if (this.leftScroll) {
					this.leftScroll.refresh();
				} else {
					this.leftScroll = new BScroll(this.refs.leftWrapper, {
						click: true
					});
				}
				if (this.rightScroll) {
					this.rightScroll.refresh();
				} else {
					this.rightScroll = new BScroll(this.refs.rightWrapper, {
						probeType: 3,
						click: true
					});

					let item = this.refs.leftWrapper ? this.refs.leftWrapper.getElementsByClassName('left-item')[0] : null;
					if (item) {

						item.className = 'left-item selectItem';
					}
				}
				this.rightScroll.on('scroll', (position) => {
					if (this.scorlling) {
						return;
					}
					let index = this.calculateCurrentIndex(Math.abs(Math.round(position.y)));

					let itemArr = this.refs.leftWrapper ? this.refs.leftWrapper.getElementsByClassName('left-item') : [];

					for (var i = 0; i < itemArr.length; i++) {
						let item = itemArr[i];
						if (index === i) {
							item.className = 'left-item selectItem';

						} else {
							item.className = 'left-item';
						}
					}

				});
				this.rightScroll.on('scrollEnd', (position) => {
					console.log('scrollEnd');
					this.scorlling = false;
				});

			}
			// 计算高度
		calculateHeight() {
				let foodListArr = this.refs.rightWrapper ? this.refs.rightWrapper.getElementsByClassName('right-item') : [];

				let height = 0;
				let heightArr = [];
				heightArr.push(height);
				for (var i = 0; i < foodListArr.length; i++) {
					let goodItem = foodListArr[i];
					height += goodItem.clientHeight;
					heightArr.push(height);
				}
				this.heights = heightArr;
			}
			// 计算当前索引
		calculateCurrentIndex(y) {
				for (var i = 0; i < this.heights.length; i++) {
					let height1 = this.heights[i];
					let height2 = this.heights[i + 1];
					if (!height2 || (y >= height1 && y < height2)) {
						return i;
					}
				}
				return 0;
			}
			// 点击左侧菜单栏
		clickLeftItem(index, e) {
			this.oldIndex = index;
			this.scorlling = true;
			let itemArr = this.refs.leftWrapper ? this.refs.leftWrapper.getElementsByClassName('left-item') : [];
			for (var i = 0; i < itemArr.length; i++) {
				let item = itemArr[i];
				if (this.oldIndex === i) {
					item.className = 'left-item selectItem';

				} else {
					item.className = 'left-item';
				}
			}
			let foodListArr = this.refs.rightWrapper.getElementsByClassName('right-item');
			this.rightScroll.scrollToElement(foodListArr[index], 300);
		}

		showFoodDetail(food) {
			this.selectFood = food;
			this.setState({
				showFoodComponent: true
			});
		}

		hideFoodDetail() {
			this.selectFood = {};
			this.setState({
				showFoodComponent: false
			});
		}
		render() {

			let leftMenuArr = [];
			leftMenuArr = this.props.goods.map((good, index) => {
					return ( < li className = {
							`left-item ${index == this.oldIndex? 'selectItem':''}`
						}
						key = {
							index
						}
						onClick = {
							this.clickLeftItem.bind(this, index)
						} >
						<span className="name">
					{
						good.type > -1 ? <span className={`support ${this.supportClasses[good.type]}`}></span> :null
					}
					{good.name}</span> < /li>);
					});
				let foodsArr = []; this.props.goods.map((good) => {
					let currentArr = [];
					currentArr = good.foods.map((food, index) => {
						return (
							<li className="food-item" key={index} onClick={this.showFoodDetail.bind(this, food)}>
					<div className="icon-wrapper">
						<img src={food.icon} alt="" />
					</div>
					<div className="content-wrapper">
						<p className="name">{food.name}</p>
						{
							food.description ?
							<p className="description">{food.description}</p> : null
						}
						<div className="count-rating">
							<span className="count">月售{food.sellCount}份</span>
							<span className="rating">好评率{food.rating}%</span>
						</div>
						<div className="price-wrapper">
							<span className="new">¥{food.price}</span>
							{
								food.oldPrice ? 
								<span className="old">¥{food.oldPrice}</span> : null
							}
						</div>

						<div className="cartcontrol-wrapper">
							<CartControl food={food}></CartControl>
						</div>
					</div>
				</li>
						);
					});
					foodsArr.push(currentArr);
				});

				let rightMenuArr = []; rightMenuArr = this.props.goods.map((good, index) => {
					return (
						<li key={index} className="right-item">
				<h1 className="title">{good.name}</h1>
				<ul className="food-wrapper">
					{foodsArr[index]}
				</ul>
			</li>
					);
				});

				return (
					<div className='goods-wrappper'>
			<div className="goods-left" ref="leftWrapper">
				<ul>
					{leftMenuArr}
				</ul>
			</div>
			<div className="goods-right" ref="rightWrapper">
				<ul>
					{rightMenuArr}
				</ul>
			</div>
			<Animate transitionName="move">
			{
			this.state.showFoodComponent ? <Food selectFood={this.selectFood} hide={this.hideFoodDetail.bind(this)} ref='foodDetail'></Food> : null
			}
			</Animate>
		</div>
				)
			}
		}



		let mapStateToProps = state => ({
			goods: state.Goods.goods
		});

		let mapDispatchToProps = dispatch => ({

		});

		export default connect(mapStateToProps, mapDispatchToProps)(Goods);