import React, { Component } from "react";
import {Button, Table} from "reactstrap";
import axios from "axios";
import ShowUser from "./ShowUser";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userData: {
                id: "",
                name: "",
                email: "",
                password: ""
            },
            newUserData: {
                name: "",
                email: "",
                password: ""
            },
            isLoading: false,
            status: "",
            addUserModal: false,
            editUserData: {
                id: "",
                name: "",
                email: "",
                password: "",
                role: {
                    id: "",
                    role: ""

                }
            },
            editUserModal: false,
            noDataFound: "",
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/users/index", config).then((response) => {
            if (response.status === 200) {
                this.setState({
                    users: response.data.data ? response.data.data : [],
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

    showUser = (id) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/users/show/"+id, config).then((response) => {
            if (response.status === 200) {
                this.setState({
                    userData: response.data.data ? response.data.data : [],
                    showUserModal: !this.state.showUserModal,
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

    toggleShowUserModal = () => {
        this.setState({
            showUserModal: !this.state.showUserModal,
        });
    };

    toggleAddUserModal = () => {
        this.setState({
            addUserModal: !this.state.addUserModal,
        });
    };

    onChangeAddUserHandler = (e) => {
        let { newUserData } = this.state;
        newUserData[e.target.name] = e.target.value;
        this.setState({ newUserData });
    };

    addUser = () => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios
            .post(
                "http://localhost:88/api/users/create",
                this.state.newUserData,
                config
            )
            .then((response) => {
                const { users } = this.state;
                const newUsers = [...users];
                newUsers.push(response.data);
                this.setState(
                    {
                        users: newUsers,
                        addUserModal: false,
                        newUserData: {
                            name: "",
                            email: ""
                        },
                    },
                    () => this.getUsers()
                );
            });
    };

    toggleEditUserModal = () => {
        this.setState({
            editUserModal: !this.state.editUserModal,
        });
    };

    onChangeEditUserHandler = (e) => {
        let { editUserData } = this.state;
        editUserData[e.target.name] = e.target.value;
        this.setState({ editUserData });
    };

    onChangeRolesDropdownHandler = (selectedRole) => {
        let role = {id:selectedRole.value, role:selectedRole.label};
        let { newUserData, editUserData } = this.state;
        newUserData['role'] = role;
        editUserData['role'] = role;
        this.setState({ newUserData, editUserData:editUserData });
    }

    editUser = (id, name, email, role) => {
        role = {id:role.id, role:role.role};
        this.setState({
            editUserData: { id, name, email, role },
            editUserModal: !this.state.editUserModal,
        });
    };

    updateUser = () => {
        let {id, name, email, password, role} = this.state.editUserData;
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .put("http://localhost:88/api/users/edit/"+id, {
                id, name, email, password, role
            },
                config
            )
            .then((response) => {
                this.getUsers();
                this.setState({
                    editUserModal: false,
                    editUserData: { name },
                    isLoading:false,
                });
            })
            .catch((error) => {
                this.setState({isLoading:false})
                console.log(error.response);
            });
    };

    deleteUser = (id) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .delete("http://localhost:88/api/users/delete/" + id, config)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getUsers();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const { userData, newUserData, editUserData, noDataFound, users} = this.state;
        const roles = [
            { value: 1, label: 'Administrator' },
            { value: 2, label: 'Contact' }
        ];

        let usersDetails = [];
        if (users.length) {
            usersDetails = users.map((user) => {
                return (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <Button color="warning" size="sm" className="m-1" onClick={() => this.showUser(user.id)}>Show</Button>
                            <Button color="success" size="sm" className="m-1" onClick={() => this.editUser(user.id, user.name, user.email, user.user_roles[0])}>
                                Edit
                            </Button>
                            <Button color="danger" size="sm" className="m-1" onClick={() => this.deleteUser(user.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            <div className="container pl-5">
                <div className="row">
                    <h3 className="font-weight-bold mt-2">Crud operations for Users</h3>
                    <ShowUser
                        toggleShowUserModal={this.toggleShowUserModal}
                        showUserModal={this.state.showUserModal}
                        userData={userData}
                        showUser={this.showUser}
                    />
                    <AddUser
                        toggleAddUserModal={this.toggleAddUserModal}
                        addUserModal={this.state.addUserModal}
                        onChangeAddUserHandler={this.onChangeAddUserHandler}
                        onChangeRolesDropdownHandler = {this.onChangeRolesDropdownHandler}
                        newUserData={newUserData}
                        addUser={this.addUser}
                        roles={roles}
                    />
                    <EditUser
                        toggleEditUserModal={this.toggleEditUserModal}
                        editUserModal={this.state.editUserModal}
                        onChangeEditUserHandler={this.onChangeEditUserHandler}
                        onChangeRolesDropdownHandler = {this.onChangeRolesDropdownHandler}
                        editUser={this.editUser}
                        editUserData={editUserData}
                        updateUser={this.updateUser}
                        roles={roles}
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
                            <tbody>  {usersDetails}    </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}