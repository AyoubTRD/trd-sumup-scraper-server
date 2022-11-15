import path from "path";
import fs from "fs";
import https from "https";

import express from "express";
import morgan from "morgan";
import cors from "cors";

import { sumupRouter } from "./routers/sumup.router";

export const app = express();

app.use(cors());
app.use(morgan("short"));

console.log("Serving static files from: ", path.join(__dirname, "../../static"))

app.use(
  express.static(path.join(__dirname, "../../static"), {
    dotfiles: "allow",
  })
);

app.use("/sumup", sumupRouter);

app.use("/*", (req, res) => {
  return res
    .status(404)
    .send("You are lost in the beautiful universe of the web");
});

const port = process.env.PORT || 80;

const privateKey = fs.readFileSync("/etc/letsencrypt/live/api.trdsoftwares.com/privkey.pem");
const fullChain = fs.readFileSync("/etc/letsencrypt/live/api.trdsoftwares.com/fullchain.pem");

if (privateKey && fullChain) {
  console.log("Starting up a production https server....");
  https.createServer({
    key: privateKey,
    cert: fullChain
  }, app).listen(443, () => {
    console.log("The server is up and running on port ", 443);
  });
} else {
  app.listen(port, () => {
    console.log("The server is up and running on port: ", port);
  })
}
