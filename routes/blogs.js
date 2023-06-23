const express= require('express')
const { User } = require('../models/User');
const { Blog } = require('../models/Blogs');
const router = express.Router();

// ajouter
router.post('', async (req, res) => {
    const { title, author, content, date } = req.body;

    // Validation
    if (!title || !author || !content || !date)
        return res.status(400).json({ message: 'Title, author, content, and date are required' });

    // Create a new blog instance
    const blog = new Blog({
        title,
        author,
        content,
        date
    });


    const login = req.session.login;

    try {
        const dataBlog = await blog.save();
        const user = await User.findOne({ login });
        user.blogs.push(dataBlog);
        const data = await user.save();
        res.json(data.blogs[data.blogs.length - 1]);
    } catch (err) {
        res.status(500).send({ message: err });
    }
});



// Get blog posts
router.get('', async (req, res) => {
    const login = req.session.login;
    const user = await User.findOne({ login });
    const nbr = req.query.nbr || user.blogs.length;
  
    // Include user._id along with the blog data
    const dataToSend = {
      blogs: user.blogs.map((blog) => {
        return {
          id: blog._id,
          title: blog.title,
          author: blog.author,
          content: blog.content,
          date: blog.date,
        };
      }),
    };
  
    res.json(dataToSend);
  });
  


router.delete('/:idBlog', async (req, res) => {
    const idBlog = req.params.idBlog;
    const login = req.session.login;

    try {
        const user = await User.findOne({ login });

        if (!user.blogs.find(blog => blog._id == idBlog))
            throw 'Not allowed, sorry';

        // Remove from the blogs collection
        await Blog.findByIdAndDelete(idBlog);

        // Remove from the user's blogs
        user.blogs.remove({ _id: idBlog });
        await user.save();

        res.json({ message: 'Deleted with success' });
    } catch (err) {
        res.status(500).send({ message: err });
    }
});


module.exports.blogsRouter= router;


