const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  positions: [{
    type: Object
  }],
  date: {
    type: Date,
    default: Date.now()
  },
  travelMode: {
    type: String,
    required: true,
    enum: ["WALKING", "BICYCLING"]
  }
});

module.exports = mongoose.model('route', RouteSchema);