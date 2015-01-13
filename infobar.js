
var tabID,port;
var tabinfo={active:true,currentWindow:true};
//发送建立连接请求，并监听消息响应
chrome.tabs.query(tabinfo,function(tabs){
	console.log("active tab:"+tabs[0].id+" length:  "+tabs.length);
	tabID=tabs[0].id;
	port=chrome.tabs.connect(tabID,{name:"infobar"});
	port.onMessage.addListener(onMessage);
	console.log("port connect ,addListener");
	port.postMessage({act:"getPackage"});
});

//console.log("infobar connect establish...");
$(".top5").hide();
$(".desc").hide();
$("#uploaded").hide();
//处理按钮的点击
function click(e) {
  console.log(' button was clicked');
  //chrome.tabs.executeScript(null, {code:"document.body.style.backgroundColor='red';"});
  var location="infobar";
  switch (e.target.id)
  {
  	case "reDect":
  		port.postMessage({act:"getPackage"});
      $("#reDect").text("正在检测说说和评论数量......");
  		console.log("infobar send a message");
  		break;
    case "getMost":
      port.postMessage({act:"getMost"});
      $("#getMost").text("正在分析TA的关系......");
      console.log("getMost");
      break;
    case "upload":
      port.postMessage({act:"upload"});
      $("#upload").text("正在上传");
      $("#uploaded").hide();
      console.log("upload data");
      break;

  }
 
};
//为重新检测绑定监听器
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded');
  var reDect=document.getElementById("reDect");
  reDect.addEventListener('click', click);
  var getMost=document.getElementById('getMost');
  getMost.addEventListener('click',click);
  console.log("button addEventListener");
  var upload=document.getElementById('upload');
  upload.addEventListener('click',click);
});
//接收contentScript发送的信息，并处理
function onMessage (Message) {
	switch (Message.act)
  {
    //请求说说基本信息
    case "tellPackage":
        $("#count").text(Message.feeds);
        $("#comment").text(Message.comments);
        $("#owner").text(Message.nick);
        $("#people").text(Message.people);
        $("#reDect").text("重新检测");
        break;
        //得到所有关于关系的分析
    case  "tellMost":
        $("#getMost").text("重新分析亲密关系");
        $(".top5").show();
        $(".desc").show();
        var suffix="http://user.qzone.qq.com/";
        for(var i=0;i<Message.hello.length;i++)
        {
//        console.log(Message.hello[i].qq+":::"+Message.hello[i].cnt+"@@"+Message.hello[i].nick);
          $($($(".top5")[i]).children()[0]).attr("href",suffix+Message.hello[i].qq);
          $($($(".top5")[i]).children()[0]).text(Message.hello[i].nick);
          $($($(".top5")[i]).children()[1]).text(Message.hello[i].cnt);
        }
        break;
      case "uploaded":
      $("#upload").text("上传分析");
      $("#uploaded").attr("href",Message.url);
      $("#uploaded").show();
      break;     
  }
}