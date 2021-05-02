import {useGetAllGoalsQuery, useCreateOneGoalMutation} from '../Hooks/react-query/goals-hooks';
import NotesSub from '../Components/NotesSub';
import React, { useState } from 'react'
import {useQueryClient} from 'react-query'
import '../Styles/goals.css'
function Goals() {
    const [filter, setFilter] = useState('');
    const {data} = useGetAllGoalsQuery();
    const {mutate} = useCreateOneGoalMutation();
    const client = useQueryClient();
    const [task,setTask] = useState('');
    const [categoryInput,setCategoryInput] = useState('');
    // const [tasks, setTasks] = useState([{
    //     title : 'MPR Lecture', 
    //     category : 'weekly',
    //     isCompleted : true
    // }, 
    // {
    //     title : 'complete assignments', 
    //     category : 'daily',
    //     isCompleted : false
    // }]);

    function onTaskChange(e){
        setTask(e.target.value)
    }
    function onFormSubmit(e){
        e.preventDefault()
        mutate({
            title : task,
            content : 'test content',
            category : categoryInput }, 
            {
                onSuccess : ()=>{
                    client.invalidateQueries('goals');
                    setTask('');    }
            });
    }
    function onFilterChange(e){
        setFilter(e.target.value)
    }
    // function onClearClick(e){
    //     e.preventDefault()
    //     setTasks([]);
    // }

    return (
            <div id="notes-body">
                <div className="container">
                        <div className="row">
                            <div className="col s12">
                                <div className="card">
                                    <div className="card-content">
                                        <span className="card-title">Goals</span>
                                        <div className="row">
                                            {/* <div className={styles.heading}>test heading</div> */}
                                            <form id="task-form" onSubmit={onFormSubmit} >
                                                <div className="input-field column s12">
                                                    <input type="text" name ="task" id="task" onChange={onTaskChange} value={task} />
                                                    <input type="radio" name="Category" id="Daily" onClick={()=>{setCategoryInput('daily')}}/>
                                                    <label for="Daily">DAILY</label>
                                                    <input type="radio" name="Category" id="Weekly" onClick={()=>{setCategoryInput('weekly')}}/>
                                                    <label for="Weekly">WEEKLY</label>
                                                    <input type="radio" name="Category" id="Monthly" onClick={()=>{setCategoryInput('monthly')}}/>
                                                    <label for="Monthly">MONTHLY</label>
                                                    <label className="task-label" for="task">New Goal</label>
                                                </div>
                                                <button class ="add-task-btn" >ADD GOAL</button>
                                            </form>
                                            </div>
                                            <div class="card-action">
                                            <h4 id="task-title">Goalss</h4>
                                            <div class="input-field col s12">
                                                <input type="text" name="filter" id="filter" value={filter} onChange={onFilterChange} />
                                                <label className="task-label" for="filter">Filter Goals</label>
                                            </div>  
                                            <div>                                        
                                                {
                                                    data?
                                                        (<>
                                                        <NotesSub  task={data.goals} category='daily' filters={filter}/>
                                                        <NotesSub  task={data.goals} category='weekly' filters={filter}/>
                                                        <NotesSub  task={data.goals} category='monthly' filters={filter}/></>)
                                                        
                                                        :"loading..."
                                                }  
                                            
                                            </div>
                                            {/* <button className="clear-tasks add-task-btn black" onClick={onClearClick}>CLear Goals</button>                          */}
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
            </div>
    )
}

export default Goals

