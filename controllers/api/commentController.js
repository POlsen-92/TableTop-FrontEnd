const router = require('express').Router();
const { Comment, Blog, User} = require('../../models');

// The `http://localhost:3000/api/comments` endpoint

// create a new Comment 
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
      name: req.session.user.name,
      description: req.body.description,
      blog_id: req.body.blogid,
      user_id: req.session.user.id
    })
    res.status(200).json(commentData)
    console.log('it worked')
  } catch(err) {
      console.log(err);
      res.status(400).json({ message: "an error occured", err: err });
    };
});

// find all Comments. be sure to include its associated Blogs
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [Blog],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one Comment by its `id` value. be sure to include its associated Comments
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [Blog],
    });

    if (!commentData) {
      res.status(404).json({ message: 'No Comment found with that id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a Comment by its `id` value 
router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user.id
      },
    });
    if (!commentData[0]) {
      res.status(404).json({ message: 'No Comment with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a Comment by its `id` value 
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user.id
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No Comment with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;