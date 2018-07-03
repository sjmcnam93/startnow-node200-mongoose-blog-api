const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');

router.get('/', (req,res,next) => {                                    
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:id', (req,res,next) => {                                 
    const id = req.params.id;
    User
        .findById(id)
        .then(showUser => {
            if(showUser){
            res.status(200).json(showUser);
            } else {
            res.status(404).json({message: "This user does not exist!"})
            }
        })
        .catch(err => {
            res.status(500).json({errormessage: err}); 
        });
    });

router.get('/lastname/:lastname', (req,res,next) => {
    const lastname = req.params.lastname;
    User
    .find({lastName: lastname})
    .then(usersThatMatch => {
        res.status(200).json(usersThatMatch);
    });
});

router.post('/', (req, res, next) => {                                
    const user = new User(req.body);
    user
    .save()     
    .then(postedUser => {
        res.status(201).json(postedUser);
    })
    .catch(err => console.log(err));

});

router.put('/:id', (req,res,next) => {                                
    id = req.params.id;
    User
        .findByIdAndUpdate(id, req.body)
        .then(updatedUser => {
            res.status(204).json(updatedUser);
        });
} );

router.delete('/:id', (req,res,next) => {                           
    const id = req.params.id;
    User
    .findByIdAndRemove(id)
    .then(deletedUser => {
        res.status(200).json();
    });
});

module.exports = router;
