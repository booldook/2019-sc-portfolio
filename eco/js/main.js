$(".fa-user").mouseover(function(){
	$(this).next().css({
		"opacity":1, "transform":"translateY(0)"
	});
});
$(".fa-user").mouseleave(function(){
	$(this).next().css({
		"opacity":0, "transform":"translateY(20px)"
	});
});

/* 
$(객체).animate(
	{애니메이션 될 css}, 
	[1000(속도)], 
	[timing func], 
	[function(){
		애니메이션 종료후 발생할 함수
	}]);
*/

// top Navigation
$(".navi").mouseenter(function(){
	$(this).children(".top-sub").css({"display":"flex"});
	$(this).children(".top-sub").stop().animate({
		"opacity": 1, "top": "30px"
	}, 700);
});
$(".navi").mouseleave(function(){
	$(this).children(".top-sub").stop().animate({
		"opacity": 0, "top": "60px"
	}, 400, function(){
		$(this).css({"display":"none"});
	});
});

// items
var items = [
	{
		src: "../img/ecofood_10_400x.png", 
		title: "Weight Loss", 
		desc: "A delicious and easy way to join a healthy diet and control your weight and well-being."
	},
	{
		src: "../img/ecofood_11_400x.png", 
		title: "Balanced Diet", 
		desc: "Tasty and easy way to join a healthy diet, control your weight and health."
	},
	{
		src: "../img/ecofood_12_400x.png", 
		title: "Sports Nutrition", 
		desc: "Active growth of muscle mass, relief formation, drying - choose your own mode."
	},
	{
		src: "../img/ecofood_13_400x.png", 
		title: "Food for Moms", 
		desc: "Nutrition program for women in position and breastfed women."
	},
	{
		src: "../img/ecofood_14_400x.png", 
		title: "Eco-Life", 
		desc: "Juices and smoothies, fruits and vegetables - all for a comfortable and tasty cleansing of the body (detox)."
	},
	{
		src: "../img/ecofood_15_400x.png", 
		title: "Without Meat", 
		desc: "Weight loss programs without animal products."
	}
];

for(var i=0, html=''; i<items.length; i++) {
	html  = '<ul class="item p-3 mb-4 col-sm-6 col-md-4">';
	html += '<li class="rounded-circle overflow-hidden">';
	html += '<img src="'+items[i].src+'" class="w-100"></li>';
	html += '<li class="mt-5 mb-3"><h4>'+items[i].title+'</h4></li>';
	html += '<li class="text-secondary">'+items[i].desc+'</li>';
	html += '</ul>';
	$(".items > .row").append(html);
}

$(".item").mouseenter(function(){
	$(this).find("img").addClass("item-img-hover");
});
$(".item").mouseleave(function(){
	$(this).find("img").removeClass("item-img-hover");
});


// ads
var ads = [
	{
		src: "../img/ecofood_02_x1024.png",
		title: "Vegans Foods",
		desc: "Nutrition program without animal products.",
		link: "https://naver.com",
		position: "left"
	},{
		src: "../img/ecofood_03_x1024.png",
		title: "Diabetic Nutrition",
		desc: "Maximum comfortable gradual weight loss<br>and the establishment of metabolic processes",
		link: "https://daum.net",
		position: "right"
	},{
		src: "../img/ecofood_01_x1024-center.png",
		title: "Center Nutrition",
		desc: "Maximum comfortable gradual weight loss<br>and the establishment of metabolic processes",
		link: "https://daum.net",
		position: "center"
	}
];

// for(var i=0; i<ads.length; i++) {
var html = '';
var adsNow = 0;
var adsEnd = ads.length - 1;
var adsSpeed = 1000;
var adsGap = 4000;
var adsInterval;
for(var i in ads) {
	html  = '<img src="'+ads[i].src+'" class="ads-img w-100 position-absolute" style="top: 0; opacity: 0;">';
	html += '<div class="ads-slogan position-absolute pt-serif d-flex justify-content-center align-items-center w-50 h-100" style="top: 0; z-index: 99; opacity: 0;';
	if(ads[i].position == "left") html += 'left: 0;">';
	if(ads[i].position == "right") html += 'right: 0;">';
	if(ads[i].position == "center") html += 'width: 100% !important; text-align: center;">';
	html += '<ul>';
	html += '<li class="title">'+ads[i].title+'</li>';
	html += '<li class="desc">'+ads[i].desc+'</li>';
	html += '<li><a href="'+ads[i].link+'" class="btn btn-success">Discover Now!</a></li>';
	html += '</ul>';
	html += '</div>';
	$(".ads").append(html);
	$(".ads-pager").append('<span class="pointer">●</span>');
}

// 배너이미지의 높이를 가져다가 .ads의 높이를 생성
$(window).resize(function(){
	$(".ads").outerHeight($(".ads-img").eq(0).outerHeight());
	$(".footer-wrap .list").attr("style", "");
});
$(".ads-img").imagesLoaded(function(){
	$(window).trigger("resize");
});

