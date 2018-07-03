const express = require('express'); 
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');


router.get('/', (req,res,next) => {                         
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req,res,next) => {
    Blog
        .find({featured: "yes"})
        .then(featuredBlogs => {
            res.status(200).json(featuredBlogs);
        });
});

router.get('/notfeatured', (req,res,next) => {
    Blog
        .find({featured: "no"})
        .then(featuredBlogs => {
            res.status(200).json(featuredBlogs);
        });
});

router.get('/:id', (req,res,next) => {                       
    const id = req.params.id;
    Blog
        .findById(id)                                    
        .then(foundBlog => {
            if(foundBlog){
            res.status(200).json(foundBlog);
            } else {
            res.status(404).json({message: 'No valid entry for this id!'});    
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.post('/', (req,res,next) => {                                 
    User.findById(req.body.author)                                 
    .then(user => {                                                 
    
        const newBlog = new Blog(req.body);               
    
        newBlog.author = user._id;                              
     
        return newBlog.save();
    })

    let dbUser = null;

    User.findById(req.body.author)
    .then(user => {
    
        dbUser = user;

        const newBlog = new Blog(req.body);

        newBlog.author = user._id;

        return newBlog.save();
    })
    .then(blog => {
      
        dbUser.blogs.push(blog);

        dbUser.save().then(() => res.status(201).json(blog));
    })

});

router.put('/:id', (req,res,next) => {                           
    const id = req.params.id;

    Blog
        .findByIdAndUpdate(id, req.body)
        .then(updatedBlog => {
            res.status(204).json(updatedBlog);
        });
});

router.delete('/:id', (req,res,next) => {                           
    const id = req.params.id;
    Blog
        .findByIdAndRemove(id)
        .then(deletedBlog => {
            res.status(200).json();
        })
});

module.exports = router;
