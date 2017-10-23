import React from 'react';
import './food.less';
import Divider from '../divider/divider.js';
import CartControl from '../cartcontrol/cartcontrol.js';
import PubSub from 'pubsub-js';

import BScroll from 'better-scroll';
import RatingSelect from '../ratingselect/ratingselect.js';
import formatterData from '../../common/tool/helper.js';
import Animate from 'rc-animate';

class Food extends React.Component {

	constructor(props) {
		super(props);

		this.all = 2;
		this.positive = 1;
		this.negative = 0;
		this.state = {
			showFlag: false,
			onlyContent: false,
			type: this.all
		}
		this.desc = {
			all: '全部',
			positive: '推荐',
			negative: '吐槽'
		}
	}

	componentDidMount() {

		PubSub.subscribe('selectType', this.selectType.bind(this));
		PubSub.subscribe('onlyContent', this.onlyContent.bind(this));
		this.setState({
			showFlag: true,
			onlyContent: false,
			type: this.all
		});
	}
	componentWillUnmount() {
		PubSub.unsubscribe("selectType");
		PubSub.unsubscribe("onlyContent");
	}
	componentDidUpdate() {

		if (this.props.selectFood) {

			if (this.foodScroll) {
				this.foodScroll.refresh();
			} else {
				this.foodScroll = new BScroll(this.refs.wrapper, {
					click: true
				});
			}
		}
	}
	show() {
		// this.setState({
		// 	showFlag: true,
		// 	onlyContent: false,
		// 	type: this.all
		// });
	}
	back() {
		// this.setState({
		// 	showFlag: false
		// });
		this.props.hide();
	}
	addToShopCart(event) {

		event.stopPropagation(); // 阻止冒泡
		PubSub.publish('addFood', this.props.selectFood);
	}
	selectType(meg, type) {
		this.setState({
			type: type
		});
	}
	onlyContent(meg) {

			this.setState({
				onlyContent: !this.state.onlyContent
			});
		}
		// style={{'display': (!food.count || (food.count && food.count === 0)) ? 'block' : 'none'}}
	render() {
		let food = this.props.selectFood; //this.food;
		let positiveArr = [];
		let negativeArr = [];
		this.props.ratings && this.props.ratings.map((rating, index) => {
			rating.rateType === 1 ? positiveArr.push(rating) : negativeArr.push(rating);
		});
		// style={{'display': this.state.showFlag ? 'block' : 'none'}} 
		return (
			<div className='food' ref='wrapper'>
				<div className='content'>
					<div className="header-wrapper">
						<img src={food.image} alt=""/>
						<div className="back" onClick={this.back.bind(this)}>
							<i className="icon-arrow_lift"></i>
						</div>
					</div>

					<div className="info-wrapper">
						<div className="name">{food.name}</div>
						<div className="countRating">
							<span className="count">月售{food.sellCount}份</span>
							<span className="rating">好评率{food.rating}%</span>
						</div>
						<div className="priceWrapper">
							<span className="new">¥{food.price}</span>
							{
								food.oldPrice ? 
								<span className="old">¥{food.oldPrice}</span> : null
							}
						</div>

						<Animate transitionName="fade">
							{
							!food.count || (food.count && food.count === 0) ?<div className="addToCart" onClick={this.addToShopCart.bind(this)}>加入购物车</div>:null
							}
						</Animate>

						<div className="cartcontrolWrapper" style={{'display': (!food.count || (food.count && food.count === 0)) ? 'none' : 'block'}}>
							<CartControl food={food} ></CartControl>
						</div>
							
					</div>
					
					<Divider></Divider> 
					<div className="desc-wrapper">
						<h1 className="title">商品简介</h1> 
						<p className="desc"> {food.description} </p> 
					</div>

					<Divider></Divider> 

					<div className="ratings-wrapper">
						<h1 className="title">商品评价</h1>
						<div className="ratingselect-wrapper">
							<RatingSelect desc={this.desc} selectType={this.state.type} onlyContent={this.state.onlyContent} ratings={food.ratings ? food.ratings : []}></RatingSelect>
						</div>
						<div className="ratings">
							<ul style={{'display': food.ratings && food.ratings.length>0?'block':'none'}}>
								{
									food.ratings ? food.ratings.map((rating, index) => {
										return <li className='item' key={index} style=
										{{'display': this.state.onlyContent&&!rating.text?'none':(this.state.type == this.all ? 'block' : (this.state.type == rating.rateType ? 'block' : 'none'))}}>

											<div className="time">{formatterData(rating.rateTime)}</div>
											<div className="content">
												<span className={`thumb ${rating.rateType == 0 ? 'icon-thumb_down' : 'icon-thumb_up'}`}></span>
												<span className="text">{rating.text}</span>

											</div>
											<div className="user-info">
												<span className="username">{rating.username}</span>
												<img src={rating.avatar} alt="" style={{'width': '12px','height':'12px'}}/>
											</div>
										</li>
									}) :[]
								}
							</ul>
							<div className="norating" style={{'display': !food.ratings || food.ratings.length==0?'block':'none'}}>暂无评价</div>
						</div>
					</div>

			    </div>
			</div>
		)
	}
}

export default Food;