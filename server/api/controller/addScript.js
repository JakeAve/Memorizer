const { ScriptModel } = require("../../models/Script");

const addScript = async (req, res) => {
  try {
    const { content, title } = req.body;
    const script = await ScriptModel.create({ content, title });
    req.user.scripts.push(script);
    await req.user.save();
    res.json(script);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = addScript;
