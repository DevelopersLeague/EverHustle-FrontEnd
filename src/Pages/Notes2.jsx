import React, {useState, useEffect} from 'react'
import CreateNotePopup from '../Components/Modals/CreateNotePopup';
import NotesCard from '../Components/NotesCard'
import axios from 'axios'
import Contact from '../Components/Contact'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../Styles/notes.css'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const api = axios.create(
    {
        baseURL: `${SERVER_BASE_URL}/notes`,
        
            headers: {
                Authorization: localStorage.getItem("authToken"),
            },
        
    }
)

const Notes2 = () => {
    const [modal, setModal] = useState(false)
    const [noteList, setNoteList] = useState([])
    // const [updateModal, setUpdateModal] = useState(false)
    const toggle = () => {
        setModal(!modal);
    }

    const deleteNote = (index) => {
        let tempList = noteList
        tempList.splice(index, 1)
        setNoteList(tempList)
        localStorage.setItem("noteList", JSON.stringify(tempList))
        window.location = "/notes"
    }

    // fetching noteList from localstorage using useEffect
    useEffect(() => {
        api.get('')
            .then(res => {
            setNoteList(res.data.notes)
            console.log(res);
        })
        /*
        let arr = localStorage.getItem("noteList")

        // if noteList item is available
        if (arr) {
            // converting arr string to arr object
            let jsonObj = JSON.parse(arr)

            setNoteList(jsonObj)
        }
        */
        // console.clear()
    }, []);

    
    const saveNote = (noteObj) => {
        let tempList = noteList
        tempList.push(noteObj)
        // saving to localstorage, to avoid loss of data on page refresh
        // setItem as two para, key and value
        localStorage.setItem("noteList", JSON.stringify(tempList))
        // you cant store array directly to localstaorage, we need to convert it to string
        // go to application, localstorage to see your list
        setNoteList(tempList)
        setModal(false)
    }

    const updateListArray = (noteObj, index) => {
        let tempList = noteList
        tempList[index] = noteObj

         // update in localstorage
        localStorage.setItem("noteList", JSON.stringify(tempList))
        setNoteList(tempList)
        // setModal(false)
        // toggle()
        // window.location.reload()
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
                {noteList.map((obj, index) =>
                    <NotesCard noteObj={obj} index={index} deleteNote={deleteNote} updateListArray={updateListArray}/>)
                }
            </div>
            <CreateNotePopup toggle={toggle} modal={modal} saveNote={saveNote}/>
            <Contact/>
        </>
    )
}

export default Notes2
