import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import data from "./server-data/data";
import CheckWord from "./CheckWord";

let GameWord = data[Math.floor(Math.random() * data.length)];
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import { Session } from "inspector";

const session = expressSession;
const FileStore = sessionFileStore(session);

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req: Request, res: Response, next) => {
  const dataSentAsSessionWord = { chosenword: GameWord };
  req.session.data = dataSentAsSessionWord;
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.json({ welcome: 315070243 });
});

app.post("/", (req: Request, res: Response) => {
  console.log("POST");
  let a = req.session.data.chosenword;
  console.log("my guess-->", req.body.wordToCheck);
  console.log("word to guess-->", a);
  //sending to check users guess
  const results = CheckWord(a, req.body.wordToCheck.toLowerCase());
  res.json(results);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`imm on air !! ${port}`);
});
export default GameWord;

declare module "express-session" {
  interface SessionData {
    data: any;
  }
}
