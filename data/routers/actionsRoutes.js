const express = require("express");
const router = express.Router();
const actionDb = require("../helpers/actionModel.js");
const projectDb = require("../helpers/projectModel.js");

const sendError = (statusCode, message, res) => {
  res.status(statusCode).json({ errorMessage: message });
  return;
};

router.get("/", (req, res) => {
  actionDb
    .get()
    .then(actions => {
      res.json({ actions });
    })
    .catch(error => {
      sendError(500, "The actions information could no tbe retrieved", error);
      return;
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params; // pull id off of req.params;
  actionDb
    .get(id) // invoke proper db.method(id) passing it the id.
    .then(action => {
      if (action.length === 0) {
        sendError(404, `action with id ${id} could not found`, res);
        return;
      }
      res.json({ action });
    })
    .catch(error => {
      sendError(500, "Error looking up action", res);
      return;
    });
});

router.post("/", (req, res) => {
  const { description, project_id } = req.body;
  if ((!description, !project_id)) {
    sendError(400, "Must provide description and project id", res);
    return;
  }
  actionDb
    .insert(req.body)
    .then(response => {
      actionDb.get(response.id).then(action => {
        res.json({ action });
      });
    })
    .catch(error => {
      console.log(error);
      sendError(400, error, res);
      return;
    });
});


module.exports = router;
