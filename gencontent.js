var fs = require("fs");
var struct = require("./host/struct.json");

function route(path, obj){
    fs.mkdir(`${__dirname}/host/content${path}`, (err) => {
        //if (err) throw err;
    });
    var fpath = `${__dirname}/host/content${path}index.html`;
    fs.writeFile(fpath, `<!--TEMPLATE:main.html-->\n<!--${fpath}-->`, (err) => {
        if (err) throw err;
        console.log(`${fpath} saved`);
    });

    for(let i in obj){
        if(obj[i] == 0){
            fpath = `${__dirname}/host/content${path}${i}.html`;
            fs.writeFile(fpath, `<!--TEMPLATE:main.html-->\n<!--${fpath}-->`, (err) => {
                if (err) throw err;
                console.log(`${fpath} saved`);
            });
        }else{
            route(`${path}${i}/`, obj[i]);
        }
    }    
}

route("/", struct);
