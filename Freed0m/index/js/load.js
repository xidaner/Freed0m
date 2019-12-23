$(function(){
	var beforeDate = new Date();

	var $window = $(window),
		$doc = $(document),
		$body = $("body"),
	    winWidth = $window.width(),
		docWidth = $doc.width(),
		docHeight = $doc.height(),
		winHeight = $window.height(),	
		speed = 250;
	$body.append("<div  id=\"pageLoad\" style=\"width:"+ docWidth +"px;height:"+ docHeight +"px;\"><div style=\"left:"+ (winWidth-350)*0.5 +"px;top:"+ (winHeight-150)*0.5 +"px;\"><a href=\"http://sc.chinaz.com\"></a><samp><em></em></samp><span>0</span><p></p></div></div>");

	var afterDate = new Date(),
	    pagePreLoad = (afterDate - beforeDate),
	    time = 10/pagePreLoad,
		preImgLen = 35/pagePreLoad,
		n = 0,
		m = 0,
		play = setInterval(function(){
			if(Number(n) >= 100 && Number(m) >= 350) { 
				clearInterval(play); 
				n = 100;
				m = 350;			

				setTimeout(function(){
					$("#pageLoad").fadeOut(400,function(){
						$(this).remove();
						location.href="file:///C:/Users/ABC/Desktop/24%20%E5%BC%A0%E7%A6%A7/contact.html#";
					});
					stop;		
			
				},200);
			};		
			$("#pageLoad").find("samp").css("width",m);		
			$("#pageLoad").find("span").text(Math.floor(n)+"%");
			n += time;
			m += preImgLen;
		},100);
		
});