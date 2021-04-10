import React, { useState } from 'react'
import '../Styles/notes.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import UpdateNotePopup from './Modals/UpdateNotePopup'

const NotesCard = ({ noteObj, index, deleteNote, updateListArray }) => {
    
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    const updateNote = (obj) => {
        updateListArray(obj, index)
        window.location.reload()
        toggle()
    }

    const handleDelete = () => {
        deleteNote(index)
    }

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]


    return (
        <div className = "card-wrapper mx-sm-0 mr-md-5 mb-sm-4 mt-sm-4">
            <div className = "card-top" style={{"backgroundColor": colors[index%5].primaryColor}}></div>
            <div className = "note-holder">
                <span className = "card-header" style={{"backgroundColor": colors[index%5].secondaryColor, "borderRadius": "10px"}}>{noteObj.Name}</span>
                {/* may need to write noteName and noteDsc */}
                <p className = "mt-3">{noteObj.Description}</p>

                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    <i className = "far fa-edit mr-3" style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {() => setModal(true)}></i>
                    <i className="fas fa-trash-alt" style = {{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {handleDelete}></i>
                </div>
        </div>
        <UpdateNotePopup modal = {modal} toggle = {toggle} updateNote = {updateNote} noteObj = {noteObj}/>
        </div>
    )
}

export default NotesCard