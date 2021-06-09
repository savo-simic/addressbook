import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";

export default class ShowCountry extends Component {
    render() {
        return (
            <div>
                <Modal  isOpen={this.props.showCountryModal}
                        toggle={this.props.toggleShowCountryModal}>
                    <ModalHeader toggle={this.props.toggleShowCountryModal}>
                        Show Country
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="id">Id: {this.props.countryData.id}</Label><br/>
                            <Label for="name">Name: {this.props.countryData.name}</Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggleShowCountryModal}> Close </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}