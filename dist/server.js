"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_1 = __importDefault(require("./server-data/data"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    let index = Math.floor(Math.random() * data_1.default.length);
    console.log("inddex-->", index);
    res.json({ chosenword: data_1.default[index] });
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`imm fucking on air !! ${port}`);
});
