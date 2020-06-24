import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Home from './components/Home'

export default class Routes extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path='/login' component={Login} />
					<PrivateRoute exact path='/home' component={Home} />
				</Switch>
			</BrowserRouter>
		);
	}
}