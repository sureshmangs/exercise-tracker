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

        axios.post('/users/add', user)
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
                <h3 className='text-center m-3'>CREATE USER</h3>
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
