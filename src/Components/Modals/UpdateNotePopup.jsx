import React, { useEffect, useState } from 'react'
import '../../Styles/notes.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {useUpdateOneNoteMutation} from '../../Hooks/react-query/notes-hooks'
import {useQueryClient} from 'react-query'
const UpdateNotePopup = ({ modal, toggle, updateNote, noteObj, setModal }) => {

    const [noteName, setNoteName] = useState(noteObj.title)
    const [noteDesc, setNoteDesc] = useState(noteObj.content)
    const updateMutation = useUpdateOneNoteMutation()
    const client = useQueryClient() // for managing cache

    const handleChange = (e) => {
        
        const {name, value} = e.target
        if (name === "note-title") {
            setNoteName(value)
        }
        else
            setNoteDesc(value)
    }

    /*
    useEffect(() => {
        // update states
        setNoteName(noteObj.Name)
        setNoteDesc(noteObj.Description)
    }, [noteObj.Description, noteObj.Name])
    */
    const handleUpdate = (e) => {
        // e.preventDefault();
        updateMutation.mutate({id: noteObj.id ,title: noteName, content: noteDesc }, {
            onSuccess: () => {
                client.invalidateQueries('notes')
                setModal(false)
            }
        })
        
        // updateNote(tempObj)
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop: "70px" }}>
                <ModalHeader toggle={toggle}>Update note</ModalHeader>
                <ModalBody>

                    {/* <form > */}
                        <div className="form-group">
                            <label htmlFor="note-title">Note title</label>
                            <input type="text" name="note-title" id="note-title" className="form-control" value={noteName} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="note-description">Description</label>
                            <textarea name="note-description" id="note-description" cols="20" rows="4" className="form-control" value={noteDesc} onChange={handleChange}></textarea>
                        </div>  
                    {/* </form> */}

                </ModalBody>
                <ModalFooter>
                <button className="btn-note" type="button" onClick={handleUpdate} >{updateMutation.isLoading?"Updating...":"Update"}</button>{' '}
                <button className="btn-note" type="button" onClick={toggle}>Cancel</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default UpdateNotePopup
