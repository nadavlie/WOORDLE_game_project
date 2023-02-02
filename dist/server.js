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
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const session = express_session_1.default;
const FileStore = (0, session_file_store_1.default)(session);
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
}));
app.get("/", (req, res) => {
    console.log("----->", GameWord, req.body);
    const dataSentAsSessionWord = { chosenword: GameWord };
    req.session.data = dataSentAsSessionWord;
    res.json({ welcome: 315070243 });
});
app.post("/", (req, res) => {
    console.log("back to you....!");
    console.log("req.body-->", req.body);
    //sending to check users guess
    const results = (0, CheckWord_1.default)(GameWord, req.body.wordToCheck.toLowerCase());
    res.json(results);
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`imm fucking on air !! ${port}`);
});
exports.default = GameWord;
