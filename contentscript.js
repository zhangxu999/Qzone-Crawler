var feeds=document.getElementById('host_home_feeds');
var infobarHtml='<div id="wrap">    <em id="owner">A</em>共发了<em id="count">X</em> 条说说，    收获<em id="comment">Y</em>条评论,有<em id="people">P</em>个朋友。    <button id="reDect" >        重新检测说说和评论    </button>    <button id="getMost" >        看看谁和TA最亲密？    </button>    <button id="upload" >        上传分析    </button>    <a id="uploaded" href="" target="_blank">        查看TA的说说详情    </a>    <div class="desc">        <div>QQ:</div><div>互动次数:</div>    </div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div id="hide" style="height:10px;width:10px">×</div></div>'
var infobarStyle='<style>#wrap {height: 40px;background-color: #E9E9E9}.top5{display: inline-block;}.desc{display: inline-block;}#uploaded{display: inline-block;}{display: inline-block;}em {font-weight: bold;font-style: normal;}</style>'
showInfobar();
var contentPort=chrome.runtime.connect({name:"knock"});
//  console.log("knock was established");
    contentPort.onMessage.addListener(onMessage);
//判断是否有我们需要分析的内容
if (feeds) 
{
	
//	console.log("port1 addListener");
	contentPort.postMessage({hello:"contentscript"});
    showInfobar();
//	console.log("port1 send Message")
	chrome.runtime.onConnect.addListener(function  (port) {
		backgroundPort=port;
//	console.log(port.name);
//此处回调函数不是这个文件的onMessage.是在插件环境中的onMessage函数
	backgroundPort.onMessage.addListener(onMessage);
	var location="contentscript";
//	console.log(port.name+"come in,");
		// body...
	});
}

function showInfobar () {
    // body...
    $(".top-fix-bar").css("height","110px");
    $(".top-fix-inner").css("height","110px");
    $(".top-fix-container").css("height","110px");
    $("head").append(infobarStyle);
    $(".top-fix-container").prepend(infobarHtml);
}


//消息侦听回调函数
function onMessage (Message) {
	//console.log(Message.hello);
	switch (Message.act)
	{
		case "getPackage":
    package=getPackage();
    var nick=getNick(package.owner);
	 	backgroundPort.postMessage({
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
    backgroundPort.postMessage({hello:most,act:"tellMost"});
    break;
    case "upload":
    uploadajax();
    break;
    case "test":
    console.log(Message.hello);
	}// body...
}


//内容上传函数
var local="htp://127.0.0.1:8000";
var remote="http://ncwugirl.duapp.com"
var host=remote;
function uploadajax () {
a=$.toJSON(shuo)
b=encodeURIComponent(a)
    var xmlhttp=new XMLHttpRequest();
    var host="http://127.0.0.1:8000";
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
            backgroundPort.postMessage({act:"uploaded",url:"http://ncwugirl.duapp.com/fetchQzone/search2?user="+shuo.owner});     
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

