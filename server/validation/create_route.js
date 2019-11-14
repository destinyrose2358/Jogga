const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateRouteInput(data) {
  data.name = validText(data.name) ? data.name : "";
  data.description = validText(data.description) ? data.description : "";

  let messages = {};

  if (Validator.isEmpty(data.name)) {
    messages.name = "Name cannot be empty";
  }

  if (data.isPrivate !== true && data.isPrivate !== false) {
    messages.isPrivate = "Privacy status must be a boolean";
  }

  if (!data.positions) {
    messages.positions = "Positions must be supplied"
  }

  if (data.positions.some(position => !Validator.isLatLong(`${position.lat},${position.lng}`))) {
    messages.positions = "Atleast one position is not a valid position"
  }

  return {
    messages,
    isValid: Object.values(messages).length === 0
  }
}