import React from 'react';
import './support.less';

class Support extends React.Component {


	componentWillMount() {

		this.setState({
			supportClasses: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
		});
	}

	render() {

		return (
			<div>
					<span className={`support ${this.state.supportClasses[this.props.support.type]}`} style={{'width':this.props.iconW, 'height': this.props.iconH}}></span>
				<span className={`desc ${this.props.color ? 'customColor' : ''}`} style={{"fontSize": this.props.fontSize}}>{this.props.support.description}</span>
			</div>
		)
	}
}

export default Support;