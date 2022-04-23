let fs = require("fs")
let path = require("path");

function treeFunc(dirPath) {
    // console.log("tree implemented");

    if (dirPath == undefined) {
        console.log("Path entered was not correct...working on current directory");
        dirPath = process.cwd(); /// cwd -> current working dir
        treeHelper(dirPath, "");
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {

            treeHelper(dirPath, "");

        } else {
            console.log("Please enter correct path");
            return;
        }
    }
}

function treeHelper(dirPath, indent) {
    //is file or directory
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile) {
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName);
    } else {
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        let children = fs.readdirSync(dirPath);

        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(dirPath, children[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}

module.exports={
    treeKey:treeFunc
}