import React, { Component } from "react";
import {Button, Table} from "reactstrap";
import axios from "axios";
import ShowContact from "./ShowContact";
import AddContact from "./AddContact";
import EditContact from "./EditContact";

export default class Contacts extends Component {
    constructor(props){
        super(props);
        this.state = {
            contacts: [],
            agencies: [],
            professions: [],
            contactData: {
                id: "",
                first_name: "",
                last_name: "",
                agency_id: "",
                professions: [],
                phone: "",
                email: "",
                web: "",
                avatar: [],
            },
            newContactData: {
                id: "",
                first_name: "",
                last_name: "",
                agency_id: "",
                professions: [],
                phone: "",
                email: "",
                web: "",
                avatar: [],
            },
            isLoading: false,
            status: "",
            addContactModal: false,
            editContactData: {
                id: "",
                first_name: "",
                last_name: "",
                agency_id: "",
                professions: [],
                phone: "",
                email: "",
                web: "",
                avatar: [],
            },
            editContactModal: false,
            noDataFound: "",
            selectedFile : null

        };
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        this.getContacts();
        this.getAgencies();
        this.getProfessions();
    }
    onDrop2(picture, pictureDataURLs) {        console.log(picture);
        let { newContactData } = this.state;
        // this.setState({selectedFile: event.target.files[0]})
        newContactData['avatar'] = picture;

        this.setState({ newContactData });
        console.log(newContactData);
        // let { newContactData } = this.state;
        // newContactData['avatar'] = pictureFiles;
        // this.setState({ newContactData });
        
    }

    toBase64 = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            console.log("reader", reader);
            reader.onloadend = () => {
                resolve(reader.result);
            };

