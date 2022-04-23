#!/usr/bin/env node

let helpObj = require("./commands/help")
let treeObj = require("./commands/tree")
let organizeObj = require("./commands/organize");

let inpArr = process.argv.slice(2);
// console.log(inpArr);

// node main.js tree "dir path" | node main.js organize "dir path" | node main.js help
let command = inpArr[0];



switch (command) {
    case "tree":
        // treeFunc(inpArr[1]);
        treeObj.treeKey(inpArr[1]);
        break;
    case "organize":
        // organizeFunc(inpArr[1]);
        organizeObj.organizeKey(inpArr[1]);
        break;
    case "help":
        // helpFunc();
        helpObj.helpKey();
        break;

    default:
        console.log(`${command} is not recognized as an internal or external command. Please enter a valid command 🙏 `);
        break;
}