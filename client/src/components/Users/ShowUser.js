import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from "reactstrap";

export default class ShowUser extends Component {
    render() {
        return (
            <div>
                <Modal  isOpen={this.props.showUserModal}
                        toggle={this.props.toggleShowUserModal}>
                    <ModalHeader toggle={this.props.toggleShowUserModal}>
                        Show User
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="id">Id: {this.props.userData.id}</Label><br/>
                            <Label for="name">Name: {this.props.userData.name}</Label><br/>
                            <Label for="name">Email: {this.props.userData.email}</Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggleShowUserModal}> Close </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}