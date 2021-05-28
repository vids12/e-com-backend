const mongoose = require('mongoose');
const { Schema } = mongoose;


const DataSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  image: String,
  price: Number,
  imageURL: String,
  inStock: Boolean,
  fastDelivery: Boolean,
  quantity: Number,
  ratings: Number,
  description: String,
  size: String,
  color: String,
  offer: String
});

const Dataproduct = mongoose.model('Dataproduct',DataSchema);


module.exports = { Dataproduct };
