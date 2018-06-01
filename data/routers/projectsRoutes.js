const express = require("express");
const router = express.Router();
const db = require("../helpers/projectModel.js");

const sendError = (statusCode, message, res) => {
  res.status(statusCode).json({ errorMessage: message });
  return;
};

router.get("/", (req, res) => {
  db
    .get()
    .then(projects => {
      res.json({ projects });
    })
    .catch(error => {
      sendError(500, "The projects information could not be retrieved", error);
      return;
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(project => {
      if (project.length === 0) {
        sendError(404, `Project with id ${id} could not found`, res);
        return;
      }
      res.json({ project });
    })
    .catch(error => {
      sendError(500, "Error looking up project", res);
      return;
    });
});



module.exports = router;
