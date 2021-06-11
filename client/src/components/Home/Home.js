import React, { Component } from "react";
import {Button, Table} from "reactstrap";
import { Redirect } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import axios from "axios";

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            contacts: [],
            navigate:false,
            searchTerm: ""
        }
    }

    componentDidMount() {
        this.getContacts();
    }

    onLogoutHandler = () => {
        localStorage.clear();
        this.setState({
            navigate: true,
        });
        // check this
        const history = createHistory();
        history.go(0);
    };

    getContacts() { console.log('....1')
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/contacts/index", config).then((response) => {
            if (response.status === 200) {
                this.setState({
                    contacts: response.data.data ? response.data.data : [],
                });
            }
            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    }

    search() {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let $searchTerm = this.state.searchTerm;
        axios.get("http://localhost:88/api/contacts/search/" +$searchTerm, config).then((response) => {
            if (response.status === 200) {console.log((response))
                this.setState({
                    contacts: response.data ? response.data : [],
                });
            }
            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    }

    editSearchTerm = (e) => {
        this.setState({searchTerm: e.target.value});
    }

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
        const { contacts} = this.state;
        let contactsDetails = [];
        let agencyDetails = [];
        if (contacts.length) {
            contactsDetails = contacts.map((contact) => {
                return (
                    <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.first_name}</td>
                        <td>{contact.last_name}</td>
                        <td>{contact.email}</td>
                    </tr>
                );
            });

            agencyDetails = contacts.map((contact) => {
                return (
                    <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.agency.name}</td>
                        <td>{contact.agency.email}</td>
                    </tr>
                );
            });
        }

        return (
            <div className="container  border">
                <h3> HomePage</h3>
                <div className="row">
                    <div className="col-xl-9 col-sm-12 col-md-9 text-dark float-start">
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
                <div className="row mt-5">
                    <div className="col-xl-12 col-sm-12 col-md-12 text-dark float-start">
                        <input type= 'text'
                               value = {this.state.searchTerm}
                               onChange = {this.editSearchTerm}
                               placeholder = 'Search for a name!'
                        />
                        <Button color="primary" size="sm"  onClick={() => this.search()}> Search </Button>
                        {/*{this.resultDetails}*/}
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-xl-6 col-sm-12 col-md-6 text-dark">
                        <h5> Contacts </h5>
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>  {contactsDetails}    </tbody>
                        </Table>
                    </div>
                    <div className="col-xl-6 col-sm-12 col-md-6 text-dark">
                        <h5> Agencies </h5>
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>  {agencyDetails}    </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}