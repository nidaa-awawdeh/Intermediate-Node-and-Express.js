// helpful middleware to make sure the user is logged in
function ensureLoggedIn(req, res, next) {
  try {
    const authHeaderValue = req.headers.authorization;
    const token = jwt.verify(authHeaderValue, SECRET);
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

router.get("/secret", ensureLoggedIn, async function (req, res, next) {
  try {
    return res.json({ message: "You made it!" });
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
