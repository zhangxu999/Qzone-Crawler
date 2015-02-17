//var feeddoc=$(window.frames["QM_Feeds_Iframe"].document);
//var feeds=$(document).find('#host_home_feeds');
var contentPort=chrome.runtime.connect({name:document.URL});
    contentPort.onMessage.addListener(onMessage);
    var feeddoc;
    var feeds;
checkfeeds2();
    function checkfeeds (argument) {

        try
        {
        feeddoc=$(window.frames["QM_Feeds_Iframe"].document);
        feeds=$(feeddoc).find('#host_home_feeds')[0];
        console.log(feeddoc);
        console.log(feeds);
        showInfobar();
        document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded');
  var reDect=document.getElementById("reDect");
  reDect.addEventListener('click', reDect);
  var getMost=document.getElementById('getoverview');
  getMost.addEventListener('click',click);
  console.log("button addEventListener");
  var upload=document.getElementById('uploadajax');
  upload.addEventListener('click',click);
});
        return;
        }
        catch(ex)
        {
            console.log("checkfeeds");
            setTimeout(1000,checkfeeds);
        }
        

    };
    function checkfeeds2 () {
        // body...
        console.log(window.frames["QM_Feeds_Iframe"].document);
        feeddoc=window.frames["QM_Feeds_Iframe"].document;
        feeddoc.addEventListener('DOMContentLoaded',function  () {
            console.log("feeddoc DOMContentLoaded");
            feeds=$(feeddoc).find('#host_home_feeds')[0];
        console.log(feeddoc);
        console.log(feeds);
        showInfobar();
       // feeddoc.addEventListener('DOMContentLoaded', function () {
        console.log('DOMContentLoaded');
        var reDect=feeddoc.getElementById("reDect");
        reDect.addEventListener('click', reDect);
        var getMost=feeddoc.getElementById('getoverview');
        getMost.addEventListener('click',click);
        console.log("button addEventListener");
        var upload=feeddoc.getElementById('uploadajax');
        upload.addEventListener('click',click);
//});
        return;
            // body...
        });
    }
////得到content端port

//  console.log("knock was established");
    
/*
    chrome.runtime.onConnect.addListener(function  (port) {
        backgroundPort=port;
    console.log(backgroundPort.name);
//此处回调函数不是这个文件的onMessage.是在插件环境中的onMessage函数
    backgroundPort.onMessage.addListener(onMessage);
    var location="contentscript";
//  console.log(port.name+"come in,");
        // body...
    });
*/
//判断是否有我们需要分析的内容
if(false)
//if (feeds) 
{
	contentPort.postMessage({act:"finddatatoshow",data:getoverview()});	
}

function showInfobar () {
    var infobarHtml='<div id="wrap">    <em id="owner">A</em>共发了<em id="count">X</em> 条说说，    收获<em id="comment">Y</em>条评论,有<em id="people">P</em>个朋友。    <button id="reDect"  >        重新检测说说和评论    </button>    <button id="getMost" >        看看谁和TA最亲密？    </button>    <button id="upload" >        上传分析    </button>    <a id="uploaded" href="" target="_blank">        查看TA的说说详情    </a>    <div class="desc">        <div>QQ:</div><div>互动次数:</div>    </div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div id="hide" style="height:10px;width:10px">×</div></div>';
    var infobarStyle='<style>#wrap {height: 40px;background-color: #E9E9E9}.top5{display: inline-block;}.desc{display: inline-block;}#uploaded{display: inline-block;}{display: inline-block;}em {font-weight: bold;font-style: normal;}</style>';
    $(".top-fix-bar").css("height","110px");
    $(".top-fix-inner").css("height","110px");
    $(".top-fix-container").css("height","110px");
    $("head").append(infobarStyle);
    $(".top-fix-container").prepend(infobarHtml);
    var reDectvar=document.getElementById("reDect");
    console.log(reDectvar);
  reDectvar.addEventListener('click', reDect);
  var getMostvar=document.getElementById('getMost');
  getMostvar.addEventListener('click',getoverview);
  console.log("button addEventListener");
  var uploadvar=document.getElementById('upload');
  uploadvar.addEventListener('click',uploadajax);
}


//消息侦听回调函数
function onMessage (Message) {
	//console.log(Message.hello);
	switch (Message.act)
	{
		case "getoverview":
            showInfobar();
            $("#count").text(Message.data.feeds);
            $("#comment").text(Message.data.comments);
            $("#owner").text(Message.data.nick);
            $("#people").text(Message.data.people);
            $("#reDect").text("重新检测");
            break;
	 //	console.log("tell feeds length:"+feeds.children.length+"@@"+"@@"+nick);
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
    console.log(Message.hello+"  "+document.URL);
    break;
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
           // backgroundPort.postMessage({act:"uploaded",url:"http://ncwugirl.duapp.com/fetchQzone/search2?user="+shuo.owner});     
            $("#upload").text("上传分析");
      $("#uploaded").attr("href",Message.url);
      $("#uploaded").show();
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
function reDect (argument) {
    // body...
    console.log('reDect');
    
    $("#reDect").text("正在检测说说和评论量......");
    getoverview();
    $("#reDect").text("重新检测");
}
//返回infobar 所需要的关于所有说说所需要的内容
function getoverview () {
    console.log("getoverview");
    init();
    Message={
             nick:getNick(shuo.owner),
             comments:shuo.comment.length,
             owner:shuo.owner,
             feeds:shuo.feed.length,
             people:shuo.people.length
           };
    $("#count").text(Message.feeds);
            $("#comment").text(Message.comments);
            $("#owner").text(Message.nick);
            $("#people").text(Message.people);
    return;
}