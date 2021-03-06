const validateActivityInput = require("../validation/create_activity");
const mongoose = require("mongoose");
const Activity = mongoose.model("Activity");

const createActivity = async data => {
  console.log("activity services");
  try {
    const { messages, isValid } = validateActivityInput(data);

    if (!isValid) {
      console.log("bad", messages);
      throw new Error(messages);
    }

    const { distance, unit, duration, sport, title, runType, 
          description, date, author 
          } = data;
    if(!author) {
      throw new Error("User must be signed in")
    }
    const activity = new Activity({
        distance, 
        unit, 
        duration, 
        sport, 
        title, 
        runType,
        description, 
        date,
        author
      })
        
    return activity.save();
    
  } catch (err) {
    throw err;
  }
}

module.exports = { createActivity };