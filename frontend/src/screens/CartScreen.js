import React, { useEffect } from 'react';
import {
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';
import { formatter } from '../utils';

export default function CartScreen({ match, location, history }) {
	const productId = match.params.id;

	//location for ?quantity=1
	const quantity = location.search ? +location.search.split('=')[1] : 1;

	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.cart);

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, quantity));
		}
	}, [dispatch, productId, quantity]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Giỏ hàng</h1>
				{cartItems.length === 0 ? (
					<Message>
						Giỏ của bạn đang trống<Link to='/'>Quay lại</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>{formatter.format(item.price)}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.quantity}
											onChange={(e) =>
												dispatch(addToCart(item.product, +e.target.value))
											}>
											{[...Array(item.countInStock).keys()].map((k) => (
												<option key={k + 1} value={k + 1}>
													{k + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Hiện có:&nbsp;
								{cartItems.reduce((acc, item) => acc + item.quantity, 0)} sản phẩm
							</h2>
							{formatter.format(
								cartItems
									.reduce((acc, item) => acc + item.quantity * item.price, 0)
									.toFixed(2)
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.length < 1}
								onClick={checkoutHandler}>
								Thanh toán
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
}
