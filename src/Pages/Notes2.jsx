import React, {useState, useEffect} from 'react'
import CreateNotePopup from '../Components/Modals/CreateNotePopup';
import NotesCard from '../Components/NotesCard'
import axios from 'axios'
import Contact from '../Components/Contact'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../Styles/notes.css'
import { useGetAllNotesQuery } from '../Hooks/react-query/notes-hooks'
const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const Notes2 = () => {
    const [modal, setModal] = useState(false)

    /*=== USEQUERY ===*/
    const notesQuery = useGetAllNotesQuery()
    const toggle = () => {
        setModal(!modal);
    }

    
    return (
        <>
            <header className="header text-center my-4 ">
                <div className="heading_text">
                    <h3>Notes</h3>
                </div>
                <button className="btn-note" onClick={()=>setModal(true)}>Create Note</button>
            </header>
            <div className="notes-container">
                {
                    notesQuery.data?notesQuery.data.notes.map((obj, index) =>
                        <NotesCard noteObj={obj} index={index} key={obj.id}/>): "loading"
                }
                
                
            </div>
            {/*  */}
            <CreateNotePopup toggle={toggle} modal={modal} setModal={setModal}/>
            <Contact/>
        </>
    )
}

export default Notes2
