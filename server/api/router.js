const { Router } = require("express");
const { validateToken } = require("../jwt");
const router = Router();

router.get("/user", validateToken, require("./controller/getUser"));
router.get("/scripts", validateToken, require("./controller/getScripts"));
router.post("/script", validateToken, require("./controller/addScript"));
router.put("/memorize", validateToken, require("./controller/memorize"));

module.exports = router;
