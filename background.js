var bgPorts={};
var tabID,currentPort;
var tabinfo={active:true,currentWindow:true};
//发送建立连接请求，并监听消息响应
//得到current 端port
function getcurrenttab () {
	// body...
	chrome.tabs.query(tabinfo,function(tabs){
	console.log("active tab:"+tabs[0].id+" length:  "+tabs.length);
	tabID=tabs[0].id;
	currentPort=chrome.tabs.connect(tabID,{name:"background"});
	currentPort.onMessage.addListener(onMessage);
	console.log("log:   "+" background tab query");
	//currentPort.postMessage({act:"getPackage",hello:"in background port"});
});
}


//得到background端port
chrome.runtime.onConnect.addListener(function  (port) {
	backgroundPort=port;
	bgPorts[port.portId_]=port;
	console.log("log:   "+"background onConnect");
	console.log("log:   "+"port name："+port.name);
	port.postMessage({act:"test",hello:document.URL});
	port.onMessage.addListener(onMessage);
	// body...
});

function onMessage (msg, port) {
	console.log(msg.act+"   :"+msg.hello);
	console.log(port.portId_);
	//bgPorts[port.portId_].postMessage({act:"test",hello:"from background"+port.portId_});
	//background.postMessage({act:"test",hello:"from background"});
	//chrome.infobars.show({tabId:port.sender.tab.id,path: url});
	switch (msg.act)
	{
		case "finddatatoshow":
		console.log("log --bkg  : finddatatoshow ")
			getcurrenttab();

			currentPort.postMessage({act:"showinfobar",data:msg.data});
		case "reDect":

     

	}
}