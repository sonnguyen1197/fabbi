import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Login from './Login'
import Home from './home'
export default class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/home' component={Home} />
                    {/* <Route component={NotFound} /> */}
                </Switch>
            </BrowserRouter>
        );
    }
}