import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from "../context/notes/NoteContext";
import NoteItems from './NoteItems';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom'; 


export default function Notes(props) {

    const context = useContext(NoteContext);
    const { notes, getallnote, editnote } = context;
    let navigate = useNavigate(); 

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etags: "" });

    useEffect(() => {
        if(localStorage.getItem('token')){
            getallnote();
        } else {
            navigate("/login");
            

        } 
    }, // eslint-disable-next-line 
    []); 
    
    

    const ref = useRef(null);
    const refClose = useRef(null);

    const handleUpdateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etags: currentNote.tags });
       
    };

    const handleClick = (e) => {
        e.preventDefault();
        editnote(note.id, note.etitle, note.edescription, note.etags);
        refClose.current.click();
        props.showAlert("Update Successfuly", "success");
    };


    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNotes showAlert={props.showAlert} />


            {/* Button to trigger the modal */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal component */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="etitle">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" placeholder="Enter Title" value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edescription">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Enter description" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="etags">Tags</label>
                                    <input type="text" className="form-control" id="etags" name="etags" placeholder="Enter tags" value={note.etags} onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section for rendering notes */}
            <h2 className='text-center'>NOTES</h2>
            <div className='row my-5'>
                <div className="container">{notes.length === 0 && 'No Notes Display'} </div>

                {notes.map((note) => {
                    return <NoteItems key={note._id} updatenote={handleUpdateNote} note={note} showAlert={props.showAlert} />;

                })}
            </div>
        </>
    );
}
