import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('/exercises/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch(err => console.log('error is ', err))

        axios.get('/users')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })
            .catch(err => console.log('error is ', err))
            

    }

    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription = e => {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration = e => {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({
            date: date
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('/exercises/update/' + this.props.match.params.id, exercise)
            .then(res => console.log('response is ',res.data))
            .catch(err => console.log('error is ',err))

        window.location = '/';
    }

    render() {
        return (
            <div >
                <h3 className='text-center m-3'>EDIT EXERCISE</h3>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>User: </label>
                                <select ref="userInput"
                                    required
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}>
                                    {
                                        this.state.users.map(function (user) {
                                            return <option
                                                key={user}
                                                value={user}>{user}
                                            </option>;
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description: </label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <label>Duration (in minutes): </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.duration}
                                    onChange={this.onChangeDuration}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date: </label>
                                <div>
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.onChangeDate}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditExercise