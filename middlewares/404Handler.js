function notFoundHandler(req,res){
  res.status(404).json({success:false,message:"Route not found, please check"});
}

module.exports = { notFoundHandler }