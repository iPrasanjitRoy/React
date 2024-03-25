import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";


    const [notes, setNotes] = useState([]);

    const getallnote = async () => {
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
               'auth-token':  localStorage.getItem('token')

            }
          });
        const data = await response.json()
        console.log(data);
        setNotes(data)
    };  


    const addnote = async (title, description, tags) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':  localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tags })
        });
        const json = await response.json();
        const newNote = json;
        setNotes([...notes, newNote]);
    };


    const editnote = async (id, title, description, tags) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':  localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tags })
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes)); 


        for (let index = 0; index < newNotes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tags = tags; 
                break;
            } 
          
        }
        setNotes(newNotes);  
    }






    const deletenote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token':  localStorage.getItem('token')
            },
           
        });
        const json = response.json();
        console.log(json)  

        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    };


    return (
        <NoteContext.Provider value={{ notes, addnote, editnote, deletenote, getallnote }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;
