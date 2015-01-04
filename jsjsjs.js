javascript:
(
	function all() {
		if ($('div#dui-dialog-lyric').length > 0) 
			{return;}
		var s=FM.getCurrentSongInfo();
		$.getJSON('http://dblyrics.ynm3000.com/frame/?callback=?',{},function(data){var new_e = document.createElement('div');new_e.innerHTML=data.response;$('body').append(new_e);});
	})
();

console.log("hello");