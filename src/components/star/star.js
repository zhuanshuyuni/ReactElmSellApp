import React from 'react';
import './star.less';

class Star extends React.Component {

	constructor(props) {
		super(props);

		this.count = 5;
		this.starType = '';
		this.classes = [];

		this.satrUpdate = this.satrUpdate.bind(this);
	}
	componentWillMount() {
		this.satrUpdate(this.props);
	}
	componentWillReceiveProps(newProps) {
		this.satrUpdate(newProps);
	}
	satrUpdate(newProps) {

		let result = [];
		let score = Math.floor(newProps.score * 2) / 2.0; // 向下取0.5倍数

		let hasDecimal = score % 1 !== 0; // 有小数

		let integer = Math.floor(score);

		for (var i = 0; i < integer; i++) {
			result.push('on');
		}
		if (hasDecimal) {
			result.push('half');
		}
		while (result.length < this.count) {
			result.push('off');
		}

		this.classes = result;
		this.starType = `starType_${this.props.size}`;

	}



	render() {
		return (
			<div className={this.starType}>
				{
					this.classes.map((classN, index) => {
						return <span key={index} className={`star-item ${classN}`}></span>
					})
				}
				
			</div>
		)
	}
}

export default Star;