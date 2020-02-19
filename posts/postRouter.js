const express = require("express");
const posts = require("./postDb");
const router = express.Router();

// Tested via insomnia and working!
router.get("/", (req, res, next) => {
  posts
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      next(err);
    });
});

// Tested via insomnia and working!
router.get("/:id", validatePostId(), (req, res, next) => {
  posts
    .getById(req.params.id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      next(err);
    });
});

// Tested via insomnia and working!
router.delete("/:id", validatePostId(), (req, res, next) => {
  posts
    .remove(req.params.id)
    .then(resposne => {
      res.status(200).json({
        message: "Post has been deleted."
      });
    })
    .catch(err => {
      next(err);
    });
});

// Tested via insomni and working!
router.put("/:id", validatePostId(), (req, res, next) => {
  posts
    .update(req.params.id, req.text)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

// custom middleware
function validatePostId() {
  return (req, res, next) => {
    posts
      .getById(req.params.id)
      .then(post => {
        if (post) {
          req.post = post;
          next();
        }
      })
      .catch(err => {
        next(err);
      });
  };
}

function validatePostId() {
  return (req, res, next) => {
    posts
      .getById(req.params.id)
      .then(post => {
        if (post) {
          req.post = post;
          next();
        } else {
          res.status(400).json({ message: "could not find post with ID" });
        }
      })
      .catch(err =>
        res.status(500).json({ message: "error getting post with this ID" })
      );
  };
}

function validatePost() {
  return (req, res, next) => {
    resource = {
      text: req.body.text
    };
    if (!req.body.text) {
      return res.status(404).json({
        message: "Missing post data."
      });
    } else {
      req.text = resource;
      next();
    }
  };
}

module.exports = router;
