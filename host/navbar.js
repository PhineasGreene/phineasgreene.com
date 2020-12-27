
function makeTree(list, obj, url){
    for(let i in obj){
        let item = document.createElement("li");
        if(obj[i] == 0){
            let link = document.createElement("a");
            link.innerHTML = i;
            link.href = `${url}${i}`;
            item.appendChild(link);
        }else{
            let topitem = document.createElement("li");
            let toplink = document.createElement("a");
            toplink.innerHTML = i;
            toplink.href = `${url}${i}/`;
            topitem.appendChild(toplink);
            list.appendChild(topitem);
            let sublist = document.createElement("ul");
            makeTree(sublist, obj[i], `${url}${i}/`);
            item.appendChild(sublist);
        }
        list.appendChild(item);
    }
}

function makeNavs(struct){
    var navbar = document.getElementById("navbar");

    // top navbar
    for(let i in struct){
        var el = document.createElement("a");
        el.innerHTML = i;
        el.href = `/${i}/`;
        navbar.appendChild(el);
    }

    // get first url "directory"
    var section = window.location.href;
    section = section.match(/\/\/[^\/]+\/([^\/]+)/)[1];
    var tree = document.getElementById("navtree");
    var list = document.createElement("ul");
    makeTree(list, struct[section], `/${section}/`);
    tree.appendChild(list);
};

fetch("/struct.json").then(function (res) {
    return res.json();
}).then(makeNavs).catch(function (err) {
    console.log(err);
});


