import React, { useEffect, useState } from 'react'
import '../../Styles/notes.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const UpdateNotePopup = ({ modal, toggle, updateNote, noteObj }) => {

    const [noteName, setNoteName] = useState('')
    const [noteDesc, setNoteDesc] = useState('')

    const handleChange = (e) => {
        
        const {name, value} = e.target
        if (name === "note-title") {
            setNoteName(value)
        }
        else
            setNoteDesc(value)
    }

    useEffect(() => {
        // update states
        setNoteName(noteObj.Name)
        setNoteDesc(noteObj.Description)
    }, [noteObj.Description, noteObj.Name])

    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {}
        // creating property
        tempObj['Name'] = noteName
        tempObj['Description'] = noteDesc
        // saveNote(noteObj)
        updateNote(tempObj)
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update note</ModalHeader>
                <ModalBody>

                    {/* <form > */}
                        <div className="form-group">
                            <label htmlFor="note-title">Note title</label>
                            <input type="text" name="note-title" id="note-title" className="form-control" value={noteName} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="note-description">Description</label>
                            <textarea name="note-description" id="note-description" cols="30" rows="10" className="form-control" value={noteDesc} onChange={handleChange}></textarea>
                        </div>  
                    {/* </form> */}

                </ModalBody>
                <ModalFooter>
                <button className="btn-note" type="button" onClick={handleUpdate}>Update!</button>{' '}
                <button className="btn-note" type="button" onClick={toggle}>Cancel</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default UpdateNotePopup
