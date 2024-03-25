import React, { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext"


const NoteItems = (props) => {

    const { note, updatenote } = props // Destructure The Props

    const context = useContext(NoteContext);
    const { deletenote } = context;


    return (
        <div className="col-md-4">
            <div className="card my-4" >
                <div className="card-body">

                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="bi bi-archive-fill mx-2" onClick={() => { deletenote(note._id); props.showAlert("Delete Successsfully", "success"); }}> </i>
                        <i className="bi bi-pen-fill mx-2" onClick={() => { updatenote(note);  }}></i>
                    </div>


                    <p className="card-text">{note.description}</p>




                </div>
            </div>
        </div>

    )
}


export default NoteItems
