import React, { useState } from 'react'
import '../../Styles/notes.css';
import {useCreateOneNoteMutation} from '../../Hooks/react-query/notes-hooks'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useQueryClient } from 'react-query';

const CreateNotePopup = ({ modal, toggle, setModal }) => {

    const createMutation = useCreateOneNoteMutation()
    const [noteName, setNoteName] = useState('')
    const [noteDesc, setNoteDesc] = useState('')
    const client = useQueryClient() // for managing cache
    const handleChange = (e) => {
        const {name, value} = e.target 
        // if name attribute is coming from note-title, set value to noteName
        // else it's coming from desc set value to setNoteDesc
        if (name === "note-title") {
            setNoteName(value)
        }
        else
            setNoteDesc(value)
    }

    const handleSave = () => {
        // e.preventDefault()
        createMutation.mutate({ title: noteName, content: noteDesc, category: "general" }, {
            onSuccess: () => {
                client.invalidateQueries('notes')
                setModal(false)
        }})
            // title, content, category
    
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create note</ModalHeader>
                {/* <form onSubmit={handleSave}> */}
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
                        <button className="btn-note" type="submit" onClick={handleSave}>{createMutation.isLoading?"Creating...":"Create"}</button>
                <button className="btn-note" onClick={toggle}>Cancel</button>
                </ModalFooter>
             {/* </form> */}
            </Modal>
        </div>
    )
}

export default CreateNotePopup
