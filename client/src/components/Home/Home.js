import React, { Component } from "react";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
export default class Home extends Component {
    state = {
        navigate: false,
    };

    onLogoutHandler = () => {
        localStorage.clear();
        this.setState({
            navigate: true,
        });
        // check this
        const history = createHistory();
        history.go(0);
    };

    render() {

        const name = localStorage.getItem("userData");
        const login = localStorage.getItem("isLoggedIn");

        const { navigate } = this.state;
        if (navigate) {
            return <Redirect to="/login" push={true} />;
        }
        if (login === null) {
            return <Redirect to="/login" push={true} />;
        }

        return (
            <div className="container  border">
                <h3> HomePage</h3>
                <div className="row">
                    <div className="col-xl-9 col-sm-12 col-md-9 text-dark">
                        <h5> Welcome, {name} </h5> You have Logged in successfully.
                    </div>
                    <div className="col-xl-3 col-sm-12 col-md-3">
                        <Button
                            className="btn btn-primary text-right"
                            onClick={this.onLogoutHandler}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}