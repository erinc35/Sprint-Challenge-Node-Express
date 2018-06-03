import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";



class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        actions: []
      }
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5555/projects/${this.props.match.params.id}`)
      .then(result => 
        // console.log(result)
        this.setState({ project: result.data.project })
    )
      .catch(err => console.log(err));
  }

  render() {
      console.log(this.state.project.actions)
    return <div className="solo-card" key={this.state.project.id}>
        <div className="card-body text-center">
        <Link to='/'><button className='btn btn-info home-btn'>Home</button></Link>
          <h2>Project #{this.state.project.id}</h2>
          <h3 className="card-title">{this.state.project.name}</h3>
          <p className="card-title">{this.state.project.description}</p>
          <p className='actions'><b>Actions:</b></p>
          {this.state.project.actions.map(action => {
            return <div key={action.id}>
                <p>
                  <b>Action #{action.id}</b>
                </p>
                <p>Description: {action.description}</p>
                <p>Notes: {action.notes}</p>
                <p>Completed: {action.completed}</p>
              </div>;
          })}
        </div>
      </div>;
  }
}

export default Project;