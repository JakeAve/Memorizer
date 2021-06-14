const { UserModel } = require("../../models/User");

const getScripts = async (req, res) => {
  try {
    const { _id } = req.user;
    const scripts = await UserModel.findById(_id).populate("scripts").exec();
    res.json(scripts.scripts);
    // res.json([
    //   {
    //     _id: "1",
    //     content: "abcdeft, asf jasdfu jasdfu uasdf jsdfu jsduf",
    //     memorized: false,
    //     lastPracticed: new Date("june 3, 2021"),
    //   },
    //   {
    //     _id: "2",

    //     content: "other script blah bla bla bla",
    //     memorized: true,
    //     lastPracticed: new Date("may 23, 2021"),
    //   },
    //   {
    //     _id: "3",

    //     content: "third script something",
    //     memorized: true,
    //     lastPracticed: new Date("june 2, 2021"),
    //   },
    // ]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getScripts;
