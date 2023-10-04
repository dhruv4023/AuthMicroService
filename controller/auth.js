import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";
import { deleteFile, renameAndMove } from "../helper/fileDirOperations.js";
/*REGISTER USER*/
export const registerControl = async (req, res) => {
  // console.log();
  const _file = req.file;
  try {
    const { firstName, lastName, username, email, password, friends, about } =
      req.body;
    const location = {
      state: req.body["location.state"],
      district: req.body["location.district"],
      city: req.body["location.city"],
      pincode: req.body["location.pincode"],
    };
    const user = await Users.findOne({ email: email });
    if (user) {
      _file && deleteFile(_file.path);
      return res.status(400).json({ msg: "user already exist !" });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new Users({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      about: about,
      password: passwordHash,
      friends: friends,
      location: location,
    });
    const savedUser = await newUser.save();
    if (_file) {
      const picPath = renameAndMove("user/" + newUser._id, _file.originalname);
      await Users.findByIdAndUpdate(newUser._id, {
        $set: { picPath: picPath },
      });
    }
    res.status(200).json({ msg: "SAVE SUCCESFULLY" });
  } catch (error) {
    _file && deleteFile(_file.path);
    res.status(500).json({ msg: "something went wrong" });
  }
};

export const getUserNames = async (req, res) => {
  try {
    const useNames = await Users.distinct("username");
    // console.log(useNames)
    res.status(200).json(useNames);
  } catch (error) {
    res.status(404).json("Service not available");
  }
};

export const loginControl = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      $or: [{ email: email }, { username: email }],
    });
    // console.log(user);
    if (!user)
      return res
        .status(400)
        .json({ exist: false, mess: "user doesn't exist !" });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ exist: false, mess: "Invalid credintials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT);
    delete user.password;

    res.status(200).json({ exist: true, token, user });
  } catch (error) {
    res.status(500).json({ exist: false, mess: "failed to login" });
  }
};

export const changePassControl = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ exist: false, msg: "user doesn't exist !" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    await Users.findByIdAndUpdate(user._id, {
      $set: { password: passwordHash },
    });
    res.status(200).json({ msg: "Password Changed successfully !" });
  } catch (error) {
    res.status(500).json({ msg: "failed to Change password" });
  }
};

export const updateRegisteredData = async (req, res) => {
  // console.log();
  const _file = req.file;
  try {
    const { id: _id } = req.params;
    const {
      firstName,
      lastName,
      username,
      email,
      friends,
      about,
      location,
      socialLinks,
    } = req.body;
    // console.log(req.body);
    const user = await Users.findOne({ username: _id });
    if (user.email !== email && (await Users.findOne({ email: email }))) {
      _file && deleteFile(_file.path);
      return res.status(400).json({ msg: "Email Already Used !" });
    }
    await Users.findOneAndUpdate(
      { username: _id },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          about: about,
          friends: friends,
          location: location,
          socialLinks: socialLinks,
        },
      }
    );
    if (_file) {
      try {
        deleteFile("public/" + user.picPath);
      } catch (error) {}
      const picPath = renameAndMove("user/" + _id, _file.originalname);
      await Users.findOneAndUpdate(
        { username: _id },
        {
          $set: { picPath: picPath },
        }
      );
    }
    const userDt = await Users.findOne({ username: _id });
    // console.log(userDt)
    res.status(200).json({ user: userDt });
  } catch (error) {
    _file && deleteFile(_file.path);
    res.status(500).json({ msg: "Server Error" });
  }
};
