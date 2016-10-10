var qq=0;
//var nick="";
var feedID="";
var userID=0;
var time=new Date();
var info=" ";
var commentNum=0;
var likeNum=0;
var IDinFeed=0;
var visitTime=0;
var rootID=0;
var fee=
		{
			feedID:feedID,
			userID:userID,
			time:time,
			info:info,
			commentNum:commentNum,
			likeNum:likeNum,
			visitTime:visitTime
		};
var comment=
		{
			IDinFeed:IDinFeed,
			parent:feedID,
			rootID:rootID,
			from:qq,
			to:qq,
			time:time,
			info:info
		};
var nick={};
var feed={};
var visitor=0;
var shuo={
			'owner':qq,
			'visitor':0,
			'people':[],
			'feed':[],
			'comment':[],
			'nick':nick
		};
//开始遍历，分析记录所有feed
function init () {
	shuo.owner=0;shuo.people=[];shuo.comment=[];shuo.feed=[];
	var RegExp="i_uin=([0-9]{5,})&";
	shuo.owner=parseInt(getInfofromString(RegExp,document.URL));
	shuo.people[shuo.people.length]=shuo.owner;

	//判断是否已经登录，取用户QQ
	var visitorRegExp=" uin=o([0-9]{5,});";
	visitor=getInfofromString(visitorRegExp,document.cookie);
	shuo.visitor=(visitor==" ")?(0):parseInt(visitor);

	for (var i = 0; i < $(feeds).children().length; i++) {
	processSingleFeed($(feeds).children()[i]);
};


	//获取所有昵称
    getQQandNick();
    for(var x in feed)
    {
    	shuo['feed'].push(feed[x]);
	}
}
//处理单个说说
function processSingleFeed (feedSingle) {
	if (!feedSingle) {return;};
	var feedID=feedSingle.id;
	var time=strToTime($(feedSingle).find(".info-detail").children().first().text())
	var info=$(feedSingle).find(".f-info").html()+"<br>";
		info+=$(feedSingle).find(".txt-box").html();
	if(!info)
		info=" ";
	var commentNum=getNumfromString($(feedSingle).find(".qz_btn_reply.item").text());
	var likeNum=getNumfromString($(feedSingle).find(".item.qz_like_btn_v3").text());
	var now=new Date();
	var visitTime=packageTime(now.getFullYear(),(now.getMonth()+1),now.getDate(),now.getHours(),now.getMinutes())
	var fe=new Object();
	fe=
		{
			'feedID':feedID,
			'userID':shuo.owner,
			'time':time,
			'info':info,
			'commentNum':commentNum,
			'likeNum':likeNum,
			'visitTime':visitTime
		};
	feed[feedID]=fe;
	//console.log(fe);
	processComments($(feedSingle).find(".comments-item.bor3"),feedID);

}
//处理每条说说的所有评论
function processComments (comments,feedID) {
	if (!comments) {return;};
	var rootID=null;
	var rootqq;
	for (var i = 0; i < comments.length; i++) {
		if ($(comments[i]).attr("data-type")=="commentroot") {
			rootID=i;
			rootqq=getNumfromString($($(comments[i]).find(".comments-content").first().children()[0]).attr("href"));
			processsingleComment(comments[i],feedID,i,-1,rootqq);
		}
		else
		{
			processsingleComment(comments[i],feedID,i,rootID,rootqq);
		}
	};
	// body...
}
//处理单条评论
function processsingleComment (comment,feedID,IDinFeed,rootID,rootqq) {
	if (!comment) {return;};
	var content=$(comment).find(".comments-content").first();
	var timeDiv=$(comment).find(".comments-op").first();
	var Links=$(content).children().filter("a");
	var from=getNumfromString($(Links[0]).attr("href"));
	var to;

			if (rootID<0) 
					to=shuo.owner;
			else
				{ 
					if (Links.length==1) 
						to=rootqq;
					else if (Links.length>1)
						to=getNumfromString($(Links[1]).attr("href"));
				}
/*
if (Links) {
	switch(Links.length)
	{
		case 2:
//			console.log("urlto:"+$(Links[1]).attr("href")+"@@:"+to+"@@"+Links.length);
		case 1:
//			console.log("urlfrom:"+$(Links[0]).attr("href")+"@@:"+from+"@@"+to+"@@"+Links.length);
		break;
		case 0:
//			console("@@"+IDinFeed);
}
}
else
{
//			console.log("urlfrom:"+"@@:"+"@@"+null);
}			//	
*/
			//检查是否需要插入"<sss>"标签
			if(!content.find("sss").length)
			{
				(Links.length>1)?$(Links[1]).after("<sss></sss>"):$(Links[0]).after("<sss></sss>")
				$(timeDiv).before("<sss></sss>");
			}
			//将QQ号放入库中。
			if (!qqinPeople(from,shuo.people))
			{
				shuo.people[shuo.people.length]=from;
				//console.log("urlfrom:"+$(Links[0]).attr("href")+"@@:"+from+"@@"+Links.length);
			}
			if (!qqinPeople(to,shuo.people))
			{
				shuo.people[shuo.people.length]=to;
				//console.log("urlto:"+$(Links[1]).attr("href")+"@@:"+to+"@@"+Links.length);
			}
	var RegExp="<sss></sss>(.*)<sss></sss>";
	var info=getInfofromString(RegExp,$(comment).find(".comments-content").first().html());
	var time=strToTime($(comment).find(".comments-content").first().find(".ui-mr10.state").text());

	var comment=
		{
			'IDinFeed':IDinFeed,
			'parent':feedID,
			'rootID':rootID,
			'from':from,
			'to':to,
			'time':time,
			'info':info
		};
shuo.comment[shuo.comment.length]=comment;
	// body...
}

