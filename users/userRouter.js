const express = require("express");

const router = express.Router();
router.use(express.json());

const userDb = require("./userDb");

//  POST method -- Create a user
router.post("/", (req, res) => {
  if (req.body.name) {
    userDb.insert(req.body).then(newuser => res.status(200).json(req.body));
  } else {
    res.status(400).json({ errorMessage: "Please provide name." });
  }
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

// Get All Users
router.get("/", (req, res) => {
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

//  Get One User By Id
router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

// Get the User Posts
router.get("/:id/posts", (req, res) => {
  // do your magic!
});

//  Delete Mothod === delete User
router.delete("/:id", (req, res) => {
  userDb
    .getById(req.params.id)
    .then(user => {
      if (user) {
        userDb
          .remove(req.params.id)
          .then(remove => {
            res.status(200).json(remove);
          })
          .catch(error =>
            res.status(500).json({
              error:
                "There was an error while saving the comment to the data base"
            })
          );
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      });
    });
});

// PUT method Update A User
router.put("/:id", (req, res) => {
  userDb
    .getById(req.params.id)
    .then(user => {
      if (user) {
        if (req.body.name) {
          userDb
            .update(req.params.id, req.body)
            .then(update => res.status(202).json(req.body))
            .catch(error => {
              res.status(500).json({
                error:
                  "There was an error while saving the comment to the database"
              });
            });
        } else {
          res.status(400).json({ errorMessage: "Please provide name." });
        }
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the data  base"
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  userDb
    .getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(error =>
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      })
    );
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
