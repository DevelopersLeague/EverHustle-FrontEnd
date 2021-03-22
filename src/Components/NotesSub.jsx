import React from 'react'

function NotesSub(props) {
    const tasklist = props.task
    const filterString = props.filters
    let taskOutput = []
    if(filterString == ''){
        taskOutput = tasklist.map(task => <li className="collection-item">{task}
                                                <button className="delete-item">
                                                    <i className="fa fa-remove"></i>
                                                </button>
                                            </li>
                                    )
    } else {
        tasklist.forEach(element => {
            if(element.includes(filterString)) {
                taskOutput.push(<li className="collection-item">{element}
                <button className="delete-item">
                    <i className="fa fa-remove"></i>
                </button>
            </li>
            )
        }
        })
    }
    
    return( <div>{taskOutput}</div> )
}


export default NotesSub
