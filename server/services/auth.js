const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../../config/keys');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateUserInfo = require("../validation/user_info");

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);
    if (!isValid) {
      throw new Error(message);
    }

    const { name, email, password } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('This user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(
      {
        name,
        email,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    user.save();

    const token = jwt.sign({ _id: user._id }, keys.secretOrKey);
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {
    const { message, isValid } = validateLoginInput(data);
    if (!isValid) {
      throw new Error(message);
    }

    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('wrong username/password combination');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('wrong username/password combination');

    const token = jwt.sign({ _id: user._id }, keys.secretOrKey);
    return { token, loggedIn: true, ...user._doc, password: null };

  } catch (err) {
    throw err;
  }
};

const logout = async id => {
  const user = await User.findById(id);
  const token = '';

  return { token, loggedIn: false, ...user._doc, password: null };
};

const verifyUser = async data => {
  try {
    const { token } = data;

    const decoded = jwt.verify(token, keys.secretOrKey);
    const { _id } = decoded;

    const [loggedIn, user] = await User.findById(_id).then(user => {
      return user ? [true, user] : [false, null];
    });

    if (user) {
      return { loggedIn, ...user._doc, password: null };
    } else {
      return { loggedIn };
    }
  } catch (err) {
    return { loggedIn: false };
  }
};

const updateUserInfo = async data => {
  try {
    // const { errors, isValid } = validateUserInfo(data);

    // if (!isValid) {
    //   throw new Error(errors);
    // }

    const { _id, birthDate, firstName, lastName, gender } = data;

    return User.findByIdAndUpdate(_id, {
      birthDate: new Date(birthDate),
      firstName,
      lastName,
      gender
    }).then(user => user);

  } catch (err) {
    throw err;
  }
};

const fetchCurrentUser = async data => {
  try {
    const { token } = data;

    const decoded = jwt.verify(token, keys.secretOrKey);
    const { _id } = decoded;

    const user = await User.findById(_id).then(user => (
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        birthDate: user.birthDate
      }
    ));

    return user;
  } catch (err) {
    return null;
  }
};

module.exports = {
  register,
  logout,
  login,
  verifyUser,
  updateUserInfo,
  fetchCurrentUser
};