const mongoose = require('mongoose');
const userName = process.env['userName']
const password = process.env['password']

async function connectDB(){
  try{
    await mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.qqbkb.mongodb.net/inventory?retryWrites=true&w=majority`,{useNewUrlParser:true,
    useUnifiedTopology:true
    });
    console.log("Successfully Connected!!");
  }catch(e){
    console.log("Not Connected",e);
  }
}

module.exports = { connectDB };


