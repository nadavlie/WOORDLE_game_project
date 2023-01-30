"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("./server-data/data"));
function CheckWord(GameWord, userGuess) {
    if (!data_1.default.includes(userGuess.toLocaleLowerCase())) {
        return "invalid word";
    }
    const placeHolder = GameWord.split("");
    let results = [];
    for (let w = 0; w < 5; w++) {
        if (userGuess[w] === placeHolder[w]) {
            placeHolder[w] = "!";
            results.push("green");
        }
        else if (placeHolder.includes(userGuess[w])) {
            placeHolder[GameWord.indexOf(userGuess[w])] = "!";
            results.push("yellow");
        }
        else {
            results.push("gray");
        }
    }
    return results;
}
exports.default = CheckWord;
