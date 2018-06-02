import React, { Component } from 'react';

class Projects extends Component {


    render() {
        console.log(this.props.projects)
        return <div className='projects'>
            {this.props.projects.map(project => {
                return(
                    <div className="card" key={project.id}>
                    <div className="card-body text-center">
                        <h4 className="card-title">{project.name}</h4>
                        <p className="card-title">{project.description}</p>
                    </div>
                    </div>
                )
                })}
          </div>
    }
}

export default Projects;