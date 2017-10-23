import React from 'react';
import './header.less';
import Support from '../support/support.js';
import Star from '../star/star.js';
import '../../config/css/icon.less';

import Animate from 'rc-animate';
class Header extends React.Component {

		constructor(props) {
			super(props);
			this.state = {
				detailShow: false
			};
		}

		showDetail() {
			this.setState({
				detailShow: true
			});
		}

		hideDetail() {
				this.setState({
					detailShow: false
				});
			}
			// 详情设置
			// style={{display: this.state.detailShow ? 'inline-block' : 'none'}}
		render() {
				let seller = this.props.seller;
				let supportsList = [];
				if (seller && seller.supports && seller.supports.length !== 0) {
					supportsList = seller.supports.map((item, k) => {
						return <li key={k} className="support-item"><Support support={item} fontSize="12px" iconW="16px" iconH="16px"></Support></li>;
					});
				}
				return (
						<div className="header">

				<div className="header-wrapper">
					<div className="header-avatar">
						<img src={seller.avatar} width="64" height="64" alt=""/>
					</div>
					<div className="content-wrapper">

						<div className="title">
							<span className="brand"></span>
							<span className="name">{seller.name}</span>
						</div>
						<div className="desc">{seller.description}/{seller.deliveryTime}分钟送达</div>
						{
							seller && seller.supports && seller.supports.length !== 0
							? <div className="supports">
									<Support support = {seller.supports[0]} fontSize="10px" iconW="12px" iconH="12px"></Support>
							</div>
							: null
						}
					</div>
					{
						seller && seller.supports &&seller.supports.length !== 0 
						 ? <div className="supports-wrapper" onClick={this.showDetail.bind(this)}>
							<span className="count">{seller.supports.length}个</span>
							<i className="icon-keyboard_arrow_right"></i>
						</div> : null
					}
				</div>
				<div className="bulletin-wrapper">
					<span className="bulletin"></span>
					<span className="title">{seller.bulletin}</span>
					<i className="icon-keyboard_arrow_right" onClick={this.showDetail.bind(this)}></i>
				</div>
				<div className="bgImage">
					<img src={seller.avatar} alt="" />
				</div>
				
				<Animate transitionName="fade" showProp='data-show'>
				<div className={`detail-wrapper ${this.state.detailShow?'show' :''}`} data-show={this.state.detailShow}>
					<div className="content-wrapper clearfix">
						<div className="content">
							<div className="name">{seller.name}</div>
							<div className="star-wrapper">
								<Star type='header' score={seller.score} size='48'></Star>
							</div>
							<div className="divider">
								<div className="line"></div>
								<div className="text">优惠信息</div>
								<div className="line"></div>
							</div>

							<ul className="supports-list">
								{supportsList}
							</ul>
							

							<div className="divider">
								<div className="line"></div>
								<div className="text">商家公告</div>
								<div className="line"></div>
							</div>
							<div className="bulletin">
								<p className="content-text">{seller.bulletin}</p>
							</div>
						</div>
					</div>
					<div className="close-wrapper" onClick={this.hideDetail.bind(this)}>
						<i className="icon-close"></i>
					</div>
				</div>
				</Animate>
			< /div>
		)
	}
}

export default Header;