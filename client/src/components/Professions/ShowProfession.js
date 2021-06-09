import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from "reactstrap";

export default class ShowProfession extends Component {
    render() {
        return (
            <div>
                <Modal  isOpen={this.props.showProfessionModal}
                        toggle={this.props.toggleShowProfessionModal}>
                    <ModalHeader toggle={this.props.toggleShowProfessionModal}>
                        Show Profession
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="id">Id: {this.props.professionData.id}</Label><br/>
                            <Label for="name">Name: {this.props.professionData.name}</Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggleShowProfessionModal}> Close </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}