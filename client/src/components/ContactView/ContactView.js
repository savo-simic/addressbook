import React, { Component } from "react";
import {Button, Table} from "reactstrap";
import createHistory from 'history/createBrowserHistory';
import axios from "axios";
import EditContact from "../Contacts/EditContact";
import EditUser from "./EditUser";

export default class ContactView extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            status: "",
            userData: "",
            editUserData: {
                name: "",
                email: "",
            },
            editUserModal: false,
            noDataFound: "",
        }
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        const token = localStorage.getItem("google_access_token");
        const id = localStorage.getItem("userId");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/users/show/"+id, config).then((response) => {
            if (response.status === 200) {
                this.setState({
                    userData: response.data.data ? response.data.data : [],
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

    toggleEditUserModal = () => {
        this.setState({
            editUserModal: !this.state.editUserModal,
        });
    };

    onChangeEditUserHandler = (e) => { console.log('dddd')
        let { editUserData } = this.state;
        editUserData[e.target.name] = e.target.value;
        this.setState({ editUserData });
    };

    editUser = (id, name) => {
        const token = localStorage.getItem("google_access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let { editContactData } = this.state;
        axios.get("http://localhost:88/api/users/show/"+id, config).then((response) => {
            if (response.status === 200) {
                let data = response.data.data;

                this.setState({
                    editUserData:data,
                    editUserModal: !this.state.editUserModal,
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
    };

    updateUser = () => {
        let {id, name, email} = this.state.editUserData;
        const token = localStorage.getItem("google_access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .put("http://localhost:88/api/users/edit/"+id, {
                    name,  email

                },
                config
            )
            .then((response) => {
                this.getUser();
                this.setState({
                    editUserModal: false,
                    editUserData: "" ,
                    isLoading:false,
                });
            })
            .catch((error) => {
                this.setState({isLoading:false})
                console.log(error.response);
            });
    };


    render() {
        const { editUserData, userData, users} = this.state;

        return (
            <div className="container pl-5">
                <div className="row">
                    <h3 className="font-weight-bold mt-2">Panel View for Contact Role</h3>
                    <div className="col-xl-3 col-sm-12 col-md-3">
                        <Button
                            className="btn btn-primary text-right"
                            onClick={this.onLogoutHandler}
                        >
                            Logout
                        </Button>
                    </div>
                    <EditUser
                        toggleEditUserModal={this.toggleEditUserModal}
                        editUserModal={this.state.editUserModal}
                        onChangeEditUserHandler={this.onChangeEditUserHandler}
                        editUser={this.editUser}
                        editUserData={editUserData}
                        updateUser={this.updateUser}
                    />
                    <div className="col-md-10 ">
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr key={userData.id}>
                                    <td>{userData.id}</td>
                                    <td>{userData.name}</td>
                                    <td>{userData.email}</td>
                                    <td>
                                      <Button color="success" size="sm" className="m-1" onClick={() => this.editUser(userData.id)}>
                                                         Edit
                                      </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}