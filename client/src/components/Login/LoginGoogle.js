import React, { Component } from "react";
import Redirect from "react-router-dom/es/Redirect";
import {BrowserRouter as Router} from "react-router-dom";
import createHistory from 'history/createBrowserHistory';

export default class LoginGoogle extends Component {
    state = {
        loading: true,
        error: null,
        data: {},
        redirect: false,
    };

    componentDidMount() {
        fetch(`http://localhost:88/api/auth/google/callback${this.props.location.search}`, { headers: new Headers({ accept: 'application/json' }) })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong!');
            })
            .then((data) => {
                const history = createHistory();
                history.go(0);

                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userData", data.user.name);
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("userRole", data.user.user_roles[0].role);
                localStorage.setItem("google_access_token", data.google_access_token);

                this.setState({ loading: false, data });
            })
            .catch((error) => {
                this.setState({ loading: false, error });
                console.error(error);
            });
    }

    render() {
        return <Redirect to={{ pathname: '/home'}} />;
    }
}