import React, { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from "reactstrap";

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
                                   value={this.props.editUserData ? this.props.editUserData.name : ''}
                                   onChange={this.props.onChangeEditUserHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Email</Label>
                            <Input id="email"
                                   name="email"
                                   value={this.props.editUserData?this.props.editUserData.email: ""}
                                   onChange={this.props.onChangeEditUserHandler}
                            />
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