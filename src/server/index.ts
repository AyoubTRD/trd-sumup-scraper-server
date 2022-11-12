import express from "express";
import cors from "cors";

import { sumupRouter } from "./routers/sumup.router";

export const app = express();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("The server is up and running on port " + port);
});

app.use(cors());

app.use("/sumup", sumupRouter);
