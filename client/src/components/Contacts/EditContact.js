import React, { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from "reactstrap";
import Select from "react-select";

export default class EditContact extends Component {
    render() {
        return (
            <div>
                <Modal isOpen={this.props.editContactModal}
                       toggle={this.props.toggleEditContactModal}>
                    <ModalHeader toggle={this.props.toggleEditContactModal}>
                        Update Contact
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="first_name">First Name</Label>
                            <Input id="first_name" name="first_name"
                                   value={this.props.editContactData.first_name}
                                   onChange={this.props.onChangeEditContactHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name">Last Name</Label>
                            <Input id="last_name" name="last_name"
                                   value={this.props.editContactData.last_name}
                                   onChange={this.props.onChangeEditContactHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="agency">Agency</Label>
                            <Select defaultValue={{value: this.props.editContactData.agency_id, label: this.props.editContactData.agency ? this.props.editContactData.agency.name : ''}}
                                    options={this.props.agencies}
                                    onChange={this.props.onChangeAgenciesDropdownHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="profession">Profession</Label>
                            <Select defaultValue={this.props.editContactData.professions ? this.props.editContactData.professions.map(item => {return {value:item.id, label:item.name}  }):''}
                                    options={this.props.professions}
                                    onChange={this.props.onChangeProfessionsDropdownHandler}
                                    isMulti />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input id="phone" name="phone"
                                   value={this.props.editContactData.phone}
                                   onChange={this.props.onChangeEditContactHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" name="email"
                                   value={this.props.editContactData.email}
                                   onChange={this.props.onChangeEditContactHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="web">Web</Label>
                            <Input id="web" name="web"
                                   value={this.props.editContactData.web}
                                   onChange={this.props.onChangeEditContactHandler} />
                        </FormGroup>
                        {/*<FormGroup className="mt-3">*/}
                        {/*    <Label for="avatar">Avatar</Label><br/>*/}
                        {/*    <Input type="file"*/}
                        {/*           id="avatar"*/}
                        {/*           name="avatar"*/}
                        {/*           value={this.props.editContactData.avatar}*/}
                        {/*           onChange={this.props.onChangeEditContactHandler} />*/}
                        {/*</FormGroup>*/}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.updateContact}>Update</Button>
                        <Button color="secondary" onClick={this.props.toggleEditContactModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}