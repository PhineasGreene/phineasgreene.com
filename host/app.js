var struct = require("./public/struct.json");
var fs = require("fs");
var express = require("express");
var app = express();
var morgan = require("morgan")

app.use(morgan(":remote-user - :method :url :status :res[content-length] - :response-time ms"));
app.use(express.static('public', {extensions:["html", "js", "jpg", "png", "gif", "svg", "css"]}));

// routing of index webpages
function route(path, obj){
    app.get(path, function(req, res){
        res.sendFile(`${__dirname}/public${path}index.html`);
    });

    for(let i in obj){
        if(obj[i] != 0){
            route(`${path}${i}/`, obj[i]);
        }
    }    
}

route("/", struct)

app.listen("5000");
console.log("Listening on port 5000");
