import React from 'react';
import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux';
import {
	userLogin
} from '../actions/User.js';
import './app.less';

import Goods from '../components/goods.js';
import Ratings from '../components/ratings.js';
import Seller from '../components/seller.js';

import {
	BrowserRouter,
	Route,
	NavLink
} from 'react-router-dom';

class App extends React.Component {

	componentDidMount() {
		console.log('app componentDidMount');
		console.log(this.props);
		const {
			userLogin
		} = this.props;
		userLogin(true);

	}

	render() {
		return (
			<div>
				我是App
				<div className="divider">
					<div className="split">
						<NavLink exact to="/" activeClassName="active">hello</NavLink>
					</div>
					<div className="split">
						<NavLink to="/ratings" activeClassName="active">评论</NavLink>
					</div>
					<div className="split">
						<NavLink to="/seller" activeClassName="active">商家</NavLink>
					</div>

				</div>
				{this.props.children}

			</div>
		)
	}
}

let mapStateToProps = state => ({
	User: state.User,
	Home: true
});

let mapDispatchToProps = dispatch => ({
	userLogin: bindActionCreators(userLogin, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);