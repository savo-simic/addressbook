import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from "reactstrap";

export default class ShowContact extends Component {
    render() {
        return (
            <div>
                <Modal  isOpen={this.props.showContactModal}
                        toggle={this.props.toggleShowContactModal}>
                    <ModalHeader toggle={this.props.toggleShowContactModal}>
                        Show Contact
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="id">Id: {this.props.contactData.id}</Label><br/>
                            <Label for="name">First Name: {this.props.contactData.first_name}</Label><br/>
                            <Label for="name">Last Name: {this.props.contactData.last_name}</Label><br/>
                            <Label for="id">Agency: {this.props.contactData.agency ? this.props.contactData.agency.name: ''}</Label><br/>
                            <Label for="id">Phone: {this.props.contactData.phone}</Label><br/>
                            <Label for="id">Email: {this.props.contactData.email}</Label><br/>
                            <Label for="id">Web: {this.props.contactData.web}</Label><br/>
                            {/*<img src={`/images/` + this.props.contactData.avatar}></img>*/}
                            <img className="col-md-6" src={`http://localhost:88/images/` + this.props.contactData.avatar}></img>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggleShowContactModal}> Close </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}