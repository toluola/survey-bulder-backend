import User from "../models/User";

const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const createUser = new User({ email, password, name });
    await createUser.save();
    const token = await createUser.generateAuthToken();
    res.status(201).json({ token });
  } catch (err) {
    if (err.keyPattern.email) {
      res.status(400).json({
        message: `The Email ${err.keyValue.email} already Exist`
      });
    } else {
      res.status(400).json({ message: "Server Error. Please Try Again" });
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUser(email);
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password!"
      });
    const token = await user.generateAuthToken();
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: "Server Error. Please try again later" });
  }
};

const viewUser = (req, res) => {
  res.status(200).json(req.user);
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const logoutAllUser = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export { createUser, loginUser, viewUser, logoutUser, logoutAllUser };
