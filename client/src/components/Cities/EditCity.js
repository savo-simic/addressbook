import React, { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from "reactstrap";
import Select from "react-select";

export default class editCity extends Component {
    render() {
        return (
            <div>
                <Modal isOpen={this.props.editCityModal}
                       toggle={this.props.toggleEditCityModal}>
                    <ModalHeader toggle={this.props.toggleEditCityModal}>
                        Update City
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name"
                                   name="name"
                                   value={this.props.editCityData.name}
                                   onChange={this.props.onChangeEditCityHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Country</Label>
                            <Select defaultValue={{value: this.props.editCityData.country_id, label: this.props.editCityData.country?this.props.editCityData.country.name:''}}
                                    options={this.props.countries}
                                    onChange={this.props.onChangeCountriesDropdownHandler}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.updateCity}>Update</Button>
                        <Button color="secondary" onClick={this.props.toggleEditCityModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}