import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

export default class Routes extends Component {
    constructor() {
        super();
        this.state = {
            isLogin: JSON.parse(localStorage.getItem('auth'))
        }
        this.logout = this.logout.bind(this)

    }
    logout() {
        localStorage.setItem('auth', false)
        this.setState({ isLogin: false })
    }

    render() {
        if (this.state.isLogin) {
            return (
                <div>
                    <h1>Home</h1>
                    <button className='btn btn-primary' onClick={this.logout}>LogOut</button>
                </div>
            );
        } else {
            return (
                <Redirect to='/login' />
            )
        }

    }
}