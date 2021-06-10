import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";

export default class AddAgency extends Component {
    render() {
        return (
            <div>
                <Button style={{ float: "left" }} className="float-left mb-4 ml-2" color="primary"  onClick={this.props.toggleAddAgencyModal}>
                    Add Agency
                </Button>
                <Modal  isOpen={this.props.addAgencyModal}
                        toggle={this.props.toggleAddAgencyModal}>
                    <ModalHeader toggle={this.props.toggleAddAgencyModal}>
                        Add new Agency
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" name="name"
                                   value={this.props.newAgencyData.name}
                                   onChange={this.props.onChangeAddAgencyHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input id="address" name="address"
                                   value={this.props.newAgencyData.address}
                                   onChange={this.props.onChangeAddAgencyHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Country</Label>
                            <Select options={this.props.countries} onChange={this.props.onChangeCountriesDropdownHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">City</Label>
                            <Select options={this.props.cities} onChange={this.props.onChangeCitiesDropdownHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input id="phone" name="phone"
                                   value={this.props.newAgencyData.phone}
                                   onChange={this.props.onChangeAddAgencyHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" name="email"
                                   value={this.props.newAgencyData.email}
                                   onChange={this.props.onChangeAddAgencyHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="web">Web</Label>
                            <Input id="web" name="web"
                                   value={this.props.newAgencyData.web}
                                   onChange={this.props.onChangeAddAgencyHandler} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.addAgency()}> Add </Button>
                        <Button color="secondary" onClick={this.props.toggleAddAgencyModal}> Cancel </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}