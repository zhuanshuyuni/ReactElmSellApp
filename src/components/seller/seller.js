import React from 'react';
import './seller.less';
import BScroll from 'better-scroll';
import Divider from '../divider/divider.js';
import Support from '../support/support.js';
import Star from '../star/star.js';
import {
	saveSellerToLocal,
	loadSellerFromLocal
} from '../../common/tool/helper.js';

import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux';

class Seller extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			favorite: false
		}
	}

	componentDidMount() {
		window.setTimeout(() => {
			if (this.scroll) {
				this.scroll.refresh();
			} else {
				this.scroll = new BScroll(this.refs.sellerWrapper, {
					click: true
				});
			}
		}, 0);

		this.calculatePicsWrapperWidth();

		this.setState({
			favorite: loadSellerFromLocal('2', 'favorite', false)
		});
	}
	calculatePicsWrapperWidth() {
		let seller = this.props.seller; // this.props.location.query;
		let width = 120;
		let space = 6;

		let picWidth = seller && seller.pics && seller.pics.length > 0 ? (width + space) * seller.pics.length - space : 0;
		this.refs.picList.style.width = picWidth + 'px';
		if (this.picScroll) {
			this.picScroll.refresh();
		} else {
			this.picScroll = new BScroll(this.refs.picWrapper, {
				scrollX: true,
				eventPassthrough: 'vertical'
			});
		}
	}


	favoriteSeller() {

		let seller = this.props.seller; // this.props.location.query;

		saveSellerToLocal('2', 'favorite', !this.state.favorite);

		this.setState({
			favorite: !this.state.favorite
		});

	}


	render() {
		let seller = this.props.seller; // this.props.location.query;

		return (
			<div className='seller-wrapper' ref='sellerWrapper'>
				<div className="seller">
					<div className="content">
						<div className="top">
							<p className="name">{seller && seller.name}</p>
							<div className="wrapper">
								<div className="star">
									<Star score={seller && seller.score} size='36'/>
								</div>
								<span className="count ratingCount">({seller && seller.ratingCount})</span>
								<span className="count">月售{seller && seller.sellCount}单</span>
							</div>
							<div className="collection" onClick={this.favoriteSeller.bind(this)}>
								<i className={`icon-favorite ${this.state.favorite ? 'favorite' : ''}`}></i>
								<div className="text">{this.state.favorite? '已收藏': '收藏'}</div>
			
							</div>
						</div>
						<div className="bottom">
							<div className="remark">
								<div className="title">起送价</div>
								<span className="number">{seller && seller.minPrice}<span className="yuan">元</span></span>
							</div>
							<div className="remark">
								<div className="title">商家配送</div>
								<span className="number">{seller && seller.deliveryPrice}<span className="yuan">元</span></span>
							</div>
							<div className="remark last">
								<div className="title">平均配送事件</div>
								<span className="number">{seller && seller.deliveryTime}<span className="yuan">元</span></span>
							</div>
						</div>
					</div>
					<Divider></Divider>
					<div className="bulletin">
						<h1 className="title">公告与活动</h1>
						<p className="text">{seller && seller.bulletin}</p>
						<ul>
							{
								seller && seller.supports && seller.supports.length ? seller.supports.map((item, index) => {
									return <li className='item' key={index}>
										<Support className='support' support={item} color='true' fontSize="12px" iconW="16px" iconH="16px"></Support>
									</li>	
								}) :[]
							}
						</ul>
					</div>

					<Divider></Divider>
					<div className="pictures">
						<h1 className="title">商家实景</h1>
						<div className="picswrapper" ref='picWrapper'>
							<ul ref='picList'>
								{
									seller && seller.pics && seller.pics.length>0 ? seller.pics.map((pic, index) => {
										return <li key={index} className='item'><img src={pic} alt=""/></li>
									} ):[]
								}
							</ul>
						</div>
						
					</div>

					<Divider></Divider>
					<div className="sellerInfo">
						<h1 className="title">商家信息</h1>
						<ul className='infoList'>
							{
								seller && seller.infos && seller.infos.length>0 ? seller.infos.map((info, index) => {
									return <li key={index} className='item'><p className="text">{info}</p></li>
								} ):[]
							}
						</ul>
					</div>

				</div>
			</div>
		)
	}
}


let mapStateToProps = state => ({
	seller: state.Seller.seller
});

let mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Seller);