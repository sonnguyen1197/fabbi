import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../index.css'
import { Form, Input, Button, Checkbox, Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'

const layout = {
	labelCol: {
		span: 4,
	},
	wrapperCol: {
		span: 16,
	},
};

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

const tailLayout = {
	wrapperCol: {
		offset: 4,
		span: 16,
	},
};

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: false,
			modal1: false,
			modal2: false,
			loading: false
		}
		this.onFinish = this.onFinish.bind(this);
		let that = this;
		axios.interceptors.response.use(function (response) {
			return response;
		}, function (error) {
			console.log(error)
			that.showMessage()
			// Trow errr again (may be need for some other catch)
			return Promise.reject(error);
		});
	};

	showMessage() {
		this.setState({ modal1: true, loading: false })
	}
	getUsers() {
		return axios.get('http://localhost:3000/users')
			.then(res => res)
			.catch(err => err)
	}

	componentDidMount() {
		let auth = localStorage.getItem("auth") ? true : false;
		this.setState({ login: auth })
	};

	async onFinish(values) {
		this.setState({ loading: true, modal1: false, });
		const data = await this.getUsers();
		const users = data.data
		if (users) {
			for (let user of users) {
				if (user.username === values.username && user.password === values.password) {
					localStorage.setItem('auth', true);
					this.setState({ login: true })
					break;
				}
				else {
					this.setState({ loading: false, modal2: true })
				}
			}
		}
	};

	onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	showModal = () => {
		this.setState({
			modal1: true,
		});
	};

	handleOk = e => {
		console.log(e);
		this.setState({
			modal1: false,
		});
	};

	handleCancel = (modal) => {
		this.setState({
			[modal]: false
		})
	};

	render() {
		const { login } = this.state;
		if (login !== true) {
			return (
				<div className="container login-home">
					<Spin indicator={antIcon} spinning={this.state.loading} >
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
							<Form.Item {...tailLayout} name="remember" valuePropName="checked">
								<Checkbox>Remember me</Checkbox>
							</Form.Item>
							<div>
								<Link to='/signup'>Sign up</Link>
							</div>
							<Form.Item {...tailLayout}>
								<Button type="primary" htmlType="submit">
									Submit
              </Button>
								{login === true ? <Redirect to='/home' /> : null}
							</Form.Item>
						</Form>
					</Spin>
					{/* <Spin indicator={antIcon} /> */}
					<Modal
						title="Something's wrong"
						visible={this.state.modal1}
						onOk={this.onFinish}
						onCancel={() => this.handleCancel('modal1')}
					>
						<p>Something is wrong. Try again...</p>
					</Modal>
					<Modal
						title="Error"
						visible={this.state.modal2}
						onCancel={this.handleCancel}
						footer={[
							<Button key="back" onClick={() => this.handleCancel('modal2')}>
								Return
            </Button>
						]}
					>
						<p>Username/Password is not correct</p>
					</Modal>
				</div>
			);
		}
		else {
			return (
				<Redirect to='/home' />
			)
		}
	}
}

export default Login;