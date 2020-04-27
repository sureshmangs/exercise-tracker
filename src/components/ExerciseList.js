import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <button className='btn btn-sm btn-primary '><Link className='text-decoration-none text-white' to={"/edit/" + props.exercise._id}>edit</Link></button>  <button className='btn btn-sm btn-primary' onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
        </td>
    </tr>
)

class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: []
        };
        this.exerciseList = this.exerciseList.bind(this);
    }

    componentDidMount() {
        axios.get('/exercises')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch(err => console.log('error is ', err))

    }

    deleteExercise = id => {
        axios.delete('/exercises/' + id)
            .then(response => { 
            	console.log(response.data) });

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList = () => {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        })
    }

    render() {
    
        return (
            <div className='text-center'>
                <h3 className='m-3'>EXERCISE LOG</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ExercisesList