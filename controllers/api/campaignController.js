const router = require('express').Router();
const { Blog, User, Comment, Campaign, Character } = require('../../models');

// The `http://localhost:3000/api/campaign` endpoint

//CREATE CAMPAIGN
router.post('/', async (req, res) => {
    try {
      const campaignData = await Campaign.create({
        name: req.body.name,
        gm_id: req.session.user.id, //TODO: Need to fix this to reflect token use rather than sessions
        user_id: [],  //Also not sure about this one
        description: req.body.description,
        picture: req.body.picture
      })
      res.status(200).json(campaignData)
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: "an error occured", err: err });
      };
  });

//READ CAMPAIGN
router.get('/', async (req, res) => {
    try {
      const campaignData = await Campaign.findAll({
        include: [User, Character],
      });
      res.status(200).json(campaignData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const campaignData = await Campaign.findByPk(req.params.id, {
        include: [User, Character],
      });
  
      if (!campaignData) {
        res.status(404).json({ message: 'No Character found with that id!' });
        return;
      }
  
      res.status(200).json(campaignData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//UPDATE CAMPAIGN 
router.put('/:id', async (req, res) => {
    try {
      const campaignData = await Campaign.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!campaignData[0]) {
        res.status(404).json({ message: 'No Character with this id!' });
        return;
      }
      res.status(200).json(campaignData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//DELETE CAMPAIGN 
router.delete('/:id', async (req, res) => {
    try {
      const campaignData = await Campaign.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user.id //TODO: Need to fix this to reflect token use rather than sessions
        },
      });
      if (!campaignData) {
        res.status(404).json({ message: 'No Character with this id!' });
        return;
      }
      res.status(200).json(campaignData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


module.exports = router;