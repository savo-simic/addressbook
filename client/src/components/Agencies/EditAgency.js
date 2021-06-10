import React, { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from "reactstrap";
import Select from "react-select";

export default class EditAgency extends Component {
    render() {
        return (
            <div>
                <Modal isOpen={this.props.editAgencyModal}
                       toggle={this.props.toggleEditAgencyModal}>
                    <ModalHeader toggle={this.props.toggleEditAgencyModal}>
                        Update Agency
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" name="name"
                                   value={this.props.editAgencyData.name}
                                   onChange={this.props.onChangeEditAgencyHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input id="address" name="address"
                                   value={this.props.editAgencyData.address}
                                   onChange={this.props.onChangeEditAgencyHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Country</Label>
                            <Select defaultValue={{value: this.props.editAgencyData.country_id, label:this.props.editAgencyData.city ? this.props.editAgencyData.city.country.name: ''}}
                                    options={this.props.countries}
                                    onChange={this.props.onChangeCountriesDropdownHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">City</Label>
                            <Select defaultValue={{value: this.props.editAgencyData.city_id, label: this.props.editAgencyData.city ? this.props.editAgencyData.city.name: ''}}
                                    options={this.props.cities}
                                    onChange={this.props.onChangeCitiesDropdownHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input id="phone" name="phone"
                                   value={this.props.editAgencyData.phone}
                                   onChange={this.props.onChangeEditAgencyHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" name="email"
                                   value={this.props.editAgencyData.email}
                                   onChange={this.props.onChangeEditAgencyHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="web">Web</Label>
                            <Input id="web" name="web"
                                   value={this.props.editAgencyData.web}
                                   onChange={this.props.onChangeEditAgencyHandler} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.updateAgency}>Update</Button>
                        <Button color="secondary" onClick={this.props.toggleEditAgencyModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}