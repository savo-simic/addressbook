import React, { Component } from "react";
import {Button, Table} from "reactstrap";
import axios from "axios";
import ShowProfession from "./ShowProfession";
import AddProfession from "./AddProfession";
import EditProfession from "./EditProfession";

export default class Professions extends Component {
    constructor(props){
        super(props);
        this.state = {
            professions: [],
            professionData: {
                id: "",
                name: "",
            },
            newProfessionData: {
                name: "",
            },
            isLoading: false,
            status: "",
            addProfessionModal: false,
            editProfessionData: {
                id: "",
                name: "",
            },
            editProfessionModal: false,
            noDataFound: "",
        }
    }

    componentDidMount() {
        this.getProfessions();
    }

    getProfessions() {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/professions/index", config).then((response) => {
            if (response.status === 200) {
                this.setState({
                    professions: response.data.data ? response.data.data : [],
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

    showProfession = (id) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get("http://localhost:88/api/professions/show/"+id, config).then((response) => {
            if (response.status === 200) {
                this.setState({
                    professionData: response.data.data ? response.data.data : [],
                    showProfessionModal: !this.state.showProfessionModal,
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

    toggleShowProfessionModal = () => {
        this.setState({
            showProfessionModal: !this.state.showProfessionModal,
        });
    };

    toggleAddProfessionModal = () => {
        this.setState({
            addProfessionModal: !this.state.addProfessionModal,
        });
    };

    onChangeAddProfessionHandler = (e) => {
        let { newProfessionData } = this.state;
        newProfessionData[e.target.name] = e.target.value;
        this.setState({ newProfessionData });
    };

    addProfession = () => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios
            .post(
                "http://localhost:88/api/professions/create",
                this.state.newProfessionData,
                config
            )
            .then((response) => {
                const { professions } = this.state;
                const newProfessions = [...professions];
                newProfessions.push(response.data);
                this.setState(
                    {
                        professions: newProfessions,
                        addProfessionModal: false,
                        newProfessionData: {
                            name: "",
                        },
                    },
                    () => this.getProfessions()
                );
            });
    };

    toggleEditProfessionModal = () => {
        this.setState({
            editProfessionModal: !this.state.editProfessionModal,
        });
    };

    onChangeEditProfessionHandler = (e) => {console.log('ddds');
        let { editProfessionData } = this.state;
        editProfessionData[e.target.name] = e.target.value;
        this.setState({ editProfessionData });
    };

    editProfession = (id, name) => {
        this.setState({
            editProfessionData: { id, name },
            editProfessionModal: !this.state.editProfessionModal,
        });
    };

    updateProfession = () => {
        let {id, name} = this.state.editProfessionData;
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .put("http://localhost:88/api/professions/edit/"+id, {
                name,
                id,
            },
                config
            )
            .then((response) => {
                this.getProfessions();
                this.setState({
                    editProfessionModal: false,
                    editProfessionData: { name },
                    isLoading:false,
                });
            })
            .catch((error) => {
                this.setState({isLoading:false})
                console.log(error.response);
            });
    };

    deleteProfession = (id) => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        this.setState({
            isLoading: true,
        });
        axios
            .delete("http://localhost:88/api/professions/delete/" + id, config)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getProfessions();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const { professionData, newProfessionData, editProfessionData, noDataFound, professions} = this.state;
        let professionsDetails = [];
        if (professions.length) {
            professionsDetails = professions.map((profession) => {
                return (
                    <tr key={profession.id}>
                        <td>{profession.id}</td>
                        <td>{profession.name}</td>
                        <td>
                            <Button color="warning" size="sm" className="m-1" onClick={() => this.showProfession(profession.id)}>Show</Button>
                            <Button color="success" size="sm" className="m-1" onClick={() => this.editProfession(profession.id, profession.name,)}>
                                Edit
                            </Button>
                            <Button color="danger" size="sm" className="m-1" onClick={() => this.deleteProfession(profession.id)}>
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
                    <h3 className="font-weight-bold mt-2">Crud operations for Professions</h3>
                    <ShowProfession
                        toggleShowProfessionModal={this.toggleShowProfessionModal}
                        showProfessionModal={this.state.showProfessionModal}
                        professionData={professionData}
                        showProfession={this.showProfession}
                    />
                    <AddProfession
                        toggleAddProfessionModal={this.toggleAddProfessionModal}
                        addProfessionModal={this.state.addProfessionModal}
                        onChangeAddProfessionHandler={this.onChangeAddProfessionHandler}
                        newProfessionData={newProfessionData}
                        addProfession={this.addProfession}
                    />
                    <EditProfession
                        toggleEditProfessionModal={this.toggleEditProfessionModal}
                        editProfessionModal={this.state.editProfessionModal}
                        onChangeEditProfessionHandler={this.onChangeEditProfessionHandler}
                        editProfession={this.editProfession}
                        editProfessionData={editProfessionData}
                        updateProfession={this.updateProfession}
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
                            <tbody>  {professionsDetails}    </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}