// 스크롤 발생 이벤트
$(window).scroll(function(){
	var scTop = $(this).scrollTop();
	if(scTop > 400) $(".bt-top").addClass("bt-top-show");
	else $(".bt-top").removeClass("bt-top-show");
});
$(".bt-top").click(function(){
	$("html, body").stop().animate({"scrollTop": 0}, 500);
});


adsAni();
adsInterval = setInterval(adsAni, adsGap);
function adsAni() {
	// pager 처리
	$(".ads-pager span").removeClass("text-dark").addClass("text-muted");
	$(".ads-pager span").eq(adsNow).removeClass("text-muted").addClass("text-dark");

	// slogan 애니메이션
	$(".ads-slogan").stop().animate({"top": "50%", "opacity": 0}, adsSpeed/2, function(){
		$(this).css({"top": 0});
	});
	if(ads[adsNow].position == "left") {
		$(".ads-slogan").eq(adsNow).css({"left": "-100%"});
		$(".ads-slogan").eq(adsNow).stop().animate({"left": 0, "opacity": 1}, adsSpeed/2);
	}
	if(ads[adsNow].position == "right") {
		$(".ads-slogan").eq(adsNow).css({"right": "-100%"});
		$(".ads-slogan").eq(adsNow).stop().animate({"right": 0, "opacity": 1}, adsSpeed/2);
	}
	if(ads[adsNow].position == "center") {
		$(".ads-slogan").eq(adsNow).css({"top": "-50%"});
		$(".ads-slogan").eq(adsNow).stop().animate({"top": 0, "opacity": 1}, adsSpeed/2);
	}

	// 배경이미지 애니메이션
	$(".ads-img").stop().animate({"opacity": 0}, adsSpeed);
	$(".ads-img").eq(adsNow).stop().animate({"opacity": 1}, adsSpeed, function(){
		if(adsNow == adsEnd) adsNow = 0;
		else adsNow++;
	});
}

$(".ads-pager span").click(function(){
	adsNow = $(this).index();
	adsAni();
});

$(".ads-wrap, .ads, .ads-pager").hover(function(){
	clearInterval(adsInterval);
}, function(){
	clearInterval(adsInterval);
	adsInterval = setInterval(adsAni, adsGap);
});


// popular
var populars = [
	{src: "../img/Adoloremque_600x.jpg", title: "Adoloremque", price: "$48.00"},
	{src: "../img/Aperiam_600x.jpg", title: "Aperiam", price: "$48.00"},
	{src: "../img/Architecto_600x.jpg", title: "Architecto", price: "$48.00"},
	{src: "../img/Beatae_vitae_600x.jpg", title: "Beatae vitae", price: "$48.00"},
	{src: "../img/Consequuntur_600x.jpg", title: "Consequuntur", price: "$48.00"},
	{src: "../img/Dicta_600x.jpg", title: "Dicta", price: "$48.00"},
	{src: "../img/Eaque_ipsa_quae_ab_illo_600x.jpg", title: "Dolores", price: "$48.00"},
	{src: "../img/Magni_dolores_600x.jpg", title: "Eaque ipsa quae ab illo", price: "$48.00"}
];

for(var i in populars) {
	html  = '<ul class="prd my-4 position-relative pointer">';
	html += '<li class="prd-img"><img src="'+populars[i].src+'" class="w-100"></li>';
	html += '<li class="prd-title mt-3 f-125">'+populars[i].title+'</li>';
	html += '<li class="prd-price my-2 f-175">'+populars[i].price+'</li>';
	html += '<li class="prd-bt">';
	html += '<button class="btn btn-lg btn-success">Add to Cart</button>';
	html += '</li>';
	html += '<li data-toggle="tooltip" data-placement="left" title="Quick View" class="prd-icon prd-view tooltip-bt"><i class="fas fa-eye"></i></li>';
	html += '<li data-toggle="tooltip" data-placement="left" title="You need to login" class="prd-icon prd-login tooltip-bt"><i class="fas fa-heart"></i></li>';
	html += '<li data-toggle="tooltip" data-placement="left" title="Add to Compare"  class="prd-icon prd-compare tooltip-bt"><i class="fas fa-balance-scale"></i></li>';
	html += '</ul>';
	$(".popular-wrap .prds").append(html);
}


$(".popular-wrap .prd").mouseenter(function(){
	$(this).find(".prd-icon").css({"opacity": 1});
});
$(".popular-wrap .prd").mouseleave(function(){
	$(this).find(".prd-icon").css({"opacity": 0});
});


// footer
$(".footer-wrap .title").click(function(){
	if($(this).css("cursor") == "pointer") {
		$(this).parent().children(".list").toggle();
		var $span = $(this).children("span");
		if($span.text() == "+") $span.text("-");
		else $span.text("+"); 
	}
});




// WOW 시동
new WOW().init();

// tooltip 시동
$(".tooltip-bt").tooltip();