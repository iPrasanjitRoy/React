import React, { useContext, useState } from 'react'; 
import NoteContext from "../context/notes/NoteContext"


const AddNotes = (props) => {

    const context = useContext(NoteContext);
    const { addnote } = context; 

    const [note, setNote] = useState({ title: "", description: "", tags: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tags);
        setNote({ title: "", description: "", tags: "" }); 
        props.showAlert("Added Successfuly", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.id]: e.target.value });
    };

    return (
        <div>

            <h1 className='text-center'>ADD NOTES</h1>

            <div className="container my-5">
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Enter Title" value={note.title} onChange={onChange} minLength={5} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" placeholder="Enter description" value={note.description} onChange={onChange} minLength={5} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tags">Tags</label>
                        <input type="text" className="form-control" id="tags" placeholder="Enter tags" value={note.tags} onChange={onChange} minLength={5} required/>
                    </div>

                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>

                </form>
            </div>


        </div>
    )
}

export default AddNotes
