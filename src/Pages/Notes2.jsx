import NotesSub from '../Components/NotesSub';
import calendar from '../images/edit calendar.png';
import React, { useState } from 'react'
import * as styles from './notes2.module.css'

function Notes2() {
    const [filter, setFilter] = useState('');
    const [task,setTask] = useState('');
    const [tasks, setTasks] = useState(['aa', 'bb']);

    function onTaskChange(e){
        setTask(e.target.value)
    }
    function onFormSubmit(e){
        e.preventDefault()
        console.log(tasks);
        setTasks(oldTasks=>[...oldTasks,task])
        setTask(''); 
    }
    function onFilterChange(e){
        setFilter(e.target.value)
    }
    function onClearClick(e){
        e.preventDefault()
        setTasks([]);
    }

    return (
            <div id="notes-body">
                <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <div className="card">
                                    <div className="card-content">
                                        <span className="card-title">Task List</span>
                                        <div className="row">
                                            {/* <div className={styles.heading}>test heading</div> */}
                                            <form id="task-form" onSubmit={onFormSubmit}>
                                                <div className="input-field col s12">
                                                    <input type="text" name ="task" id="task" onChange={onTaskChange} value={task} />
                                                    <label className="task-label" for="task">New Task</label>
                                                </div>
                                                <button  class ="btn" >ADD TASK</button>
                                            </form>
                                            </div>
                                            <div class="card-action">
                                            <h4 id="task-title">Tasks</h4>
                                            <div class="input-field col s12">
                                                <input type="text" name="filter" id="filter" value={filter} onChange={onFilterChange} />
                                                <label className="task-label" for="filter">Filter Tasks</label>
                                            </div>  
                                            <div>
                                                <ul class="collection" id="collection-lists">  
                                            <NotesSub  task={tasks} filters={filter} setTasks={setTasks}/>
                                              </ul>
                                            </div>
                                            <a href="" className="clear-tasks btn black" onClick={onClearClick}>CLear Tasks</a>                         
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
            </div>
    )
}

export default Notes2

