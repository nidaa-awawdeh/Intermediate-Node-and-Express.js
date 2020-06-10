// helpful middleware to make sure the username stored on the token is the same as the request
function ensureCorrectUser(req, res, next) {
  try {
    const authHeaderValue = req.headers.authorization;
    const token = jwt.verify(authHeaderValue, SECRET);
    if (token.username === req.params.username) {
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

router.get("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    return res.json({ message: "You made it!" });
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
