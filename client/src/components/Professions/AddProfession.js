import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";

export default class AddProfession extends Component {
    render() {
        return (
            <div>
                <Button style={{ float: "left" }} className="float-left mb-4 ml-2" color="primary"  onClick={this.props.toggleAddProfessionModal}>
                    Add Profession
                </Button>
                <Modal  isOpen={this.props.addProfessionModal}
                        toggle={this.props.toggleAddProfessionModal}>
                    <ModalHeader toggle={this.props.toggleAddProfessionModal}>
                        Add new Country
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" name="name"
                                   value={this.props.newProfessionData.name}
                                   onChange={this.props.onChangeAddProfessionHandler} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.addProfession()}> Add </Button>
                        <Button color="secondary" onClick={this.props.toggleAddProfessionModal}> Cancel </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}