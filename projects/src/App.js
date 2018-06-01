import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { Route } from 'react-router-dom';
 

class App extends Component {

  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5555/projects')
      .then(result => this.setState({ projects: result.data.projects }))
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state.projects)
    return <div className="App">
        {/* <Route exact path="/" render={props => <Projects {...props} projects={this.state.projects} />} /> */}
      </div>;
  }
}

export default App;
