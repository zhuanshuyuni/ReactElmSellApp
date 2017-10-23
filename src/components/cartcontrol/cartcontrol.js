import React from 'react';
import './cartcontrol.less';
import PubSub from 'pubsub-js';

class CartControl extends React.Component {

		add(event) {
			event.stopPropagation(); // 阻止冒泡
			PubSub.publish('addFood', this.props.food);
		}

		decrease(event) {
			event.stopPropagation(); // 阻止冒泡
			PubSub.publish('decreaseFood', this.props.food);
		}

		render() {
				let food = this.props.food;
				return (
						<div className="cartcontrol">
						{
						food && food.count && food.count > 0 ?
						<div className="cart-decrease icon-remove_circle_outline" onClick={this.decrease.bind(this)}></div> : null
					}
					
					{
						food && food.count && food.count > 0 ?
						<div className="cart-count">{food.count}</div> : null
					}
					<div className="cart-add icon-add_circle" onClick={this.add.bind(this)}></div>

			< /div>
		)
	}
}

export default CartControl;