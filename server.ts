import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ a: "im happy now! cigi!" });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`imm fucking on air !! ${port}`);
});
