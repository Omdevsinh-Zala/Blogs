const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router("server/db.json");

server.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);

const middleware = (req, res, next) => {
  console.log(req.methods)
  next();
};
server.use(middleware);
server.use("/api", router);
server.listen(3000, () => {
  console.log("server is running");
});
