import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from "reactstrap";

export default class ShowAgency extends Component {
    render() {
        return (
            <div>
                <Modal  isOpen={this.props.showAgencyModal}
                        toggle={this.props.toggleShowAgencyModal}>
                    <ModalHeader toggle={this.props.toggleShowAgencyModal}>
                        Show Agency
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="id">Id: {this.props.agencyData.id}</Label><br/>
                            <Label for="name">Name: {this.props.agencyData.name}</Label><br/>
                            <Label for="address">Address: {this.props.agencyData.address}</Label><br/>
                            <Label for="id">City: {this.props.agencyData.city ? this.props.agencyData.city.name: ''}</Label><br/>
                            <Label for="id">Phone: {this.props.agencyData.phone}</Label><br/>
                            <Label for="id">Email: {this.props.agencyData.email}</Label><br/>
                            <Label for="id">Web: {this.props.agencyData.web}</Label><br/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggleShowAgencyModal}> Close </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}