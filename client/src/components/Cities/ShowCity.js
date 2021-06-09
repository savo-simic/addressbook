import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";

export default class ShowCity extends Component {
    render() {
        return (
            <div>
                <Modal  isOpen={this.props.showCityModal}
                        toggle={this.props.toggleShowCityModal}>
                    <ModalHeader toggle={this.props.toggleShowCityModal}>
                        Show City
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="id">Id: {this.props.cityData.id}</Label><br/>
                            <Label for="name">Name: {this.props.cityData.name}</Label><br/>
                            <Label for="country">Country: {this.props.cityData.country?this.props.cityData.country.name:''}</Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggleShowCityModal}> Close </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}