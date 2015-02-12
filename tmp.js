feedAll=$(feeds).children();
feedSingle=$(feedAll[33]);
comments=$(feedSingle).find(".comments-item.bor3");
comment=comments[0];
content=$(comment).find(".comments-content").first()
for (var i = 0; i < Things.length; i++) {
    Things[i]
};

var links=$(".comments-list-more").find("a")
var i=0;
function  unfolderAll (val) {
    // body...
    links[i].click();
    if (links[i+1]) {

        i++;
        setTimeout(unfolderAll(links[i]),300);
    };
    
}
