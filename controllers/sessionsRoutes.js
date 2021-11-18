const express = require('express');
const router = express.Router();

//check cookie

router.get('/',(req,res)=>{
    res.json(req.session);
})

module.exports = router;