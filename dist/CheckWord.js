"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("./server-data/data"));
function CheckWord(GameWord, userGuess) {
    if (!data_1.default.includes(userGuess.toLocaleLowerCase())) {
        return "invalid-word";
    }
    let a = GameWord;
    let b = a.split("");
    let results = [];
    for (let w = 0; w < 5; w++) {
        if (userGuess[w] === b[w]) {
            b[w] = "!";
            results.push("green");
        }
        else if (b.includes(userGuess[w])) {
            b[a.indexOf(userGuess[w])] = "!";
            results.push("yellow");
        }
        else {
            results.push("gray");
        }
    }
    return results;
}
exports.default = CheckWord;
