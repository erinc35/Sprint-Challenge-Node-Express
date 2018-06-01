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
  const { id } = req.params; 
  actionDb
    .get(id) 
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
  }else if(description.length > 128) {
    sendError(400, "Description can not exceed 128 characters", res);
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  actionDb
    .remove(id)
    .then(action => {
      if (action === 0) {
        sendError(
          404,
          `Action with id ${id} could not found, can not delete it.`,
          res
        );
        return;
      }
      res.json({ action });
    })
    .catch(error => {
      console.log(error);
      sendError(500, "Error deleting action", res);
      return;
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  if (!description) {
    sendError(400, "Must provide description", res);
    return;
  }
  actionDb
    .update(id, req.body)
    .then(response => {
      if (response == 0) {
        sendError(404, `Action with id ${id} could not found.`, res);
        return;
      }
      actionDb.get(id).then(action => {
        console.log(action);
        if (action.length === 0) {
          sendError(404, `Action with id ${id} could not found.`, res);
          return;
        }
        res.json({ action });
      });
    })
    .catch(message => {
      sendError(400, message, res);
      return;
    });
});


module.exports = router;
