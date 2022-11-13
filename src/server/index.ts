import path from "path";
import express from "express";
import cors from "cors";

import { sumupRouter } from "./routers/sumup.router";

export const app = express();

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log("The server is up and running on port " + port);
});

app.use(express.static(path.join(__dirname, "../static"), {
  dotfiles: "allow"
}));

app.use(cors());

app.use("/sumup", sumupRouter);

app.use("/*", (req, res) => {
  return res.status(404).send("You are lost in the beautiful universe of the web");
})
