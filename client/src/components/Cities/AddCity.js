import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";
import Select from 'react-select';

export default class AddCity extends Component {
    render() {
        return (
            <div>
                <Button style={{ float: "left" }} className="float-left mb-4 ml-2" color="primary"  onClick={this.props.toggleAddCityModal}>
                    Add City
                </Button>
                <Modal  isOpen={this.props.addCityModal}
                        toggle={this.props.toggleAddCityModal}>
                    <ModalHeader toggle={this.props.toggleAddCityModal}>
                        Add new City
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" name="name"
                                   value={this.props.newCityData.name}
                                   onChange={this.props.onChangeAddCityHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Country</Label>
                            <Select options={this.props.countries} onChange={this.props.onChangeCountriesDropdownHandler}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.addCity()}> Add </Button>
                        <Button color="secondary" onClick={this.props.toggleAddCityModal}> Cancel </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}