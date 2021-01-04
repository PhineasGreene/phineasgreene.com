var fs = require("fs");
var struct = require("./public/struct.json");

function constructPage(contentPath){
    fs.readFile(contentPath, 'utf8', function(err1, data1){
        if(err1) throw err1;
        
        var templateName = data1.match(/<!--TEMPLATE:(.*)-->/)[1];
        var templatePath = `${__dirname}/templates/${templateName}`;
        var pagePath     = contentPath.replace("content", "public");

        fs.readFile(templatePath, 'utf8', function(err2, data2){
            if(err2) throw err2;

            var pageContent = data2.replace("<!--CONTENT-->", data1);
            
            fs.writeFile(pagePath, pageContent, function(err3){
                if (err3) throw err3;
                console.log(`${pagePath} saved`);
            });
        });
    });
}

function route(path, obj){
    var contentPath = `${__dirname}/content${path}index.html`;
    constructPage(contentPath);

    for(let i in obj){
        if(obj[i] == 0){
            contentPath = `${__dirname}/content${path}${i}.html`;
            constructPage(contentPath);
        }else{
            route(`${path}${i}/`, obj[i]);
        }
    }    
}

route("/", struct);
