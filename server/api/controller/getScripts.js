const { UserModel } = require("../../models/User");

const getScripts = async (req, res) => {
  try {
    const { _id } = req.user;
    const scripts = await UserModel.findById(_id).populate("scripts").exec();
    res.json(scripts.scripts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getScripts;
