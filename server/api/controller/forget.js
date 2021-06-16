const { ScriptModel } = require("../../models/Script");

const forget = async (req, res) => {
  try {
    const { id: scriptId } = req.params;

    const script = await ScriptModel.findById(scriptId).exec();
    script.memorized = false;
    await script.save();

    res.json(script);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = forget;
