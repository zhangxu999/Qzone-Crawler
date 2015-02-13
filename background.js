var contentPort;
var backgroundPort=chrome.runtime.connect({name:"bgport"});
backgroundPort.onMessage.addListener(onMessage);


var tabID,backgroundPort,contentPort;
var tabinfo={active:true,currentWindow:true};
//发送建立连接请求，并监听消息响应
//得到background 端port
chrome.tabs.query(tabinfo,function(tabs){
	console.log("active tab:"+tabs[0].id+" length:  "+tabs.length);
	tabID=tabs[0].id;
	backgroundPort=chrome.tabs.connect(tabID,{name:"background"});
	backgroundPort.onMessage.addListener(onMessage);
	console.log(" background tab query");
	//backgroundPort.postMessage({act:"getPackage"});
});

//得到content端port
chrome.runtime.onConnect.addListener(function  (port) {
	contentPort=port;
	console.log("background onConnect");
	console.log("port name："+port.name);
	contentPort.onMessage.addListener(onMessage);
	// body...
});
function onMessage (msg) {
	var location="background";
	var url = "infobar.html#";
	console.log(msg.hello);
	
	Port.postMessage({act:"test",hello:"from background"});
	chrome.infobars.show({tabId:Port.sender.tab.id,path: url});
}