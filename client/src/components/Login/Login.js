import React, { Component } from "react";
import {Button, Form, FormGroup, Label, Input} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            msg: "",
            isLoading: false,
            redirect: false,
            errMsgEmail: "",
            errMsgPwd: "",
            errMsg: "",
            googleLoginUrl: null,
        };
    }

    componentDidMount() {
        fetch('http://localhost:88/api/auth/google/url', { headers: new Headers({ accept: 'application/json' }) })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong!');
            })
            .then((data) => {

                this.setState({googleLoginUrl: data.url})
            })
            .catch((error) => console.error(error));
    }


    onChangeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    };

    onSignInHandler = () => {
        this.setState({ isLoading: true });
        axios
            .post("http://localhost:88/api/login-user", {
                email: this.state.email,
                password: this.state.password,
            })
            .then((response) => {
                this.setState({ isLoading: false });
                if (response.data.status === "success") {
                    //check this
                    const history = createHistory();
                    history.go(0);
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("userData", response.data.user.name);
                    localStorage.setItem("userId", response.data.userId);
                    localStorage.setItem("userRole", response.data.user.user_roles[0].role);
                    localStorage.setItem("access_token", response.data.access_token);

                    this.setState({
                        msg: response.data.message,
                        redirect: true,
                    });

                }
                if (
                    response.data.status === "failed" &&
                    response.data.success === undefined
                ) {
                    this.setState({
                        errMsgEmail: response.data.validation_error.email,
                        errMsgPwd: response.data.validation_error.password,
                    });
                    setTimeout(() => {
                        this.setState({ errMsgEmail: "", errMsgPwd: "" });
                    }, 2000);
                } else if (
                    response.data.status === "failed" &&
                    response.data.success === false
                ) {
                    this.setState({
                        errMsg: response.data.message,
                    });
                    setTimeout(() => {
                        this.setState({ errMsg: "" });
                    }, 2000);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/home" />;
        }
        const login = localStorage.getItem("isLoggedIn");
        if (login) {
            return <Redirect to="/home" />;
        }
        const isLoading = this.state.isLoading;
        let { googleLoginUrl } = this.state;
        console.log(googleLoginUrl)
        return (
            <div className="container">
                <div className="row d-flex justify-content-center pt-5">
                    <div className="col-md-12 pb-2">
                        <h3>Login to your account</h3>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <Form className="containers">
                                <FormGroup>
                                    <Label for="email">Email id</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={this.state.email}
                                        onChange={this.onChangeHandler}
                                    />
                                    <span className="text-danger">{this.state.msg}</span>
                                    <span className="text-danger">{this.state.errMsgEmail}</span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        value={this.state.password}
                                        onChange={this.onChangeHandler}
                                    />
                                    <span className="text-danger">{this.state.errMsgPwd}</span>
                                </FormGroup>
                                <p className="text-danger">{this.state.errMsg}</p>
                                <Button
                                    className="text-center mb-4"
                                    color="success"
                                    onClick={this.onSignInHandler}
                                >
                                    Sign In
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm ml-5" role="status"  aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </Button>
                                <Button>
                                    {googleLoginUrl && (
                                        <a className="App-link" href={googleLoginUrl}>
                                            Sign in with Google
                                        </a>
                                    )}
                                </Button>

                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}