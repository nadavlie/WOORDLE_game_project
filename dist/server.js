"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_1 = __importDefault(require("./server-data/data"));
const CheckWord_1 = __importDefault(require("./CheckWord"));
let GameWord = data_1.default[Math.floor(Math.random() * data_1.default.length)];
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.json({ chosenword: GameWord });
});
app.post("/", (req, res) => {
    console.log("back to you....!");
    //sending to check users guess
    const results = (0, CheckWord_1.default)(GameWord, req.body.wordToCheck);
    res.json(results);
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`imm fucking on air !! ${port}`);
});
exports.default = GameWord;
