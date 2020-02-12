import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <div>
                <div className="navbar navbar-expand-md bg-dark navbar-dark" >
                    <Link className="navbar-brand" to="/"><span>Exercise Tracker</span></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav ml-auto mr-5">
                            <li className="nav-item">
                                <Link className="nav-link" to="/"> EXERCISES</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create" >CREATE EXERCISE</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user" >CREATE USER</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;