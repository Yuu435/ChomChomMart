import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen({ match, history }) {
	const userId = match.params.id;

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const { loading, user, error } = useSelector((state) => state.userDetails);

	const { userInfo } = useSelector((state) => state.userLogin);

	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = useSelector((state) => state.userUpdate);

	useEffect(() => {
		if (!userInfo || !userInfo.isAdmin) {
			history.push('/login');
		}

		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push('/admin/userList');
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [user, dispatch, userId, successUpdate, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ _id: userId, name, email, isAdmin }));
	};

	return (
		<>
			<Link to='/admin/userList' className='btn btn-light my-3'>
				Quay lại
			</Link>
			<FormContainer>
				<h1>Chỉnh sửa người dùng</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						{/* EMAIL */}
						<Form.Group controlId='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								placeholder='Nhập email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}></Form.Control>
						</Form.Group>
						{/*NAME*/}
						<Form.Group controlId='name'>
							<Form.Label>Tên</Form.Label>
							<Form.Control
								type='name'
								placeholder='Nhập tên'
								value={name}
								onChange={(e) => setName(e.target.value)}></Form.Control>
						</Form.Group>
						{/* PASSWORD */}
						<Form.Group controlId='isAdmin'>
							<Form.Check
								type='checkbox'
								label='Là Admin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Cập nhật
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
}
