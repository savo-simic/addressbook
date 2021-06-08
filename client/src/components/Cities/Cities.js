import React, { Component } from "react";
import {Button, Table} from "reactstrap";

export default class Cities extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Student </td>
                                <td>One</td>
                                <td>student@gmal.com</td>
                                <td>9876543210</td>
                                <td>
                                    <Button color="warning" size="sm" className="m-1">
                                        Show
                                    </Button>
                                    <Button color="success" size="sm" className="m-1">
                                        Edit
                                    </Button>
                                    <Button color="danger" size="sm" className="m-1">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}