const express = require('express');
const router = express.Router();
const cors = require('cors');
const { extend } = require('lodash');
const  Wishlist  = require('../model/wishlist.model.js');

router.use(cors())

 
router.route('/')
.get(async (req,res)=>{
  const wishlistitem = await Wishlist.find({});
  res.json({success: true,wishlistitem})
})
.post(async (req,res)=>{
  const newWishlistItem = req.body;
  const AddItem = new Wishlist(newWishlistItem);
  const savedData = await AddItem.save();
  res.json({success: true,savedData});
})

router.param('productId',async (req,res,next,id)=>{
  try{
    const wishlistitem = await Wishlist.findById(id);
    if(!wishlistitem){
      return res.json({success: false, errorMesssgae: "Product not found"})
    }
    req.wishlist = wishlistitem;
    next();
  }catch(err){
    res.status(404).json({
      error:e.message
    })
  }
})

router.route('/:productId')
.get((req,res)=>{
  const { wishlist } = req;
  wishlist.__v = undefined;
  res.json({success: true,wishlist})
})
.delete( async (req,res)=>{
  let { wishlist } = req;
  try{
    await wishlist.remove();
    res.json({success:true,deleted: true,wishlist})
  }catch(e){
    res.status(404).json({success: false, message: "not Deleted"})
    console.log(e);
  }
})

module.exports = router;