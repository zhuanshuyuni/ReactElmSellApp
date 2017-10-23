import React from 'react';
import './ratings.less';

import axios from 'axios';
import BScroll from 'better-scroll';
import Divider from '../divider/divider.js';
import Star from '../star/star.js';
import RatingSelect from '../ratingselect/ratingselect.js';
import formatterData from '../../common/tool/helper.js';


import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux';

class Ratings extends React.Component {

	constructor(props) {
		super(props);

		this.all = 2;
		this.positive = 1;
		this.negative = 0;
		this.state = {
			onlyContent: false,
			type: this.all
		}
		this.desc = {
			all: '全部',
			positive: '满意',
			negative: '不满意'
		}
	}
	componentDidMount() {

		this.initScroll();
		PubSub.subscribe('selectType', this.selectType.bind(this));
		PubSub.subscribe('onlyContent', this.onlyContent.bind(this));


	}
	initScroll() {
		window.setTimeout(() => {
			if (this.scroll) {
				this.scroll.refresh();
			} else {
				this.scroll = new BScroll(this.refs.ratingWrapper, {
					click: true
				});
			}
		}, 0);
	}
	componentWillUnmount() {

		PubSub.unsubscribe("selectType");
		PubSub.unsubscribe("onlyContent");
	}
	componentDidUpdate() {

		this.initScroll();
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

	render() {
		let seller = this.props.seller; // this.props.location.query ? this.props.location.query.seller : {};

		return (
			<div className='rating-wrapper' ref='ratingWrapper'>
				<div className="rating">
					<div className="content">
						<div className="left">
							<div className="number">{seller.score}</div>
							<div className="title">综合评分</div>
							<div className='rank'>高于周边商家{seller.rankRate}%</div>
						</div>
						<div className="right">
							<div className="score-wrapper">
								<span className='title'>服务态度</span>
								<span className="star">
								<Star size='36' score={seller.serviceScore}></Star></span>
								<span className="score">{seller.serviceScore}</span>
							</div>
							<div className="score-wrapper">
								<span className='title'>商品评分</span>
								<span className="star">
								<Star size='36' score={seller.foodScore}></Star></span>
								<span className="score">{seller.foodScore}</span>
							</div>
							<div className="score-wrapper">
								<span className='title'>送达时间</span>
								<span className="time">{seller.deliveryTime}分钟</span>
							</div>
						</div>
					</div>
					<Divider></Divider>

					<div className="ratingselect-wrapper">
						<RatingSelect desc={this.desc} selectType={this.state.type} onlyContent={this.state.onlyContent} ratings={this.props.ratings} type='rating'></RatingSelect>
					</div>

					<ul className="ratingsList">
						{
							this.props.ratings.map((rating, index) => {
								return <li className="item" key={index} style=
										{{'display': this.state.onlyContent&&!rating.text?'none':(this.state.type == this.all ? 'flex' : (this.state.type == rating.rateType ? 'flex' : 'none'))}}>
									<div className="logo">
										<img src={rating.avatar} alt="" style={{'width':'28px', 'height':'28px'}}/>
									</div>
									<div className="content-wrapper">
										<p className="username">{rating.username}</p>
										<Star size='36' score={rating.score}></Star>
										<p className="text">{rating.text}</p>
										<div className="time">{formatterData(rating.rateTime)}</div>

										<div className="recommend-wrapper">
										<div className="commend-left">

											<i className={`thump ${rating.rateType == 0 ? 'icon-thumb_down' : 'icon-thumb_up'}`}></i>
										</div>
										<div className="commend-right">
											{
												rating.recommend.map((commend, index) => {
													return <span className="commend" key={index}>{commend}</span>
												})
											}
											</div>

										</div>

									</div>

			
								</li>

							})
						}

					</ul>

				</div>
			</div>
		)
	}
}

let mapStateToProps = state => ({
	seller: state.Seller.seller,
	ratings: state.Ratings.ratings
});

let mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Ratings);