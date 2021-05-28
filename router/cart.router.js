const express = require('express');
const router = express.Router();
const cors = require('cors');
const { extend } = require('lodash');
const  Cart  = require('../model/cart.model.js');

router.use(cors())

 
router.route('/')
.get(async (req,res)=>{
  const cartitems = await Cart.find({});
  res.json({success: true,cartitems})
})
.post(async (req,res)=>{
  const newCartItem = req.body;
  const AddItem = new Cart(newCartItem);
  const savedData = await AddItem.save();
  res.json({success: true,savedData});
})

router.param('productId',async (req,res,next,id)=>{
  try{
    const cartitem = await Cart.findById(id);
    if(!cartitem){
      return res.json({success: false, errorMesssgae: "Product not found"})
    }
    req.cart = cartitem;
    next();
  }catch(err){
    res.status(404).json({
      error:e.message
    })
  }
})

router.route('/:productId')
.get((req,res)=>{
  const { cart } = req;
  cart.__v = undefined;
  res.json({success: true,cart})
})
.post(async (req,res)=>{
  const { quantity } = req.body;
  const { _id } = req.cart;
  await Cart.findByIdAndUpdate(_id,{quantity});
  res.json({success:true,quantity});
})
.delete( async (req,res)=>{
  let { cart } = req;
  try{
    await cart.remove();
    res.json({success:true,deleted: true,cart})
  }catch(e){
    res.status(404).json({success: false, message: "not Deleted"})
    console.log(e);
  }
})

module.exports = router;