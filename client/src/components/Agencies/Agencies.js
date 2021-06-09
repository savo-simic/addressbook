import React, { Component } from "react";
import {Button, Table} from "reactstrap";
import axios from "axios";
import ShowProfession from "./ShowAgency";
import AddProfession from "./AddAgency";
import EditProfession from "./EditAgency";
import AddCity from "../Cities/AddCity";
import EditCity from "../Cities/EditCity";

export default class Agencies extends Component {
    constructor(props){
        super(props);
        this.state = {
            agencies: [],
            countries: [],
            agencyData: {
                id: "",
                name: "",
            },
            newAgencyData: {
                name: "",
            },
            isLoading: false,
            status: "",
            addAgencyModal: false,
            editAgencyData: {
                id: "",
                name: "",
            },
            editAgencyModal: false,
            noDataFound: "",
        }
    }

    componentDidMount() {
        this.getAgencies();
        this.getCountries();
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
                    agenciyData: response.data.data ? response.data.data : [],
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

    onChangeCountriesDropdownHandler = (selectedCountry) => {
        // this.setState({ selectedCountry });
        let { newAgencyData, editAgencyData } = this.state;
        newAgencyData['country_id'] = selectedCountry.value;
        editAgencyData['country_id'] = selectedCountry.value;
        // this.setState({ newAgencyData, editAgencyData:editAgencyData });
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/countries/cities/"+selectedCountry.value, config).then((response) => {
            if (response.status === 200) { console.log(response.data.data)
                let options =  response.data.data.map(function (value) {
                    return { value: value.id, label: value.name };
                })
                this.setState({
                    cities:options,
                    // showAgencyModal: !this.state.showAgencyModal,
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
        this.setState({
            editAgencyData: { id, name },
            editAgencyModal: !this.state.editAgencyModal,
        });
    };

    updateAgency = () => {
        let {id, name} = this.state.editAgencyData;
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .put("http://localhost:88/api/agencies/edit/"+id, {
                name,
                id,
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
                    {/*<ShowProfession*/}
                    {/*    toggleShowProfessionModal={this.toggleShowProfessionModal}*/}
                    {/*    showProfessionModal={this.state.showProfessionModal}*/}
                    {/*    professionData={professionData}*/}
                    {/*    showProfession={this.showProfession}*/}
                    {/*/>*/}
                    <AddProfession
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
                    {/*<EditProfession*/}
                    {/*    toggleEditProfessionModal={this.toggleEditProfessionModal}*/}
                    {/*    editProfessionModal={this.state.editProfessionModal}*/}
                    {/*    onChangeEditProfessionHandler={this.onChangeEditProfessionHandler}*/}
                    {/*    editProfession={this.editProfession}*/}
                    {/*    editProfessionData={editProfessionData}*/}
                    {/*    updateProfession={this.updateProfession}*/}
                    {/*/>*/}
                    <div className="col-md-10 ">
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
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