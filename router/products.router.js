const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Dataproduct } = require("../model/products.model");

router.use(cors())

router.route('/')
.get(async (req,res)=>{
  const products = await Dataproduct.find({});
  res.json({success:true,products});
})


router.route('/:id')
.get(async (req,res)=>{
  const { id } = req.params;
  const product = await Dataproduct.findById(id);
  res.json({success:true,product})
})


module.exports = router;