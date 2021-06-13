import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";

export default class AddUser extends Component {
    render() {
        return (
            <div>
                <Button style={{ float: "left" }} className="float-left mb-4 ml-2" color="primary"  onClick={this.props.toggleAddUserModal}>
                    Add User
                </Button>
                <Modal  isOpen={this.props.addUserModal}
                        toggle={this.props.toggleAddUserModal}>
                    <ModalHeader toggle={this.props.toggleAddUserModal}>
                        Add new User
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" name="name"
                                   value={this.props.newUserData.name}
                                   onChange={this.props.onChangeAddUserHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" name="email"
                                   value={this.props.newUserData.email}
                                   onChange={this.props.onChangeAddUserHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password" name="password"
                                   value={this.props.newUserData.password}
                                   onChange={this.props.onChangeAddUserHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Role</Label>
                            <Select defaultValue={{value: 1, label: "Administrator"}}
                                    options={this.props.roles}
                                    onChange={this.props.onChangeRolesDropdownHandler}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.addUser()}> Add </Button>
                        <Button color="secondary" onClick={this.props.toggleAddUserModal}> Cancel </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}