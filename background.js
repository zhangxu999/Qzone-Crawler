
 var outterPort,innerPort;
var tabID,currentPort;
var tabinfo={active:true,currentWindow:true};
//发送建立连接请求，并监听消息响应
//得到current 端port
function getcurrenttab () {
	// body...
	/*
	chrome.tabs.query(tabinfo,function(tabs){
	console.log("active tab:"+tabs[0].id+" length:  "+tabs.length);
	tabID=tabs[0].id;
	console.log(tabs);
	currentPort=chrome.tabs.connect(tabID,{name:"background"});
	currentPort.onMessage.addListener(onMessage);
	console.log("log:   "+" background tab query");
	//currentPort.postMessage({act:"getPackage",hello:"in background port"});
	chrome.tabs.getcurrent()
	*/

}


//得到background端port
chrome.runtime.onConnect.addListener(function  (port) {
	
		port.name==="outter"?(outterPort=port):(innerPort=port);	
	console.log("log:   "+"background onConnect");
	console.log("log:   "+"port name："+port.name);
//	port.postMessage({act:"test",hello:document.URL});
	port.onMessage.addListener(onMessage);
	// body...
});

function onMessage (msg, port) {
	console.log(msg.act+"   :"+msg.data +msg.from);
	//console.log(port.portId_);
	//bgPorts[port.portId_].postMessage({act:"test",hello:"from background"+port.portId_});
	//background.postMessage({act:"test",hello:"from background"});
	//chrome.infobars.show({tabId:port.sender.tab.id,path: url});
	

	//接收来自inner的消息
	if(msg.from=="inner")
	{
	switch (msg.act)
	{
		case "finddatatoshow":
		console.log("log --bkg  : finddatatoshow ");	
    	outterPort.postMessage({act:"finddatatoshow",data:msg.data,from:"inner"});
    	break;
    	case "reDect":
    	outterPort.postMessage({act:"reDect",from:"inner",data:msg.data});
    	break;
    	case "getTop":
		outterPort.postMessage({act:"getTop",from:"inner",data:msg.data});
		break;
		case "upload":
		outterPort.postMessage({act:"upload",from:"inner",data:msg.data});
		break;
	};
		
			//currentPort.postMessage({act:"finddatatoshow",data:msg.data});
	}

	//接收来自outter的消息
	else
	{
		switch (msg.act)
	{
		case "reDect":
		innerPort.postMessage({act:"reDect",from:"outter"});
		break;
		case "getTop":
		innerPort.postMessage({act:"getTop",from:"outter"});
		break;
		case "upload":
		innerPort.postMessage({act:"upload",from:"outter"});
		break;

	}
}
}