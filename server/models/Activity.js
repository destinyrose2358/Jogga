const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  distance: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
  },
  duration: {
    type: Number,
  },
  sport: {
    type: String,
    required: true,
  },
  date: {
    type: Date
  },
  title: {
    type: String
  },
  runType: {
    type: String
  },
  description: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
});

module.exports = mongoose.model('Activity', ActivitySchema);
