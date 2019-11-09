const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateUserInfo(data) {

  const date = new Date();

  data.name = validText(data.name) ? data.name : '';
  data.gender = validText(data.gender) ? data.gender : '';
  data.birthDate = validText(data.birthDate) ? data.birthDate : '';
  let errors = {}

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  if (Validator.isIn(data.gender, ["female", "male", "other"])) {
     errors.gender = "Please select one of the provided options";
  }

  if (Validator.isEmpty(data.birthDate)) {
    errors.birthDate = 'Date field is required';
  }

  date.setFullYear(date.getFullYear() - 18);
  if (!Validator.isBefore(data.birthDate, date.toISOString())) {
    errors.birthDate = 'Must be at least 18 years old';
  }
  
  date.setFullYear(date.getFullYear() - 102);
  if (!Validator.isAfter(data.birthDate, date.toISOString())) {
    errors.birthDate = 'Are you sure you should be running?';
  }
  
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  return {
    errors,
    isValid: Object.values(errors).length === 0 ? true : false
  };
};