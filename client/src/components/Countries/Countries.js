import React, { Component } from "react";
import {Button, Table} from "reactstrap";
import axios from "axios";
import AddCountry from "./AddCountry";

export default class Countries extends Component {
    constructor(props){
        super(props);
        this.state = {
            countries: [],
            newCountryData: {
                name: "",
            },
            isLoading: false,
            status: "",
            addCountryModal: false,
        }
    }

    componentDidMount() {
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

    toggleAddCountryModal = () => {
        this.setState({
            AddCountryModal: !this.state.AddCountryModal,
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

    render() {
        const { newCountryData, noDataFound, countries} = this.state;
        let countriesDetails = [];
        if (countries.length) {
            countriesDetails = countries.map((country) => {
                return (
                    <tr key={country.id}>
                        {/*<td>{country.id}</td>*/}
                        <td>{country.name}</td>
                        <td>
                            <Button color="warning" size="sm" className="m-1">Show</Button>
                            <Button color="success" size="sm" className="m-1">Edit</Button>
                            <Button color="danger" size="sm" className="m-1">Delete</Button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            <div className="container pl-5">
                <div className="row">
                    <h4 className="font-weight-bold">Crud operations for Countries</h4>
                    <AddCountry
                        toggleAddCountryModal={this.toggleAddCountryModal}
                        AddCountryModal={this.state.AddCountryModal}
                        onChangeAddCountryHandler={this.onChangeAddCountryHandler}
                        addCountry={this.addCountry}
                        newCountryData={newCountryData}
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