const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../Models/Notes');
const { body, validationResult } = require('express-validator');


router.get('/fetchnotes', fetchuser, async (req, res) => {


    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }


});




// Add Notes 
router.post('/addnote', fetchuser,
    [
        body('title', 'Title Must Be At Least 3 Characters Long').isLength({ min: 3 }),
        body('description', 'Description Must Be At Least 5 Characters Long').isLength({ min: 5 })
    ],
    async (req, res) => {
        const { title, description, tags } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const note = new Notes({
                title,
                description,
                tags,
                user: req.user.id
            });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('NOTES Saved Error');
        }
    });





// Update Note BY ID 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tags } = req.body;
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tags) { newNote.tags = tags };


    try {
        // Find The Note By ID 
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({ msg: 'NOTE NOT FOUND' });

        // Check If The User Owns The Note  
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }

        // Update The Note 
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// Delete Note by ID
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find The Note By ID
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).json({ msg: 'Note Not Found' });

        // Check If The User Owns The Note   
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Delete The Note 
        await Notes.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Note Removed' });
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
