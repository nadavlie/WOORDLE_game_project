import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import data from "./server-data/data";
import CheckWord from "./CheckWord";
let GameWord = data[Math.floor(Math.random() * data.length)];

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  console.log("----->", GameWord, req.body);
  res.json({ chosenword: GameWord });
});

app.post("/", (req: Request, res: Response) => {
  console.log("back to you....!");
  console.log("req.body-->", req.body);
  //sending to check users guess
  const results = CheckWord(GameWord, req.body.wordToCheck.toLowerCase());
  res.json(results);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`imm fucking on air !! ${port}`);
});
export default GameWord;
