const router = require('express').Router();
const { Blog, User, Comment} = require('../../models');

// The `http://localhost:3000/api/blogs` endpoint

// create a new Blog  
router.post('/', async (req, res) => {
    try {
      const blogData = await Blog.create({
        name: req.body.name,
        description: req.body.description,
        user_id: req.session.user.id
      })
      res.status(200).json(blogData)
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: "an error occured", err: err });
      };
  });

// find all Blogs. be sure to include its associated User and Comments
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [User, Comment],
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one Blog by its `id` value. be sure to include its associated User and Comments
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [User, Comment],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with that id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a Blog by its `id` value 
router.put('/:id', async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user.id
      },
    });
    if (!blogData[0]) {
      res.status(404).json({ message: 'No Blog with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a Blog by its `id` value 
router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user.id
      },
    });
    if (!blogData) {
      res.status(404).json({ message: 'No Blog with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;