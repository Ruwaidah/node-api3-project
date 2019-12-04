const express = require("express");

const router = express.Router();
router.use(express.json());

const userDb = require("./userDb");

router.post("/", (req, res) => {
  // do your magic!
  if (req.body.name) {
    userDb.insert(req.body).then(newuser => res.status(200).json(req.body));
  } else {
    res.status(400).json({ errorMessage: "Please provide name." });
  }
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
  userDb
    .get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error =>
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      })
    );
});

router.get("/:id", (req, res) => {
  // do your magic!
  userDb
    .getById(req.params.id)
    .then(user => {
      if (user) res.status(200).json(user);
      else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error =>
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      })
    );
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
  userDb
    .remove(req.params.id)
    .then(remove => {
      res.status(200).json(remove);
    })
    .catch(error =>
      res
        .status(500)
        .json({
          error: "There was an error while saving the comment to the data base"
        })
    );
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
