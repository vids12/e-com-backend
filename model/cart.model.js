const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "Dataproduct"
  },
  quantity: Number
});

const Cartitem = mongoose.model("Cartitem",CartSchema);

module.exports = Cartitem;
