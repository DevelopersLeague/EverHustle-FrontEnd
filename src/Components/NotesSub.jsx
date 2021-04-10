import React from 'react'
import '../Styles/goals.css'

function NotesSub(props) {
    const tasklist = props.task
    const filterString = props.filters
    console.log(filterString)
    let taskOutput = []
    function makeOnDelete(taskInput){
        return function onDelete(e){
            let newTasks = tasklist.filter((oneTask)=>oneTask!==taskInput)
            props.setTasks(newTasks);
        }
    }
    function onComplete(e) {
        e.target.parentElement.id = 'task-complete'
        console.log(e.target.parentElement.id)
    }
    if(filterString === ''){
        taskOutput = tasklist.map(
                task => <li className="collection-item">
                    {task}
                <button className="complete-item fa fa-check-circle" onClick={onComplete} />
                <button className="delete-item fa fa-remove" onClick={makeOnDelete(task)} />                                            
                    </li>
            )
    } else {
        tasklist.forEach(element => {
            if(element.includes(filterString)) {
                taskOutput.push(<li className="collection-item">{element}
                <button className="complete-item fa fa-check-circle" />                                                    
                <button className="delete-item fa fa-remove" onClick={makeOnDelete(element)} />
                
               
            </li>
            )
        }
        })
    }
    
    return( <div>{taskOutput}</div> )
}


export default NotesSub
