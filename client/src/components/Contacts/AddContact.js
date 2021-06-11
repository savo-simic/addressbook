import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";
import ImageUploader from 'react-images-upload';

export default class AddContact extends Component {
    render() {
        return (
            <div>
                <Button style={{ float: "left" }} className="float-left mb-4 ml-2" color="primary"  onClick={this.props.toggleAddContactModal}>
                    Add Contact
                </Button>
                <Modal  isOpen={this.props.addContactModal}
                        toggle={this.props.toggleAddContactModal}>
                    <ModalHeader toggle={this.props.toggleAddContactModal}>
                        Add new Contact
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="first_name">First Name</Label>
                            <Input id="first_name" name="first_name"
                                   value={this.props.newContactData.first_name}
                                   onChange={this.props.onChangeAddContactHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name">Last Name</Label>
                            <Input id="last_name" name="last_name"
                                   value={this.props.newContactData.last_name}
                                   onChange={this.props.onChangeAddContactHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="agency">Agency</Label>
                            <Select options={this.props.agencies} onChange={this.props.onChangeAgenciesDropdownHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="profession">Profession</Label>
                            <Select  isMulti options={this.props.professions} onChange={this.props.onChangeProfessionsDropdownHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input id="phone" name="phone"
                                   value={this.props.newContactData.phone}
                                   onChange={this.props.onChangeAddContactHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" name="email"
                                   value={this.props.newContactData.email}
                                   onChange={this.props.onChangeAddContactHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="web">Web</Label>
                            <Input id="web" name="web"
                                   value={this.props.newContactData.web}
                                   onChange={this.props.onChangeAddContactHandler} />
                        </FormGroup>
                        {/*<FormGroup className="mt-3">*/}
                        {/*    <Label for="avatar">Avatar</Label><br/>*/}
                        {/*    <Input type="file"*/}
                        {/*           id="avatar"*/}
                        {/*           name="avatar"*/}
                        {/*           value={this.props.newContactData.avatar}*/}
                        {/*           onChange={this.props.onDrop} />*/}
                        {/*</FormGroup>*/}
                        <FormGroup>
                            <Label for="avatar">Avatar</Label><br/>
                            <ImageUploader
                                id="avatar"
                                name="avatar"
                                withIcon={false}
                                withPreview={true}
                                label=""
                                buttonText="Upload Images"
                                onChange={this.props.onDrop}
                                imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
                                maxFileSize={1048576}
                                fileSizeError=" file size is too big"
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.addContact()}> Add </Button>
                        <Button color="secondary" onClick={this.props.toggleAddContactModal}> Cancel </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}