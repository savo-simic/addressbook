import React, { Component } from "react";
import {Button, Table} from "reactstrap";
import axios from "axios";
import ShowCountry from "./ShowCountry";
import AddCountry from "./AddCountry";
import EditCountry from "./EditCountry";

export default class Countries extends Component {
    constructor(props){
        super(props);
        this.state = {
            countries: [],
            countryData: {
                id: "",
                name: "",
            },
            newCountryData: {
                name: "",
            },
            isLoading: false,
            status: "",
            addCountryModal: false,
            editCountryData: {
                id: "",
                name: "",
            },
            editCountryModal: false,
            noDataFound: "",
            errors: {}
        }
    }

    componentDidMount() {console.log('dfasfdf')
        this.getCountries();
    }

    getCountries() {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/countries/index", config).then((response) => {
            if (response.status === 200) {
                this.setState({
                    countries: response.data.data ? response.data.data : [],
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

    showCountry = (id) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/countries/show/"+id, config).then((response) => {
            if (response.status === 200) { console.log(response)
                this.setState({
                    countryData: response.data.data ? response.data.data : [],
                    showCountryModal: !this.state.showCountryModal,
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

    toggleShowCountryModal = () => {
        this.setState({
            showCountryModal: !this.state.showCountryModal,
        });
    };

    toggleAddCountryModal = () => {
        this.setState({
            addCountryModal: !this.state.addCountryModal,
        });
    };

    onChangeAddCountryHandler = (e) => {
        let { newCountryData } = this.state;
        newCountryData[e.target.name] = e.target.value;
        this.setState({ newCountryData });
    };

    addCountry = () => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let name =   this.state.newCountryData['name'];
        if (name === "") {
            alert('Name field is required.');
            return;
        }
        axios
            .post(
                "http://localhost:88/api/countries/create",
                this.state.newCountryData,
                config
            )
            .then((response) => {
                const { countries } = this.state;
                const newCountries = [...countries];
                newCountries.push(response.data);
                this.setState(
                    {
                        countries: newCountries,
                        addCountryModal: false,
                        newCountryData: {
                            name: "",
                        },
                    },
                    () => this.getCountries()
                );
            });
    };

    toggleEditCountryModal = () => {
        this.setState({
            editCountryModal: !this.state.editCountryModal,
        });
    };

    onChangeEditCountryHandler = (e) => {
        let { editCountryData } = this.state;
        editCountryData[e.target.name] = e.target.value;
        this.setState({ editCountryData });
    };

    editCountry = (id, name) => {
        this.setState({
            editCountryData: { id, name },
            editCountryModal: !this.state.editCountryModal,
        });
    };

    updateCountry = () => {
        let {id, name} = this.state.editCountryData;
        const token = localStorage.getItem("access_token");

        if (name === "") {
            alert('Name field is required.');
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .put("http://localhost:88/api/countries/edit/"+id, {
                name,
                id,
            },
                config
            )
            .then((response) => {
                this.getCountries();
                this.setState({
                    editCountryModal: false,
                    editCountryData: { name },
                    isLoading:false,
                });
            })
            .catch((error) => {
                this.setState({isLoading:false})
                console.log(error.response);
            });
    };

    deleteCountry = (id) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .delete("http://localhost:88/api/countries/delete/" + id, config)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getCountries();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const { countryData, newCountryData, editCountryData, noDataFound, countries} = this.state;
        let countriesDetails = [];
        if (countries.length) {
            countriesDetails = countries.map((country) => {
                return (
                    <tr key={country.id}>
                        <td>{country.id}</td>
                        <td>{country.name}</td>
                        <td>
                            <Button color="warning" size="sm" className="m-1" onClick={() => this.showCountry(country.id)}>Show</Button>
                            <Button color="success" size="sm" className="m-1" onClick={() => this.editCountry(country.id, country.name,)}>
                                Edit
                            </Button>
                            <Button color="danger" size="sm" className="m-1" onClick={() => this.deleteCountry(country.id)}>
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
                    <h3 className="font-weight-bold mt-2">Crud operations for Countries</h3>
                    <ShowCountry
                        toggleShowCountryModal={this.toggleShowCountryModal}
                        showCountryModal={this.state.showCountryModal}
                        countryData={countryData}
                        showCountry={this.showCountry}
                    />
                    <AddCountry
                        toggleAddCountryModal={this.toggleAddCountryModal}
                        addCountryModal={this.state.addCountryModal}
                        onChangeAddCountryHandler={this.onChangeAddCountryHandler}
                        newCountryData={newCountryData}
                        addCountry={this.addCountry}
                    />
                    <EditCountry
                        toggleEditCountryModal={this.toggleEditCountryModal}
                        editCountryModal={this.state.editCountryModal}
                        onChangeEditCountryHandler={this.onChangeEditCountryHandler}
                        editCountry={this.editCountry}
                        editCountryData={editCountryData}
                        updateCountry={this.updateCountry}
                    />
                    <div className="col-md-10 ">
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>  {countriesDetails}    </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}