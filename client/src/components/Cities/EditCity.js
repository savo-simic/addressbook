import React, { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from "reactstrap";

export default class editCountry extends Component {
    render() {
        return (
            <div>
                <Modal isOpen={this.props.editCountryModal}
                       toggle={this.props.toggleEditCountryModal}>
                    <ModalHeader toggle={this.props.toggleEditCountryModal}>
                        Update Country
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name"
                                   name="name"
                                   value={this.props.editCountryData.name}
                                   onChange={this.props.onChangeEditCountryHandler}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.updateCountry}>Update</Button>
                        <Button color="secondary" onClick={this.props.toggleEditCountryModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}