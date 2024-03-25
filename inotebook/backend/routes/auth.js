const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "PUTGOODWORDS";


/* 
router.get('/', (req,res)=> {
    console.log(req.body);
    res.send("Hello");
    res.send(req.body);
}) 

*/
/*
router.post('/', (req,res)=> {
    console.log(req.body);
    const user = new User(req.body);
    user.save();
    res.send(req.body); 

    
})
*/
router.post('/createuser', [
    body('name', 'Enter A Valid Name').isLength({ min: 5 }),
    body('email', 'Enter A Vaild Email').isEmail(),
    body('password', 'Must Be Minimum 5').isLength({ min: 5 })

], async (req, res) => {

    let success = false;

    // Checking For Validation Errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // Creating A New User With The Provided Details 
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Already Exist" });
        }

        /*
        bcryptjs : A Library To Help You Hash Passwords. 
        */

        const saltRounds = 10;
        const BodyPassword = req.body.password;
        const hashedPassword = await bcrypt.hash(BodyPassword, saltRounds);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,

        });

        // Creating A JSON Web Token
        const payload = {
            user: {
                id: user.id
            }
        };

        // Signing The Token => const jwtdata (authtoken) 
        const authtoken = jwt.sign(
            payload,
            JWT_SECRET
            /*
            { expiresIn: '1h' }, 
            (error, token) => {
                if (error) throw error;
                res.json({ token }); 
            }
            */
        );
        res.json({ success: true, authtoken: authtoken });




        /* 
        => Certainly, You Can Simplify The Code By Using Async/await Syntax Instead Of .then() 
        
        .then(user => res.json(user))
        
        .catch(error => {
            console.error("Error Saving user: ", error);
            res.status(500).send('Server Error');
            res.status(500).json({ error: 'Please Enter Unique Value', message: error.message });
    
        });
        */
        // res.json(user); {No More Needed Due TO JSW Token}

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");


    }



});

// For Login 
router.post('/login', [
    body('email', 'Enter A Vaild Email').isEmail(),
    body('password', 'Pssword Cant Be Blank').exists()

], async (req, res) => {

    // Checking For Validation Errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Please Try TO Login With Correct Credentials" });

        }

        const ComparePassword = await bcrypt.compare(password, user.password);
        if (!ComparePassword) {
            success = false
            return res.status(400).json({ success, error: "Please Try To Login With Correct Credentials" });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(
            payload,
            JWT_SECRET
        );

        res.json({ success: true, authtoken: authtoken });




    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');

    }

});

// Router 3 : Get Logged User Deatils Using POST "/api/auth/getuser" Login Required 

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error Get User');
    }
});


module.exports = router