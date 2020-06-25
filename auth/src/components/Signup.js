import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../index.css'
import { Form, Input, Button, Modal } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'

const layout = {
	labelCol: {
		span: 4,
	},
	wrapperCol: {
		span: 16,
	},
};

const tailLayout = {
	wrapperCol: {
		offset: 4,
		span: 16,
	},
};



class Signup extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			isSucceed: false,
			modalfalse: {
				display: false,
				content: "",
			},
			modalsuccess: {
				display: false,
			},
		}
		this.onFinish = this.onFinish.bind(this);
		let that = this;
		axios.interceptors.response.use(function (response) {
			return response;
		}, function (error) {
			console.log(error)
			that.showErrMessage()
			// Trow errr again (may be need for some other catch)
			return Promise.reject(error);
		});
	}

	showErrMessage() {
		this.setState({
			modalfalse: {
				display: true,
				content: "Something's wrong. Please retry later"
			}
		})
	}

	async onFinish(values) {
		let data = await axios.get('http://localhost:3000/users')
		let users = data.data;
		const newUser = { username: values.username, password: values.password };
		const found = users.filter(user => user.username === newUser.username)
		if (found.length === 0) {
			users.push(newUser);
			axios.post(`http://localhost:3000/users`, { ...newUser });
			this.setState({
				modalsuccess: {
					display: true,
				},
			})
		} else {
			this.setState({
				modalfalse: {
					display: true,
					content: "This username already exists. Please choose another username"
				}
			})
		}

	};

	handleCancel = e => {
		this.setState({
			modalfalse: {
				display: false,
				content: ''
			}
		});
	};

	render() {
		return (
			<div className="container login-home">
				<Form
					{...layout}
					name="basic"
					initialValues={{
						remember: true,
					}}
					onFinish={this.onFinish}
					onFinishFailed={this.onFinishFailed}
				>
					<Form.Item
						label="Username"
						name="username"
						rules={[
							{
								required: true,
								message: 'Please input your username!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},

						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name="confirm"
						label="Confirm Password"
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Please confirm your password!',
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject('The two passwords that you entered do not match!');
								},
							}),
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
							Submit
            </Button>
					</Form.Item>
				</Form>
				<Modal
					title="Something's wrong"
					visible={this.state.modalfalse.display}
					onOk={this.onFinish}
					onCancel={() => this.handleCancel('modal1')}
					footer={[
						<Button key="back" onClick={this.handleCancel}>
							OK
						</Button>
					]}
				>
					<p>{this.state.modalfalse.content}</p>
				</Modal>
				<Modal
					title="Success"
					visible={this.state.modalsuccess.display}
					footer={[
						<Button key="back">
							<Link to='/login'>
								Login
							</Link>
						</Button>
					]}
				>
					<p>Success!</p>
				</Modal>
			</div>
		);
	}
}

export default Signup;