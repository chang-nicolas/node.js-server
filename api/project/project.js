const express = require("express");

const router = express.Router();

const project = require("../../models/project");

router.get("/", (req, res) => {
  project
    .find()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => res.json(err));
});

router.post("/add-project", (req, res) => {
  console.log(req.body);
  const newProject = new project({
    title: req.body.title,
    currency: req.body.currency,
    desc: req.body.description,
  });
  console.log(newProject);
  newProject.save().then(res.json({ msg: "Saved" }));
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  let myquery = { _id: req.params.id };
  project.deleteOne(myquery, function (err, result) {
    res.json({ msg: "success" });
  });
});

router.post("/update", (req, res) => {
  let myquery = { _id: req.body._id };
  // console.log(req.body)

  let newvalues = {
    $set: {
      title: req.body.title,
      desc: req.body.description,
      currency: req.body.currency,
    },
  };
  console.log(myquery);
  project.updateOne(myquery, newvalues, function (err, user) {
    if (err) res.json({ message: err });
    res.json(req.body);
  });
});

module.exports = router;
