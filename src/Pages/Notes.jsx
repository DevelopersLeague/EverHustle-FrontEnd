import NotesSub from '../Components/NotesSub';
import calendar from '../images/edit calendar.png';
import React, { Component } from 'react'

export class Notes extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             task: 'aa', 
             length: 2,
             tasks: ['aa', 'bb'],
             filter: ''
        }
    }

    /*test() {
        this.setState(
        {
            length: this.state.tasks.push('cc')
        }, () => {console.log(this.state.tasks)
        }
        )
        
    }*/
    filterTask = (event) => {
        this.setState({
            filter: event.target.value
        }
        )
    }
    addTask = (event) => {
        this.setState(
            {
                task: event.target.value
            }
            )
    }
    handleSubmit = (event) => {
        this.setState(
            {
                length: this.state.tasks.push(this.state.task)
            }, () => {console.log(this.state.length)}
        )
        let lengths = this.state.length
        console.log(event.target.firstChild.firstChild.value='')
        alert(`New task ${this.state.tasks[lengths]} is been added`)
        event.preventDefault()
    }
    
    render() {
        return (
            <div id="notes-body">
                <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <div className="card">
                                    <div className="card-content">
                                        <span className="card-title">Task List</span>
                                        <div className="row">
                                            <form id="task-form" onSubmit={this.handleSubmit.bind(this)}>
                                                <div className="input-field col s12">
                                                    <input type="text" name ="task" id="task" onChange={this.addTask.bind(this)} />
                                                    <label className="task-label" for="task">New Task</label>
                                                </div>
                                                <button onClick={() => this.test}  class ="btn" >ADD TASK</button>
                                            </form>
                                            </div>
                                            <div class="card-action">
                                            <h4 id="task-title">Tasks</h4>
                                            <div class="input-field col s12">
                                                <input type="text" name="filter" id="filter" onChange={this.filterTask.bind(this)} />
                                                <label className="task-label" for="filter">Filter Tasks</label>
                                            </div>  
                                            <div>
                                                <ul class="collection" id="collection-lists">  
                                            <NotesSub  task={this.state.tasks} filters={this.state.filter}/>
                                              </ul>
                                            </div>
                                            <a href="#" className="clear-tasks btn black">CLear Tasks</a>                         
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
            </div>
        )
    }
}

export default Notes

