import React, { useState } from 'react'
import '../../Styles/notes.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const CreateNotePopup = ({ modal, toggle, saveNote }) => {

    const [noteName, setNoteName] = useState('')
    const [noteDesc, setNoteDesc] = useState('')

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        
        if (name === "note-title") {
            setNoteName(value)
        }
        else
            setNoteDesc(value)
    }

    const handleSave = () => {
        // e.preventDefault()
        let noteObj = {}
        noteObj["Name"] = noteName
        noteObj["Description"] = noteDesc
        saveNote(noteObj)
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create note</ModalHeader>
                <form action="" onSubmit={handleSave}>
                <ModalBody>

                    
                        <div className="form-group">
                            <label htmlFor="note-title">Note title</label>
                            <input type="text" name="note-title" id="note-title" className="form-control" onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="note-description">Description</label>
                            <textarea name="note-description" id="note-description" cols="30" rows="10" className="form-control" onChange={handleChange} required="required"></textarea>
                        </div>  
                    

                </ModalBody>
                <ModalFooter>
                <button className="btn-note" type="submit">Create!</button>
                <button className="btn-note" onClick={toggle}>Cancel</button>
                </ModalFooter>
             </form>
            </Modal>
        </div>
    )
}

export default CreateNotePopup
