import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import data from "./server-data/data";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  let index = Math.floor(Math.random() * data.length);
  console.log("inddex-->", index);
  res.json({ chosenword: data[index] });
});

app.post("/checkword",(req,res)=>{
  
})




const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`imm fucking on air !! ${port}`);
});
