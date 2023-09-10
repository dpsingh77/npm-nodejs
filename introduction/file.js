const fs = require("fs");
const os = require("os");
const http = require("http");

const myServer = http.createServer((req, res) => {
    console.log(req);
    res.end("response ended");
});

myServer.listen(8000, () => console.log("server started"))

console.log(os.cpus().length);

fs.writeFile('./tst.txt', "test input", (err) => {
    if(err)
        console.log("Error " + err)
    else
        console.log('done')
});

