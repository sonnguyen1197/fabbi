import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

export default class Routes extends Component {
	constructor() {
		super();
		this.state = {
			logout: false
		}
		this.logout = this.logout.bind(this)
	}

	logout() {
		localStorage.clear('auth')
		this.setState({ logout: true })
	}

	render() {
		let { logout } = this.state
		return (
			<div>
				<h1>Home</h1>
				<button className='btn btn-primary' onClick={this.logout}>LogOut</button>
				{logout ? <Redirect to='/login' /> : null}
			</div>
		);
	}
}
