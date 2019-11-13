const Route = require("../models/Route");

const createRoute = async data => {
  try {
    const { message, isValid } = validateRouteInput(data);
    if (!isValid) {
      throw new Error(message);
    }

    const { name, description, isPrivate, positions } = data;
    
  }
}