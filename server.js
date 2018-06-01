const express = require("express"),
  server = express(),
  cors = require("cors"),
  port = 5555;

const projectsRouter = require("./data/routers/projectsRoutes"),
  actionsRouter = require("./data/routers/actionsRoutes");

server.use(express.json());
server.use(cors());
server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);

server.listen(port, () => console.log(`Server running on port ${port}`));
