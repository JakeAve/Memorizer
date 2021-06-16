const { ScriptModel } = require("../../models/Script");

const editScript = async (req, res) => {
  try {
    const { id: scriptId } = req.params;
    const { content } = req.body;
    const script = await ScriptModel.findById(scriptId).exec();
    script.content = content;
    await script.save();
    res.json(script);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = editScript;
