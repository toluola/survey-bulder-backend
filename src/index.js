import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoute from "./routers/users";
import "./db/db";

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1", userRoute);

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));

export default app;
