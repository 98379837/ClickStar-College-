router.get("/", async (req, res) => {
  const q = req.query.q;
  const result = await User.find({ role: "photographer", username: new RegExp(q, "i") });
  res.json(result);
});