import React from 'react';
import axios from 'axios';
import {
	BrowserRouter,
	Route
} from 'react-router-dom';
import {
	Provider
} from 'react-redux';

import App from '../app/app.js';
import Goods from '../goods/goods.js';
import Ratings from '../ratings/ratings.js';
import Seller from '../seller/seller.js';
import '../../config/css/reset.css';

class Root extends React.Component {

	render() {

		const {
			store
		} = this.props;

		return (
			<Provider store={store}>
				<BrowserRouter>
					<Route render={
						(props) => {
							return(
									<App>
										<Route exact path="/" component={Goods}></Route>
										<Route path="/ratings" component={Ratings}></Route>
										<Route path="/seller" component={Seller}></Route>
									</App>
								)
							}
						}>
					</Route>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default Root;