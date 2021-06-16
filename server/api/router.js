const { Router } = require("express");
const { validateToken } = require("../jwt");
const checkIfIsUser = require("./controller/checkIfIsUser");
const router = Router();

router.get("/user", validateToken, require("./controller/getUser"));
router.get("/scripts", validateToken, require("./controller/getScripts"));
router.post("/script", validateToken, require("./controller/addScript"));
router.put(
  "/script/:id",
  validateToken,
  checkIfIsUser,
  require("./controller/editScript")
);
router.delete(
  "/script/:id",
  validateToken,
  checkIfIsUser,
  require("./controller/deleteScript")
);
router.put(
  "/script/practice/:id",
  validateToken,
  checkIfIsUser,
  require("./controller/practiceScript")
);
router.put(
  "/script/memorize/:id",
  validateToken,
  checkIfIsUser,
  require("./controller/memorize")
);
router.put(
  "/script/forget/:id",
  validateToken,
  checkIfIsUser,
  require("./controller/forget")
);

module.exports = router;
