const checkIfIsUser = (req, res, next) => {
  const { id: scriptId } = req.params;
  if (!req.user.scripts.includes(scriptId))
    return res.status(403).json({ message: "Script does not belong to user" });

  next();
};

module.exports = checkIfIsUser;
