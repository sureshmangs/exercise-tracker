import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export class CreateExercise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'Suresh',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        this.setState({
            users: ['Suresh', 'Jaden', 'Cris'],
            username: 'Suresh'
        })
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration = (e) => {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate = (date) => {
        this.setState({
            date: date
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise)

        window.location = '/';  //Back to homepage
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Add new Exercise</h2>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="user">User:</label>
                                <select ref='userInput' className='form-control' required value={this.state.username} onChange={this.onChangeUsername}>
                                    {
                                        this.state.users.map(user => {
                                            return (
                                                <option key={user} value={user}>
                                                    {user}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <input type="text" className="form-control" placeholder="Enter Description" required value={this.state.description} onChange={this.onChangeDescription} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="duration">Duration:</label>
                                <input type="text" className="form-control" placeholder="Enter Duration" required value={this.state.duration} onChange={this.onChangeDuration} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Date:</label>
                                <div>
                                    <DatePicker className='form-control' selected={this.state.date} onChange={this.onChangeDate} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Create Exercise</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateExercise
