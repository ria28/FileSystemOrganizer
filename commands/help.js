function helpFunc() {
    console.log(`
    List of all commands:
    node main.js tree "dir path" 
    node main.js organize "dir path" 
    node main.js help
    `);
}

module.exports={
    helpKey : helpFunc
}