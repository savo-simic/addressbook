import React, { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from "reactstrap";

export default class EditProfession extends Component {
    render() {
        return (
            <div>
                <Modal isOpen={this.props.editProfessionModal}
                       toggle={this.props.toggleEditProfessionModal}>
                    <ModalHeader toggle={this.props.toggleEditProfessionModal}>
                        Update Profession
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name"
                                   name="name"
                                   value={this.props.editProfessionData.name}
                                   onChange={this.props.onChangeEditProfessionHandler}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.updateProfession}>Update</Button>
                        <Button color="secondary" onClick={this.props.toggleEditProfessionModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}