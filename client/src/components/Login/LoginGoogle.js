import React, { Component } from "react";
import {Button, Form, FormGroup, Label, Input} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';

export default class LoginGoogle extends Component {
    state = {
        loading: true,
        error: null,
        data: {},
    };

    componentDidMount() {
        fetch(`http://localhost:88/api/auth/google/callback${this.props.location.search}`, { headers: new Headers({ accept: 'application/json' }) })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong!');
            })
            .then((data) => { console.log(data)
                this.setState({ loading: false, data });
            })
            .catch((error) => {
                this.setState({ loading: false, error });
                console.error(error);
            });
    }

    render() {
        const { loading, error, data } = this.state;
        if (loading) {
            return <div>Loading....</div>;
        }

        if (error) {
            return (
                <div>
                    <div>
                        <p>Error:</p>
                        <code className="Code-block">{error.toString()}</code>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div>
                    <details>
                        <summary>Welcome {data.user.name}</summary>
                        <p>Here is your info: </p>
                        <code className="Code-block">{JSON.stringify(data, null, 2)}</code>
                    </details>
                </div>
            </div>
        );
    }
}