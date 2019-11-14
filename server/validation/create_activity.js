const Validator = require("validator");

module.exports = function validateRouteInput(data) {

  let messages = {};

  if (Validator.isEmpty(data.sport)) {
    messages.sport = "Please choose a sport";
  }

  if (Validator.isEmpty(data.distance)) {
    message.distance = "Please enter a distance"
  }

  if (data.distance.isNaN) {
    messages.distance = "Please enter a number for distance";
  }

  return {
    messages,
    isValid: Object.values(messages).length === 0
  }
}