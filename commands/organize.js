let fs = require("fs")
let path = require("path");
const utility = require("../utility");

let types = utility.types;


function organizeFunc(dirPath) {
    // console.log("organizeFunc implemented");
    let destPath
    if (dirPath == undefined) {
        console.log("Path entered was not correct...working on current directory");
        destPath = path.join(process.cwd(), "organised_files");
        return; // comment if you wan't to make changes with original files in System
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            // create an organised_files directory 
            destPath = path.join(dirPath, "organised_files");
            if (fs.existsSync(destPath) == false)
                fs.mkdirSync(destPath);
            organizeHelper(dirPath, destPath);
        } else {
            console.log("Please enter correct path");
            return;
        }
    }

}


function organizeHelper(src, dest) {
    // identify categories of all files present in input dir
    let childNames = fs.readdirSync(src);
    // console.log(childNames);

    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        // check if it is a file or dir , incase of dir we'll leave it as it is
        let isFile = fs.lstatSync(childAddress).isFile();

        if (isFile) {
            // copy/ cut files from original dir to organized dir 
            let category = getCategory(childAddress)
            // console.log(childNames[i] , category);

            sendFiles(childAddress, dest, category);

        }

    }
}

function getCategory(name) {
    let ext = path.extname(name).slice(1);

    for (let type in types) {
        for (let i = 0; i < types[type].length; i++) {
            if (types[type][i] == ext) {
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(srcFilePath, dest, category) {

    // ORGANIZE BY COPYING 
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    // first create the same file (initially empty) in organized folder 
    let fileName = path.basename(srcFilePath); // srcFilePath is childAddress
    let destFilePath = path.join(categoryPath, fileName);

    // content will get 
    fs.copyFileSync(srcFilePath, destFilePath);
    console.log(fileName, " organized  (copied) in ", category);

    // to cut remove files from original 
    // fs.unlinkSync(srcFilePath);
}

module.exports = {
    organizeKey: organizeFunc
}