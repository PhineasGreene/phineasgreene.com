var struct = require("./struct.json");
var fs = require("fs");
var express = require("express");
var app = express();

// routing of webpages
function route(path, obj){
    app.get(path, function(req, res){
        res.sendFile(`${__dirname}/html${path}index.html`);
    });

    for(let i in obj){
        if(obj[i] == 0){
            app.get(`${path}${i}`, function(req, res){
                res.sendFile(`${__dirname}/html${path}${i}.html`);
            });
        }else{
            route(`${path}${i}/`, obj[i]);
        }
    }    
}

route("/", struct)

//other content
var files = ["global.css", "navbar.js", "struct.json", "img/bg.jpg", "img/pg.png", "img/ral-tal.svg"]
for(let i = 0; i < files.length; i++){
    app.get(`/${files[i]}`, function(req, res){
        res.sendFile(`${__dirname}/${files[i]}`);
    });
}

app.listen("5000");
console.log("Listening on port 5000");
