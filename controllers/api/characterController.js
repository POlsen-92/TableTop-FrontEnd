const router = require('express').Router();
const { Character, User, Campaign} = require('../../models');

// The `http://localhost:3000/api/character` endpoint

//CREATE CHARACTER
router.post('/', async (req, res) => {
    try {
      const characterData = await Character.create({
        name: req.body.name,
        user_id: req.session.user.id
      })
      res.status(200).json(blogData)
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: "an error occured", err: err });
      };
  });



//READ CHARACTERS





//UPDATE CHARACTERS




//DELETE CHARACTER





module.exports = router;