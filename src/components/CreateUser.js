import React, { Component } from 'react'
import axios from 'axios'

export class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: ''
        }
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username
        }

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        console.log(user)

        this.setState({
            username: ''
        })

    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Create user</h2>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <form onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <label htmlFor='user'>User:</label>
                                <input type='text' className='form-control' required value={this.state.username} onChange={this.onChangeUsername} />
                            </div>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateUser