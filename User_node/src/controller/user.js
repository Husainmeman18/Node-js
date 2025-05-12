const mongoose = require("mongoose");
const { UserData } = require("../model/model");
const { genOTP, SendEmail } = require("../utils/email");

const getAll = async (req, res) => {
  const user = await UserData.find();
  return res.json({
    data: user,
  });
};

const getOne = async (req, res) => {
  const userId = req.params["User_id"];

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const userone = await UserData.findOne({ _id: userId });

    if (!userone) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      data: userone,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: "Server error" });
  }
};

const createOne = async (req, res) => {
  const bodyData = req.body;

  if (!bodyData.Username) {
    return res.status(400).json({ error: "Username is required" });
  }
  if (!bodyData.Email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!bodyData.Password) {
    return res.status(400).json({ error: "Password is required" });
  }
  if (!bodyData.PhoneNo) {
    return res.status(400).json({ error: "PhoneNo is required" });
  }
  if (!bodyData.Address) {
    return res.status(400).json({ error: "Address is required" });
  }
  if (!bodyData.Gender) {
    return res.status(400).json({ error: "Gender is required" });
  }

  try {
    const createdUser = await UserData.create({
      Username: bodyData.Username,
      Email: bodyData.Email,
      Password: bodyData.Password,
      PhoneNo: bodyData.PhoneNo,
      Address: bodyData.Address,
      Gender: bodyData.Gender,
    });

    return res.json({
      msg: "User created successfully",
      data: createdUser,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
};

const deleteOne = async (req, res) => {
  const userId = req.params["User_id"];

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      error: "Invalid user ID format.",
    });
  }

  try {
    const user = await UserData.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    await user.deleteOne();

    return res.json({
      msg: "User deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occurred while deleting the user.",
      details: error.message,
    });
  }
};

const updateOne = async (req, res) => {
  const userId = req.params["User_id"];
  const bodyData = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      error: "Invalid userId, Please provide valid mongoDB objectId",
    });
  }

  if (!bodyData || Object.keys(bodyData).length === 0) {
    return res.status(400).json({
      error: "no data provide to update",
    });
  }

  try {
    const user = await UserData.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    const updatedUser = await UserData.findByIdAndUpdate(userId, bodyData, {
      new: true,
    });

    return res.json({
      msg: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "an error when updating user",
      details: error.message,
    });
  }
};

const Login = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email && !Password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  try {
    const User = await UserData.findOne({ Email });

    if (!User) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (User.Password !== Password) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }
    req.session.User = {
      Username: User.Username,
    };

    // const fakeToken = token-${User._id}-${Date.now()};

    return res.json({
      msg: "Login successful",
      // token: fakeToken,  
      user: {
        id: User._id,
        Username: User.Username,
        Email: User.Email,
        Address: User.Address,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "An error occurred during login",
      details: error.message,
    });
  }
};
const Logout = (req, res) => {
  req.session.destroy();
  req.json({
    msg: "Logout successfully",
  });
};

const sendOTP = async (req,res) =>{
  const {Email} = req.body

  const user = await UserData.findOne({Email:Email})

  if(!user) return res.json({msg:"user not found"})
    
  const OTP = genOTP()

  const msg = "This is Your OTP" + OTP

  await SendEmail(Email,"This is my subject",msg)

  // OTP_STORE[Email] = {OTP:OTP , time:(Date.now() + 90000)}

  return res.json({msg:"OPT SENDED"})
}

module.exports = {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
  Login,
  Logout,
  sendOTP
};
