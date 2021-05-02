import {useDeleteOneGoalMutation, useUpdateOneGoalMutation} from '../Hooks/react-query/goals-hooks';
import {useQueryClient} from 'react-query';
import React from 'react'
import '../Styles/goals.css'

function NotesSub(props) {
    const {mutate, isLoading} = useDeleteOneGoalMutation();
    const client = useQueryClient();
    const updateMutation = useUpdateOneGoalMutation();
    const tasklist = props.task
    const filterString = props.filters
    // console.log(filterString)
    let taskOutput = []
    let taskOutputs = []
    function makeOnDelete(taskInput){
        return function onDelete(e){
            mutate({
                id : taskInput.id
            },
            {
                onSuccess : ()=>{
                    client.invalidateQueries('goals');            
                }
            });

        }
    }
    function makeOnComplete(taskInput) {
        return function onComplete(e){
            updateMutation.mutate({
                id: taskInput.id,
                isCompleted : !taskInput.isCompleted
            },
            {
                onSuccess : ()=>{
                    client.invalidateQueries('goals');            
                } 
            })
        }
    }
    if(filterString == ''){
        taskOutput = tasklist.filter((task)=>{
            return task.category == props.category;
        }).map(
            task => <li className="collection-item" id={task.isCompleted?"task-complete":""}>
                        {task.title}
                        {
                            isLoading || updateMutation.isLoading
                            ?     null
                            : (<>
                            <button className="complete-item fa fa-check-circle" onClick={makeOnComplete(task)} />
                            <button className="delete-item fa fa-remove" onClick={makeOnDelete(task)} /> 
                            </>)
                        }                                                       
                    </li>
            )
    } else{
        taskOutputs = tasklist.filter((task)=>{
            return task.category == props.category;
        })
        taskOutputs.forEach(element => {
            if((element.title).includes(filterString)){
                //console.log(element.title);
                taskOutput.push(<li className="collection-item" id={element.isCompleted?"task-complete":""}>
                {element.title}
                {
                    isLoading || updateMutation.isLoading
                    ?     null
                    : (<>
                    <button className="complete-item fa fa-check-circle" onClick={makeOnComplete(element)} />
                    <button className="delete-item fa fa-remove" onClick={makeOnDelete(element)} /> 
                    </>)
                }
                    </li>     
                );
               }
           });
        }
    
        
    
    return( <div>
            <h2>{props.category}</h2>
            <ul class="collection" id="collection-lists">
                {taskOutput}
            </ul>
        </div> )
}


export default NotesSub
