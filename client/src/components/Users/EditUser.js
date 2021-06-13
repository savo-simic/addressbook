import React, { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from "reactstrap";
import Select from "react-select";

export default class EditUser extends Component {
    render() {
        return (
            <div>
                <Modal isOpen={this.props.editUserModal}
                       toggle={this.props.toggleEditUserModal}>
                    <ModalHeader toggle={this.props.toggleEditUserModal}>
                        Update User
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name"
                                   name="name"
                                   value={this.props.editUserData.name}
                                   onChange={this.props.onChangeEditUserHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email"
                                   name="email"
                                   value={this.props.editUserData.email}
                                   onChange={this.props.onChangeEditUserHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password"
                                   name="password"
                                   onChange={this.props.onChangeEditUserHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="role">Role</Label>
                            <Select defaultValue={{
                                        value: this.props.editUserData.role ? this.props.editUserData.role.id : '',
                                        label: this.props.editUserData.role ? this.props.editUserData.role.role : ''}}
                                    options={this.props.roles}
                                    onChange={this.props.onChangeRolesDropdownHandler}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.updateUser}>Update</Button>
                        <Button color="secondary" onClick={this.props.toggleEditUserModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}