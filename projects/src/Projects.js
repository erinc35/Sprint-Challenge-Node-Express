import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Projects extends Component {


    render() {
        console.log(this.props.projects)
        return <div className='projects'>
            {this.props.projects.map(project => {
                return(
                    <Link to={`projects/${project.id}`} className='project-link-wrap'>
                        <div className="card" key={project.id}>
                        <div className="card-body text-center">
                            <h4 className="card-title">{project.name}</h4>
                            <p className="card-title">{project.description}</p>
                        </div>
                        </div>
                    </Link>
                )
                })}
          </div>
    }
}

export default Projects;