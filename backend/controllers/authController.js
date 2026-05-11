const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

/**************User Register *********************/

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, securityQuestions } = req.body;

    if ( !name || !email || !phone || !password || !securityQuestions || securityQuestions.length !== 3 ) {
      return res.status(400).json({ message: "All fields + 3 security questions are required" });
    }

    const userExists = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists ..." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const hashedQuestions = await Promise.all(
      securityQuestions.map(async (q) => ({
          question: q.question,
          answer: await bcrypt.hash(q.answer, 10),
      }))
    );
    
    const user = await User.create({
      name,
      phone,
      email,
      password: hashPass,
      securityQuestions: hashedQuestions,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role : user.role,
      token: generateToken(user._id),
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/************** User Login **************/

const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "please provide username and password. " });
    }

    const user = await User.findOne({
      $or: [{ email: username.trim() }, { phone: username }],
    });

    console.log(user);

    const pass = await bcrypt.compare(password, user.password);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    if (!pass) {
      res.status(401).json({ message: "Invalid password ..." });
    }
    console.log(pass);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*-------------Forget Password ------------------*/

const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({
      $or: [{ email: username }, { phone: username }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 send only questions
    const questions = user.securityQuestions.map((q) => q.question);

    res.json({ userId: user._id, questions });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*-----------------------------Reset Password ---------------------*/ 

const resetPassword = async (req, res) => {
  try {
    const { userId, answers, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 CHECK ALL ANSWERS
    for (let i = 0; i < user.securityQuestions.length; i++) {
      const isMatch = await bcrypt.compare(
        answers[i],
        user.securityQuestions[i].answer
      );

      if (!isMatch) {
        return res.status(400).json({
          message: "Incorrect answers",
        });
      }
    }

    // 🔐 HASH NEW PASSWORD
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
