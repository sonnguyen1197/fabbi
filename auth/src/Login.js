import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Redirect } from 'react-router-dom';
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

const account = {
    username: 'admin',
    password: "1"
}
class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            islogin: JSON.parse(localStorage.getItem('auth'))
        }
    }
    onFinish = values => {
        if (account.username === values.username && account.password === values.password) {
            console.log(this.state)
            localStorage.setItem('auth', true)
            this.setState({ islogin: true })
        }
    };
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    render() {
        const { islogin } = this.state;
        console.log(this.state)
        if (islogin === false) {
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

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            {islogin === true ? <Redirect to='/home' /> : null}
                        </Form.Item>
                    </Form>
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

export default LoginComponent;