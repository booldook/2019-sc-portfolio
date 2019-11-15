var adsNow = 0;

$(".pager span").click(function(){
	adsNow = $(this).index();
	adsAni();
});
$(".pager span").eq(0).trigger("click");

function adsAni(){
	$(".pager span").addClass("text-secondary");
	$(".pager span").eq(adsNow).removeClass("text-secondary");
	
	$(".ads-img").stop().animate({"opacity": 0}, 1000);
	$(".ads-img").eq(adsNow).stop().animate({"opacity": 1}, 1000);

	var dir = $(".ads-slogan").eq(adsNow).data("dir");
	$(".ads-slogan").stop().animate({"top": "80%", "opacity": 0}, 1000);
	$(".ads-slogan").eq(adsNow).css({"top":"40%"});
	if(dir == "left") {
		$(".ads-slogan").eq(adsNow).css({"left":"-20%"});
		$(".ads-slogan").eq(adsNow).stop().animate({"left": 0, "opacity": 1}, 1000);
	}
	else if(dir =="right") {
		$(".ads-slogan").eq(adsNow).css({"right":"-20%"});
		$(".ads-slogan").eq(adsNow).stop().animate({"right": 0, "opacity": 1}, 1000);
	}
	else {
		$(".ads-slogan").eq(adsNow).css({"top":"-20%"});
		$(".ads-slogan").eq(adsNow).stop().animate({"top": "40%", "opacity": 1}, 1000);
	}
}