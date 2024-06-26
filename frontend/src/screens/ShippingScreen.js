import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history.push('/payment');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label>Địa chỉ</Form.Label>
					<Form.Control
						type='text'
						placeholder='Nhập địa chỉ'
						value={address}
						required
						onChange={(e) => setAddress(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId='city'>
					<Form.Label>Thành phố</Form.Label>
					<Form.Control
						type='text'
						placeholder='Nhập thành phố'
						value={city}
						required
						onChange={(e) => setCity(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId='postalCode'>
					<Form.Label>Mã bưu điện</Form.Label>
					<Form.Control
						type='text'
						placeholder='Nhập mã bưu điện'
						value={postalCode}
						required
						onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId='country'>
					<Form.Label>Quốc gia</Form.Label>
					<Form.Control
						type='text'
						placeholder='Nhập quốc gia'
						value={country}
						required
						onChange={(e) => setCountry(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Tiếp tục
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
