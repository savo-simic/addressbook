import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";

export default class AddCountry extends Component {
    render() {
        return (
            <div>
                <Button style={{ float: "left" }} className="float-left mb-4 ml-2" color="primary"  onClick={this.props.toggleAddCountryModal}>
                    Add Country
                </Button>
                <Modal  isOpen={this.props.addCountryModal}
                        toggle={this.props.toggleAddCountryModal}>
                    <ModalHeader toggle={this.props.toggleAddCountryModal}>
                        Add new Country
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" name="name"
                                   value={this.props.newCountryData.name}
                                   onChange={this.props.onChangeAddCountryHandler} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.addCountry()}> Add </Button>
                        <Button color="secondary" onClick={this.props.toggleAddCountryModal}> Cancel </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}