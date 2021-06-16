const { ScriptModel } = require("../../models/Script");

const deleteScript = async (req, res) => {
  try {
    const { id: scriptId } = req.params;

    const index = req.user.scripts.findIndex(({ _id }) => _id === scriptId);
    req.user.scripts.splice(index, 1);
    await req.user.save();
    await ScriptModel.findByIdAndDelete(scriptId).exec();

    res.json({ _id: scriptId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = deleteScript;
