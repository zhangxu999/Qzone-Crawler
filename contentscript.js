var feeds=document.getElementById('host_home_feeds');
//判断是否有我们需要分析的内容
if (feeds) 
{
	var port1=chrome.runtime.connect({name:"knock"});
//	console.log("knock was established");
	port1.onMessage.addListener(onMessage);
//	console.log("port1 addListener");
	port1.postMessage({hello:"contentscript"});
//	console.log("port1 send Message")
	chrome.runtime.onConnect.addListener(function  (port) {
		port2=port;
//	console.log(port.name);
	port2.onMessage.addListener(onMessage);
	var location="contentscript";
//	console.log(port.name+"come in,");
		// body...
	});
}
//消息侦听回调函数
function onMessage (Message) {
	//console.log(Message.hello);
	switch (Message.act)
	{
		case "getPackage":
    package=getPackage();
    var nick=getNick(package.owner);
	 	port2.postMessage({
                        nick:nick,
                        feeds:package.feeds,
                        comments:package.comments,
                        people:package.people,
                        act:"tellPackage"
                      });
	 //	console.log("tell feeds length:"+feeds.children.length+"@@"+"@@"+nick);
	 	break;
	 	upload();
	 //	console.log("@@@@@@@@@@upload");
    break;
    case "getMost":
        var result=analaysis();
        var most=[];
        for(var i=0;i<10;i++)
        {
          var nick=getNick(result[result.length-i-2].qq);
          most[i]={
                    qq:result[result.length-i-2].qq,
                    cnt:result[result.length-i-2].cnt,
                    nick:nick
                  };
        }
    port2.postMessage({hello:most,act:"tellMost"});
    break;
    case "upload":
    uploadajax();
    break;
	}// body...
}

function uploadajax () {
a=$.toJSON(shuo)
b=encodeURIComponent(a)
    var xmlhttp=new XMLHttpRequest();
    // body...
    host="http://ncwugirl.duapp.com";
    xmlhttp.open("POST",host+"/fetchQzone/search/",true);
   xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin","*");
    xmlhttp.send('shuo='+b);
    
    xmlhttp.onreadystatechange=function  () {
        if (xmlhttp.readyState===4 && xmlhttp.status==200) {
            //result.innerHTML=xmlhttp.responseText;
            console.log(xmlhttp.responseText);
            //setTimeout(function  () {},1000);
            //pause(1000);  
            port2.postMessage({act:"uploaded",url:"http://ncwugirl.duapp.com/fetchQzone/search2?user="+shuo.owner});     
        };   
}
}
/*
var links;
var i;
function initLinks (argument) {
    // body...
    links=$(".comments-list-more").find("a");
    i=0;
}

function  unfolderAll (val) {
    // body...
    links[i].click();
    if (links[i+1]) {

        i++;
        setTimeout(unfolderAll(links[i]),300);
    };
    
}
*/