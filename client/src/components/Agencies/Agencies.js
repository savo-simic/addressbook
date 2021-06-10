import React, { Component } from "react";
import {Button, Table} from "reactstrap";
import axios from "axios";
import ShowAgency from "./ShowAgency";
import AddAgency from "./AddAgency";
import EditAgency from "./EditAgency";

export default class Agencies extends Component {
    constructor(props){
        super(props);
        this.state = {
            agencies: [],
            cities: [],
            countries: [],
            agencyData: {
                id: "",
                name: "",
                address: "",
                city_id: "",
                phone: "",
                email: "",
                web: "",
            },
            newAgencyData: {
                id: "",
                name: "",
                address: "",
                city_id: "",
                phone: "",
                email: "",
                web: "",
            },
            isLoading: false,
            status: "",
            addAgencyModal: false,
            editAgencyData: {
                id: "",
                name: "",
                address: "",
                city_id: "",
                phone: "",
                email: "",
                web: "",
            },
            editAgencyModal: false,
            noDataFound: "",
        }
    }

    componentDidMount() {
        this.getCountries();
        this.getCities();
        this.getAgencies();
    }

    getCountries() {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/countries/index", config).then((response) => {
            if (response.status === 200) {
                let options =  response.data.data.map(function (value) {
                    return { value: value.id, label: value.name };
                })
                this.setState({
                    countries: options,
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

    getCities() {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/cities/index", config).then((response) => {
            if (response.status === 200) {
                this.setState({
                    cities: response.data.data ? response.data.data : [],
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

    getAgencies() {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/agencies/index", config).then((response) => {
            if (response.status === 200) {
                this.setState({
                    agencies: response.data.data ? response.data.data : [],
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

    showAgency = (id) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/agencies/show/"+id, config).then((response) => {
            if (response.status === 200) {
                this.setState({
                    agencyData: response.data.data ? response.data.data : [],
                    showAgencyModal: !this.state.showAgencyModal,
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

    onChangeCountriesDropdownHandler = (selectedCountry) => { console.log('countries')
        let { newAgencyData, editAgencyData } = this.state;
        newAgencyData['country_id'] = selectedCountry.value;
        editAgencyData['country_id'] = selectedCountry.value;

        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/countries/cities/"+selectedCountry.value, config).then((response) => {
            if (response.status === 200) {
                let options =  response.data.data.map(function (value) {
                    return { value: value.id, label: value.name };
                })
                this.setState({
                    cities:options,
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

    onChangeCitiesDropdownHandler = (selectedCity) => {
        let { newAgencyData, editAgencyData } = this.state;
        newAgencyData['city_id'] = selectedCity.value;
        editAgencyData['city_id'] = selectedCity.value;
        this.setState({ newAgencyData, editAgencyData:editAgencyData });
    }

    toggleShowAgencyModal = () => {
        this.setState({
            showAgencyModal: !this.state.showAgencyModal,
        });
    };

    toggleAddAgencyModal = () => {
        this.setState({
            addAgencyModal: !this.state.addAgencyModal,
        });
    };

    onChangeAddAgencyHandler = (e) => {
        let { newAgencyData } = this.state;
        newAgencyData[e.target.name] = e.target.value;
        this.setState({ newAgencyData });
    };

    addAgency = () => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios
            .post(
                "http://localhost:88/api/agencies/create",
                this.state.newAgencyData,
                config
            )
            .then((response) => {
                const { agencies } = this.state;
                const newAgencies = [...agencies];
                newAgencies.push(response.data);
                this.setState(
                    {
                        agencies: newAgencies,
                        addAgencyModal: false,
                        newAgencyData: {
                            name: "",
                            address: "",
                            city_id: "",
                            phone: "",
                            email: "",
                            web: "",
                        },
                    },
                    () => this.getAgencies()
                );
            });
    };

    toggleEditAgencyModal = () => {
        this.setState({
            editAgencyModal: !this.state.editAgencyModal,
        });
    };

    onChangeEditAgencyHandler = (e) => {
        let { editAgencyData } = this.state;
        editAgencyData[e.target.name] = e.target.value;
        this.setState({ editAgencyData });
    };

    editAgency = (id, name) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let { editAgencyData } = this.state;
        axios.get("http://localhost:88/api/agencies/show/"+id, config).then((response) => {
            if (response.status === 200) {
                let data = response.data.data;

                this.setState({
                    editAgencyData:data,
                    editAgencyModal: !this.state.editAgencyModal,
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

    updateAgency = () => {
        let {id, name, address, city_id, phone, email, web} = this.state.editAgencyData;
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .put("http://localhost:88/api/agencies/edit/"+id, {
                    id, name, address, city_id, phone, email, web

            },
                config
            )
            .then((response) => {
                this.getAgencies();
                this.setState({
                    editAgencyModal: false,
                    editAgencyData: { name },
                    isLoading:false,
                });
            })
            .catch((error) => {
                this.setState({isLoading:false})
                console.log(error.response);
            });
    };

    deleteAgency = (id) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .delete("http://localhost:88/api/agencies/delete/" + id, config)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getAgencies();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const { agencyData, newAgencyData, editAgencyData, noDataFound, agencies} = this.state;
        let agenciesDetails = [];
        if (agencies.length) {
            agenciesDetails = agencies.map((agency) => {
                return (
                    <tr key={agency.id}>
                        <td>{agency.id}</td>
                        <td>{agency.name}</td>
                        <td>{agency.address}</td>
                        <td>{agency.city ? agency.city.name :''}</td>
                        <td>{agency.phone}</td>
                        <td>{agency.email}</td>
                        <td>{agency.web}</td>
                        <td>
                            <Button color="warning" size="sm" className="m-1" onClick={() => this.showAgency(agency.id)}>Show</Button>
                            <Button color="success" size="sm" className="m-1" onClick={() => this.editAgency(agency.id, agency.name,)}>
                                Edit
                            </Button>
                            <Button color="danger" size="sm" className="m-1" onClick={() => this.deleteAgency(agency.id)}>
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
                    <h3 className="font-weight-bold mt-2">Crud operations for Agencies</h3>
                    <ShowAgency
                        toggleShowAgencyModal={this.toggleShowAgencyModal}
                        showAgencyModal={this.state.showAgencyModal}
                        agencyData={agencyData}
                        showProfession={this.showProfession}
                    />
                    <AddAgency
                        toggleAddAgencyModal={this.toggleAddAgencyModal}
                        addAgencyModal={this.state.addAgencyModal}
                        onChangeAddAgencyHandler={this.onChangeAddAgencyHandler}
                        onChangeCountriesDropdownHandler={this.onChangeCountriesDropdownHandler}
                        onChangeCitiesDropdownHandler={this.onChangeCitiesDropdownHandler}
                        newAgencyData={newAgencyData}
                        addAgency={this.addAgency}
                        agencies={this.state.agencies}
                        countries={this.state.countries}
                        cities={this.state.cities}
                    />
                    <EditAgency
                        toggleEditAgencyModal={this.toggleEditAgencyModal}
                        editAgencyModal={this.state.editAgencyModal}
                        onChangeEditAgencyHandler={this.onChangeEditAgencyHandler}
                        onChangeCountriesDropdownHandler={this.onChangeCountriesDropdownHandler}
                        onChangeCitiesDropdownHandler={this.onChangeCitiesDropdownHandler}
                        editAgency={this.editAgency}
                        editAgencyData={editAgencyData}
                        updateAgency={this.updateAgency}
                        countries={this.state.countries}
                        cities={this.state.cities}
                    />
                    <div className="col-md-10 ">
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Web</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>  {agenciesDetails}    </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}