            reader.readAsDataURL(file);
        });
    };

    onDrop = async (picture) => {
        console.log("picture", picture);
        let { newContactData, editContactData } = this.state;
        if (picture.length) {
            const base64Image = await this.toBase64(picture[0]);
            // this.setState({ pictures: base64Image });
            newContactData['avatar'] = base64Image;
            editContactData['avatar'] = base64Image;
            this.setState({ newContactData, editContactData });
        }
    };



    getAgencies() {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/agencies/index", config).then((response) => {
            if (response.status === 200) {
                let options =  response.data.data.map(function (value) {
                    return { value: value.id, label: value.name };
                });

                this.setState({
                    agencies: options,
                });
            }
            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    }

    getProfessions() {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/professions/index", config).then((response) => {
            if (response.status === 200) {
                let options =  response.data.data.map(function (value) {
                    return { value: value.id, label: value.name };
                });

                this.setState({
                    professions: options,
                });
            }
            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    }

    getContacts() {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/contacts/index", config).then((response) => {
            if (response.status === 200) {
                this.setState({
                    contacts: response.data.data ? response.data.data : [],
                });
            }
            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    }

    showContact = (id) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/contacts/show/"+id, config).then((response) => {
            if (response.status === 200) {
                this.setState({
                    contactData: response.data.data ? response.data.data : [],
                    showContactModal: !this.state.showContactModal,
                });
            }
            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    };

    onChangeAgenciesDropdownHandler = (selectedAgency) => {
        // this.setState({ selectedCountry });
        let { newContactData, editContactData } = this.state;
        newContactData['agency_id'] = selectedAgency.value;
        editContactData['agency_id'] = selectedAgency.value;
        this.setState({ newContactData, editAgencyData:editContactData });
    }

    onChangeProfessionsDropdownHandler = (selectedProfession) => {
        let { newContactData, editContactData } = this.state;
        let professions = [];
        selectedProfession.map(o =>
            professions.push(o.value)
        );

        newContactData['professions'] = professions;
        editContactData['professions'] = professions;
        this.setState({ newContactData, editAgencyData:editContactData });
    }

    toggleShowContactModal = () => {
        this.setState({
            showContactModal: !this.state.showContactModal,
        });
    };

    toggleAddContactModal = () => {
        this.setState({
            addContactModal: !this.state.addContactModal,
        });
    };

    onChangeAddContactHandler = (e) => { console.log(e)
        let { newContactData } = this.state;
        newContactData[e.target.name] = e.target.value;
        this.setState({ newContactData });
    };

    addContact = () => { console.log(this.state.newContactData);
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios
            .post(
                "http://localhost:88/api/contacts/create",
                this.state.newContactData,
                config
            )
            .then((response) => {
                const { contacts } = this.state;
                const newContacts = [...contacts];
                newContacts.push(response.data);
                this.setState(
                    {
                        contacts: newContacts,
                        addContactModal: false,
                        newContactData: {
                            first_name: "",
                            last_name: "",
                            agency_id: "",
                            professions: "",
                            phone: "",
                            email: "",
                            web: "",
                            avatar: ""
                        },
                    },
                    () => this.getContacts()
                );
            });
    };

    toggleEditContactModal = () => {
        this.setState({
            editContactModal: !this.state.editContactModal,
        });
    };

    onChangeEditContactHandler = (e) => {
        let { editContactData } = this.state;
        editContactData[e.target.name] = e.target.value;
        this.setState({ editContactData });
    };

    editContact = (id, name) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let { editContactData } = this.state;
        axios.get("http://localhost:88/api/contacts/show/"+id, config).then((response) => {
            if (response.status === 200) {
                let data = response.data.data;

                this.setState({
                    editContactData:data,
                    editContactModal: !this.state.editContactModal,
                });
            }
            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    };

    updateContact = () => {
        let {id, first_name, last_name, agency_id, professions, phone, email, web, avatar} = this.state.editContactData;
        professions = professions.map(item => {return item.id ? item.id : item })

        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .put("http://localhost:88/api/contacts/edit/"+id, {
                    id, first_name, last_name, agency_id, professions, phone, email, web, avatar

            },
                config
            )
            .then((response) => {
                this.getContacts();
                this.setState({
                    editContactModal: false,
                    editContactData: { first_name, web },
                    isLoading:false,
                });
            })
            .catch((error) => {
                this.setState({isLoading:false})
                console.log(error.response);
            });
    };

    deleteContact = (id) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .delete("http://localhost:88/api/contacts/delete/" + id, config)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getContacts();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const { contactData, newContactData, editContactData, noDataFound, contacts} = this.state;
        let contactsDetails = [];
        if (contacts.length) {
            contactsDetails = contacts.map((contact) => {
                return (
                    <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.first_name}</td>
                        <td>{contact.last_name}</td>
                        <td>{contact.agency ? contact.agency.name :''}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.email}</td>
                        <td>{contact.web}</td>
                        <td>
                            <Button color="warning" size="sm" className="m-1" onClick={() => this.showContact(contact.id)}>Show</Button>
                            <Button color="success" size="sm" className="m-1" onClick={() => this.editContact(contact.id, contact.name,)}>
                                Edit
                            </Button>
                            <Button color="danger" size="sm" className="m-1" onClick={() => this.deleteContact(contact.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            <div className="container pl-5">
                <div className="row">
                    <h3 className="font-weight-bold mt-2">Crud operations for Contacts</h3>
                    <ShowContact
                        toggleShowContactModal={this.toggleShowContactModal}
                        showContactModal={this.state.showContactModal}
                        contactData={contactData}
                        showContact={this.showContact}
                    />
                    <AddContact
                        toggleAddContactModal={this.toggleAddContactModal}
                        addContactModal={this.state.addContactModal}
                        onChangeAddContactHandler={this.onChangeAddContactHandler}
                        onChangeAgenciesDropdownHandler={this.onChangeAgenciesDropdownHandler}
                        onChangeProfessionsDropdownHandler={this.onChangeProfessionsDropdownHandler}
                        onDrop={this.onDrop}
                        newContactData={newContactData}
                        addContact={this.addContact}
                        contacts={this.state.contacts}
                        agencies={this.state.agencies}
                        professions={this.state.professions}
                    />
                    <EditContact
                        toggleEditContactModal={this.toggleEditContactModal}
                        editContactModal={this.state.editContactModal}
                        onChangeEditContactHandler={this.onChangeEditContactHandler}
                        onChangeAgenciesDropdownHandler={this.onChangeAgenciesDropdownHandler}
                        onChangeProfessionsDropdownHandler={this.onChangeProfessionsDropdownHandler}
                        editContact={this.editContact}
                        onDrop={this.onDrop}xte
                        editContactData={editContactData}
                        updateContact={this.updateContact}
                        agencies={this.state.agencies}
                        professions={this.state.professions}
                    />
                    <div className="col-md-10 ">
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Agency</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Web</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>  {contactsDetails}    </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}