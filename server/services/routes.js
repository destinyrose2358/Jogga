const Route = require("../models/Route");
const validateRouteInput = require("../validation/create_route");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const createRoute = async data => {
  try {
    const { messages, isValid } = validateRouteInput(data);

    if (!isValid) {
      throw new Error(messages);
    }

    const { token, name, description, isPrivate, positions, travelMode } = data;
    const decoded = jwt.verify(token, keys.secretOrKey);
    const { _id } = decoded;

    const isUser = await User
      .findById(_id)
      .then(user => user ? true : false);

    if (!isUser) {
      throw new Error("Your credentials are not valid");
    } else {
      const route = new Route({
        name,
        description,
        isPrivate,
        positions,
        author: _id,
        travelMode
      },
      err => {
        if (err) throw err;
      });

      route.save();
      return route;
    }
  } catch (err) {
    throw err;
  }
};

const deleteRoute = async data => {
  const { token, _id } = data;

  const decoded = jwt.verify(token, keys.secretOrKey);
  const { _id: userId } = decoded;

  const route = await Route
    .findOne({_id, author: userId});
  
  if (!route) {
    throw new Error("You do not own this route");
  } else {
    return route.remove();
  }
};

module.exports = {createRoute, deleteRoute};