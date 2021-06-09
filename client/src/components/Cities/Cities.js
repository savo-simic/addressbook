import React, { Component } from "react";
import {Button, Table} from "reactstrap";
import axios from "axios";
import ShowCity from "./ShowCity";
import AddCity from "./AddCity";
import EditCity from "./EditCity";

export default class Cities extends Component {
    constructor(props){
        super(props);
        this.state = {
            cities: [],
            countries: [],
            selectedCountry: null,
            cityData: {
                country_id: "",
                name: "",
            },
            newCityData: {
                country_id: "",
                name: "",
            },
            isLoading: false,
            status: "",
            addCityModal: false,
            editCityData: {
                country_id: "",
                name: "",
            },
            editCityModal: false,
            noDataFound: "",
        }
    }

    componentDidMount() {
        this.getCities();
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

    showCity = (id) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/cities/show/"+id, config).then((response) => {
            if (response.status === 200) {
                this.setState({
                    cityData: response.data.data ? response.data.data : [],
                    showCityModal: !this.state.showCityModal,
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
        let { newCityData, editCityData } = this.state;
        newCityData['country_id'] = selectedCountry.value;
        editCityData['country_id'] = selectedCountry.value;
        this.setState({ newCityData, editCityData:editCityData });
    }

    toggleShowCityModal = () => {
        this.setState({
            showCityModal: !this.state.showCityModal,
        });
    };

    toggleAddCityModal = () => {
        this.setState({
            addCityModal: !this.state.addCityModal,
        });
    };

    onChangeAddCityHandler = (e) => {
        let { newCityData } = this.state;
        newCityData[e.target.name] = e.target.value;
        this.setState({ newCityData });
    };

    addCity = () => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios
            .post(
                "http://localhost:88/api/cities/create",
                this.state.newCityData,
                config
            )
            .then((response) => {
                const { cities } = this.state;
                const newCities = [...cities];
                newCities.push(response.data);
                this.setState(
                    {
                        cities: newCities,
                        addCityModal: false,
                        newCityData: {
                            name: "",
                            country_id: "",

                        },
                    },
                    () => this.getCities()
                );
            });
    };

    toggleEditCityModal = () => {
        this.setState({
            editCityModal: !this.state.editCityModal,
        });
    };

    onChangeEditCityHandler = (e) => {
        let { editCityData } = this.state;
        editCityData[e.target.name] = e.target.value;
        this.setState({ editCityData });
    };

    editCity = (id, name) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let { editCityData } = this.state;
        axios.get("http://localhost:88/api/cities/show/"+id, config).then((response) => {
            if (response.status === 200) {
                let data = response.data.data;
                // editCityData['country_id'] = data.country_id;
                this.setState({
                    editCityData:data,
                    editCityModal: !this.state.editCityModal,
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

    updateCity = () => {
        let {id, country_id, name} = this.state.editCityData;
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .put("http://localhost:88/api/cities/edit/"+id, {
                    name,
                    country_id,
                },
                config
            )
            .then((response) => {
                this.getCities();
                this.setState({
                    editCityModal: false,
                    editCityData: { name, country_id },
                    isLoading:false,
                });
            })
            .catch((error) => {
                this.setState({isLoading:false})
                console.log(error.response);
            });
    };

    deleteCity = (id) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .delete("http://localhost:88/api/cities/delete/" + id, config)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getCities();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const { cityData, newCityData, editCityData, noDataFound, selectedCountry, cities} = this.state;
        let citiesDetails = [];
        if (cities.length) {
            citiesDetails = cities.map((city) => {
                return (
                    <tr key={city.id}>
                        <td>{city.id}</td>
                        <td>{city.name}</td>
                        <td>{city.country?city.country.name:''}</td>
                        <td>
                            <Button color="warning" size="sm" className="m-1" onClick={() => this.showCity(city.id)}>Show</Button>
                            <Button color="success" size="sm" className="m-1" onClick={() => this.editCity(city.id, city.name,)}>
                                Edit
                            </Button>
                            <Button color="danger" size="sm" className="m-1" onClick={() => this.deleteCity(city.id)}>
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
                    <h3 className="font-weight-bold mt-2">Crud operations for Cities</h3>
                    <ShowCity
                        toggleShowCityModal={this.toggleShowCityModal}
                        showCityModal={this.state.showCityModal}
                        cityData={cityData}
                        showCity={this.showCity}
                    />
                    <AddCity
                        toggleAddCityModal={this.toggleAddCityModal}
                        addCityModal={this.state.addCityModal}
                        onChangeAddCityHandler={this.onChangeAddCityHandler}
                        onChangeCountriesDropdownHandler={this.onChangeCountriesDropdownHandler}
                        newCityData={newCityData}
                        addCity={this.addCity}
                        countries={this.state.countries}
                    />
                    <EditCity
                        toggleEditCityModal={this.toggleEditCityModal}
                        editCityModal={this.state.editCityModal}
                        onChangeEditCityHandler={this.onChangeEditCityHandler}
                        onChangeCountriesDropdownHandler={this.onChangeCountriesDropdownHandler}
                        editCity={this.editCity}
                        editCityData={editCityData}
                        updateCity={this.updateCity}
                        countries={this.state.countries}
                    />
                    <div className="col-md-10 ">
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>  {citiesDetails}    </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}