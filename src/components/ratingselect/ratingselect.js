import React from 'react';
import './ratingselect.less';
import PubSub from 'pubsub-js';

class RatingSelect extends React.Component {


	constructor(props) {
		super(props);
		this.all = 2;
		this.positive = 1;
		this.negative = 0;
	}
	selectType(type) {
		if (type == this.props.selectType) {
			return;
		}
		PubSub.publish('selectType', type);
	}
	toggleContent() {
		PubSub.publish('onlyContent');
	}
	render() {
		let positiveCount = 0;
		let negativeCount = 0;
		this.props.ratings && this.props.ratings.map((rating) => {
			rating.rateType === 1 ? positiveCount++ : negativeCount++;
		});

		return (
			<div className='ratingselect'>
				<div className="select-type">
					<span className={`type all ${this.props.selectType == this.all ? 'active' : ''}`} onClick={this.selectType.bind(this, this.all)}>{this.props.desc.all}
						<span className="count">{this.props.ratings && this.props.ratings.length}</span>	
					</span>
					<span className={`type positive ${this.props.selectType == this.positive ? 'active' : ''}`} onClick={this.selectType.bind(this, this.positive)}>{this.props.desc.positive}
						<span className="count">{positiveCount}</span>
					</span>
					<span className={`type negative ${this.props.selectType == this.negative ? 'active' : ''}`} onClick={this.selectType.bind(this, this.negative)}>{this.props.desc.negative}
						<span className="count">{negativeCount}</span>
					</span>
				</div>
				<div className="select-content" onClick={this.toggleContent.bind(this)}>
					<i className={`icon-check_circle ${this.props.onlyContent ? 'only' : ''}`}></i>
					<span className="text">只看有内容的评价</span>
				</div>
			</div>
		)
	}
}

export default RatingSelect;