//var feeddoc=$(window.frames["QM_Feeds_Iframe"].document);
var feeds=$(document).find('#host_home_feeds');
var from="outter";

    if(feeds.length)
//if (feeds) 
{   from="inner";
    var contentPort=chrome.runtime.connect({name:from});
    contentPort.onMessage.addListener(onMessage);
    contentPort.postMessage({act:"finddatatoshow",data:getoverview(),from:"inner"});    
}
else
{
    contentPort=chrome.runtime.connect({name:from});
    contentPort.onMessage.addListener(onMessage); 
}
   
    //checkfeeds2();
/*
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
    */
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


function showInfobar () {

    var infobarHtml='<div id="wrap">    <em id="owner">A</em>共发了<em id="count">X</em> 条说说，    收获<em id="comment">Y</em>条评论,有<em id="people">P</em>个朋友。    <button id="reDect"  >        重新检测说说和评论    </button>    <button id="getMost" >        看看谁和TA最亲密？    </button>    <button id="upload" >        上传分析    </button>    <a id="uploaded" href="" target="_blank">        查看TA的说说详情    </a>    <div class="desc">        <div>QQ:</div><div>互动次数:</div>    </div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div class="top5"><a  href="" target="_blank" >x</a><div>count</div></div>    <div id="hide" style="height:10px;width:10px">×</div></div>';
    var infobarStyle='<style>#wrap {height: 40px;background-color: }.top5{display: inline-block;}.desc{display: inline-block;}#uploaded{display: inline-block;}{display: inline-block;}em {font-weight: bold;font-style: normal;}</style>';
    $(".top-fix-bar").css("height","110px");
    $(".top-fix-inner").css("height","110px");
    $(".top-fix-container").css("height","110px");
    $("head").append(infobarStyle);
    $(".top-fix-container").prepend(infobarHtml);
    var reDectvar=document.getElementById("reDect");
    console.log(reDectvar);
  reDectvar.addEventListener('click', reDect);
  var getMostvar=document.getElementById('getMost');
  getMostvar.addEventListener('click',getTop);
  console.log("button addEventListener");
  var uploadvar=document.getElementById('upload');
  uploadvar.addEventListener('click',upload);
}


//消息侦听回调函数
function onMessage (Message) {
	//console.log(Message.hello);
    if(Message.from=="outter")
	switch (Message.act)
	{
        case "reDect":
            da=getoverview();
            contentPort.postMessage({act:"reDect",from:"inner",data:da})
            break;

        case "getTop":
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
        console.log(result);
        console.log(most);

        contentPort.postMessage({act:"getTop",data:most,from:"inner"});
        break;
    case "upload":
    uploadajax();
    break;
    case "test":
    console.log(Message.hello+"  "+document.URL);
    break;
    
	}


    //from  inner    in outter
    else
        switch (Message.act)
    {
        case "finddatatoshow":
            console.log("onMessage in "+document.URL);
            showInfobar();
            
            $("#count").text(Message.data.feeds);
            $("#comment").text(Message.data.comments);
            $("#owner").text(Message.data.nick);
            $("#people").text(Message.data.people);
            break;
        case "reDect":
            
            $("#count").text(Message.data.feeds);
            $("#comment").text(Message.data.comments);
            $("#owner").text(Message.data.nick);
            $("#people").text(Message.data.people);
            $("#reDect").text("重新检测");
            break;
    case "getTop":
            $("#getMost").text("重新分析亲密关系");
            $(".top5").show();
            $(".desc").show();
            var suffix="http://user.qzone.qq.com/";
            data=Message.data;
            for(var i=0;i<data.length;i++)
            {
//        console.log(Message.hello[i].qq+":::"+Message.hello[i].cnt+"@@"+Message.hello[i].nick);
             $($($(".top5")[i]).children()[0]).attr("href",suffix+data[i].qq);
             $($($(".top5")[i]).children()[0]).text(data[i].nick);
             $($($(".top5")[i]).children()[1]).text(data[i].cnt);
            }
        break;
    case "upload":
    $("#upload").text("上传分析");
    $("#uploaded").attr("href",Message.data);
    $("#uploaded").show();
    break;
    }

}


//内容上传函数
var local="htp://127.0.0.1:8000";
var remote="http://ncwugirl.duapp.com"
var host=local;
function uploadajax () {
    console.log("upload……");
a=$.toJSON(shuo)
b=encodeURIComponent(a)
    var xmlhttp=new XMLHttpRequest();
    var host="http://fqzone.duapp.com";
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
        //    $("#upload").text("上传分析");
      $//("#uploaded").attr("href",Message.data);
      //$("#uploaded").show();
      var url="http://ncwugirl.duapp.com/fetchQzone/search2?user="+shuo.owner;
      contentPort.postMessage({act:"upload",data:url,from: "inner"});
        }
        else
        {
            console.log(xmlhttp.responseText);
        }  
};
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
function getTop (argument) {
    // body...
    $("#getMost").text("正在分析亲密关系……");
    contentPort.postMessage({act:"getTop",from:"outter"});
}
function reDect (argument) {
    // body...
    console.log('reDect');
    
    $("#reDect").text("正在检测说说和评论量......");
     contentPort.postMessage({act:"reDect",from:"outter"})
    //$("#reDect").text("重新检测");
}
function upload (argument) {
    $("#upload").text("正在上传……");
    contentPort.postMessage({act:"upload",from:"outter"})
    // body...
}
//返回infobar 所需要的关于所有说说所需要的内容
function getoverview () {
    console.log("getoverview");
    init();
    data={
             nick:getNick(shuo.owner),
             comments:shuo.comment.length,
             owner:shuo.owner,
             feeds:shuo.feed.length,
             people:shuo.people.length
           };
           console.log(data);
           /*
    $("#count").text(Message.feeds);
            $("#comment").text(Message.comments);
            $("#owner").text(Message.nick);
            $("#people").text(Message.people);
            */
    return data;
}