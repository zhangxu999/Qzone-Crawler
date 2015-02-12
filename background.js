var Port;
chrome.runtime.onConnect.addListener(function  (port) {
	Port=port
	console.log("background onConnect");
	console.log("port name："+port.name)
	port.onMessage.addListener(onMessage);
	// body...
});
function onMessage (msg) {
	var location="background";
	var url = "infobar.html#"
	console.log("I am in "+location);
	console.log("I am from "+msg.hello);
	url2=document.URL;
	Port.postMesage({act:"test",hello:url2});
	chrome.infobars.show({tabId:Port.sender.tab.id,path: url});
}