//获取QQ及其昵称，
function getQQandNick () {
	// body...
	allNicks=$(".c_tx.q_namecard");
	for (var i = 0; i < allNicks.length; i++) {
		var qq=getNumfromString (allNicks[i].href);
		var content=allNicks[i].textContent;
		content=((content[0]=="@")?content.slice(1):content);
		nick[qq]=content;
	};

}
//从字符串中，说说文本中获取有效评论内容
function getInfofromString (Re,string) {
	if (Re==null||string==null) {return;};
	var pa=new RegExp(Re);
	var content=string.match(pa);
	if (content) {
	switch (content.length)
	{
		case 0:
		content=null;
//		console.log(content);
		return content;
		case 1:
		//console.log(content[0]);
		return content[0];
		case 2: 
		//console.log(content[1]);
		return content[1];
		default:
		return content[2];
	}
}
else
	return ' ';
	// body...
}
//从字符串中获取日期，时间
function strToTime (string) {
	if (!string) {return "NULL";};
	var pa=new RegExp("[0-9]{1,}","g");
	var timeArray=string.match(pa);
//	var daymillisec=86400000;
	var time=new Date();

	switch(timeArray.length)
	{   
		case 2:
			//这里的昨可能会不兼容，编辑器是utf-8 可浏览器是Unicode
			if (letterInWord("昨",string)) 
         	//time.setTime(time.getTime()-daymillisec);
			timestamp=packageTime(time.getFullYear(),time.getMonth()+1,time.getDate()-1,timeArray[0],timeArray[1]);
			else if (letterInWord("前",string)) 
				//time.setTime(time.getTime()-daymillisec*2);
				timestamp=packageTime(time.getFullYear(),time.getMonth()+1,time.getDate()-2,timeArray[0],timeArray[1]);
			else
			timestamp=packageTime(time.getFullYear(),time.getMonth()+1,time.getDate(),timeArray[0],timeArray[1]);	
			break;
		case 4:
			timestamp=packageTime(time.getFullYear(),timeArray[0],timeArray[1],timeArray[2],timeArray[3]);
			break;
		case 5:
			timestamp=packageTime(timeArray[0],timeArray[1],timeArray[2],timeArray[3],timeArray[4]);
			break;
		default :
	}
	return timestamp;
}
// 组装时间对象
function packageTime(year,month,date,hours,minutes){
	//timestamp=""
/*
if(year)
//Time.setYear(year);
	timestamp+=(year+"-");
else
	timestamp+=(Time.getFullYear()+"-");
if (month)
//Time.setMonth(month-1)
	timestamp+=(month+"-");
else
	timestamp+=((Time.getMonth()+1)+"-")
if (date)
	timestamp+=(date+" ");
else
	timestamp+=(time.getDate()+" ");

timestamp+=(hours+":"+minutes+":00");
//Time.setDate(date);

//Time.setHours(hours);

//Time.setMinutes(minutes);
//console.log(Time);
//Time.setSeconds(0);
//Time.setMilliseconds(0);
return timestamp;
*/
return  year+"-"+month+"-"+date+" "+hours+":"+minutes+":00"
}
//获取，评论，赞的数目;从URL中获取一个QQ号
function getNumfromString (string) {
	var qq=parseInt(RegExp("[1-9][0-9]{0,}").exec(string));
	if(!qq)
		qq=0;
	return qq;
}
//一个字或一个字母是否在一个字符串中，比如 “昨” 在 “昨天10:20”中
function letterInWord(letter,string){
	if (letter==null||string==null)
		{return false;}
	for (var i = 0; i < string.length; i++) 
		{
			if(letter[0]==string[i])
			return true;
		};
			return false;
}
//判断一个QQ是否已经存入QQ库里
function qqinPeople (qq,peoples) {
	if (qq==null||peoples==null)
		  {return false;}
	for (var i = 0; i < peoples.length; i++) 
		{
			if(qq==peoples[i])
			  return true;
		};
			return false;
	// body...
}
//对生成的所有结果，分析，将QQ按评论数排序
var all=[];
var feedCount=0;
function analaysis (argument) {
//	console.log("chushihua");
//初始
if ($(feeds).children().length>feedCount) 
	{  
		init();
		feedCount=shuo.feed.length;
	};
for(var i=0;i<shuo.people.length;i++)
{	
	all[i]={qq:shuo.people[i],cnt:0};
}
//console.log("tongji");
//统计
for (var i = 0; i < shuo.comment.length; i++) {
	for (var j = 0; j < shuo.people.length; j++) {
		if(shuo.people[j]==shuo.comment[i].from)
			all[j].cnt++;
		if (shuo.people[j]==shuo.comment[i].to)
			all[j].cnt++;
	};
};
//console.log("paixu");
//排序
var n=shuo.people.length;
var tmp,exchange;
for(var i=0;i<n;i++)
{	exchange=false;
	for(j=n-1;j>i;j--)
		if (all[j].cnt<all[j-1].cnt) 
			{
				tmp=all[j];
				all[j]=all[j-1];
				all[j-1]=tmp;
				exchange=true;
			};
}
//console.log("output"+all.length);
//输出
for (var i = 0; i < all.length; i++) {
	
//	console.log("http://user.qzone.qq.com/"+all[i].qq+"   :"+all[i].cnt);
}
return all;
}

//得到一个QQ号的昵称
function getNick (qq) {

for(var i=0;i<$(feeds).children().length;i++)
{
//	console.log(i);
	if (!feeds) { return "error1";};
	var feedSingle=$(feeds).children()[i];
	var comments=$(feedSingle).find(".comments-item.bor3");

	for(var j=0;j<comments.length;j++)
	{	if (!comments) {return "error2";};
		var qq1=0;var qq2=0;var nick="";
		var content=$(comments[j]).find(".comments-content").first();
		var Links=$(content).children().filter("a");
		if(!Links){return "error3"}
		switch (Links.length)
		{
			case 2:
				qq2=getNumfromString($(Links[1]).attr("href"));
//				console.log(" in switch:"+qq2);
				if(qq2==qq)
					{
						nick=$(Links[1]).text();
//						console.log(nick);
						return nick;
					}
			case 1:
				qq1=getNumfromString($(Links[0]).attr("href"));
//				console.log(" in switch:"+qq1);
				if(qq1==qq)
					{
						nick=$(Links[0]).text();
//						console.log(nick);
						return nick;
					}

		}
	}
}
}

