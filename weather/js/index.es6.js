// 전역변수선언
var key = '02efdd64bdc14b279bc91d9247db4722';
var units = 'metric';
var dailyAPI = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyAPI = 'https://api.openweathermap.org/data/2.5/forecast';
//https://api.openweathermap.org/data/2.5/weather?id=1835848&appid=02efdd64bdc14b279bc91d9247db4722&units=metric
var cityURL = '../json/city.json';
var dailyURL = dailyAPI + '?appid=' + key + '&units=' + units;
var weeklyURL = weeklyAPI + '?appid=' + key + '&units=' + units;

// 프로그램 시작
init();

function init() {
	wrapChg("M");
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = cityFn;
	ajax.open('GET', cityURL, true);
	ajax.send();
}

// 네비게이션 이벤트 처리
// console.log(document.querySelectorAll(".navi > li"));
for(var v of document.querySelectorAll(".navi > li")) {
	v.addEventListener("click", (e) => {
		switch(e.target.outerText) {
			case "DAILY":
				wrapChg("D");
				break;
			case "WEEKLY":
				wrapChg("W");
				break;
			default:
				init();
				break;
		}
	});
}


// wrapChg - 화면 Show/Hide
/*
function wrapChg(type) {
	switch (type) {
		case "D":
			document.querySelector(".wrap-daily").style.display = "block";
			document.querySelector(".wrap-weekly").style.display = "none";
			document.querySelector(".wrap-main").style.display = "none";
			break;
		case "W":
			document.querySelector(".wrap-daily").style.display = "none";
			document.querySelector(".wrap-weekly").style.display = "block";
			document.querySelector(".wrap-main").style.display = "none";
			break;
		default:
			document.querySelector(".wrap-daily").style.display = "none";
			document.querySelector(".wrap-weekly").style.display = "none";
			document.querySelector(".wrap-main").style.display = "block";
			break;
	}
}

function navClear(_obj) {
	// _obj = document.querySelectorAll(".navi");
	_obj.forEach((v, i) => {
		v.querySelectorAll("li").forEach((v2, i2) => {
			v2.classList.remove("navi-sel");
		});
	});
}
*/

function wrapChg(type) {
	const _daily = document.querySelector(".wrap-daily");
	const _weekly = document.querySelector(".wrap-weekly");
	const _main = document.querySelector(".wrap-main");
	const _nav = document.querySelectorAll(".navi");
	switch (type) {
		case "D":
			//_nav[0].children[1].classList.add("navi-sel");
			_daily.classList.add("d-block");
			_daily.classList.remove("d-none");
			_weekly.classList.add("d-none");
			_weekly.classList.remove("d-block");
			_main.classList.add("d-none");
			_main.classList.remove("d-block");
			break;
		case "W":
			//_nav[1].children[2].classList.add("navi-sel");
			_daily.classList.add("d-none")
			_daily.classList.remove("d-block");
			_weekly.classList.add("d-block");
			_weekly.classList.remove("d-none");
			_main.classList.add("d-none");
			_main.classList.remove("d-block");
			break;
		default:
			_daily.classList.add("d-none");
			_daily.classList.remove("d-block");
			_weekly.classList.add("d-none");
			_weekly.classList.remove("d-block");
			_main.classList.add("d-block");
			_main.classList.remove("d-none");
			break;
	}
}

// 도시 정보 가져오기
function cityFn() {
	if (this.readyState == 4 && this.status == 200) {
		var _city = document.querySelector("#cities");
		var res = JSON.parse(this.responseText).cities;
		_city.innerHTML = '<option value="" selected>도시를 선택해 주세요.</option>';
		for(var v of res) _city.innerHTML += `<option value="${v.id}">${v.name}</option>`;
		/*
		var _elem = document.createElement('option');
		var title = document.createTextNode('도시를 선택해 주세요.');
		_elem.appendChild(title);
		_elem.setAttribute("value", "");
		_elem.setAttribute("selected", "selected");
		_city.innerHTML = "";
		_city.appendChild(_elem);
		//<option value="" selected>도시를 선택해 주세요.</option>
		for (var i in res) {
			_elem = document.createElement('option');
			title = document.createTextNode(res[i].name);
			_elem.setAttribute("value", res[i].id);
			_elem.appendChild(title);
			_city.appendChild(_elem);
		}
		*/
		_city.addEventListener("change", function (e) {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = dailyFn;
			ajax.open('GET', dailyURL + "&id=" + e.target.value, true);
			ajax.send();
			var ajax2 = new XMLHttpRequest();
			ajax2.onreadystatechange = weeklyFn;
			ajax2.open('GET', weeklyURL + "&id=" + e.target.value, true);
			ajax2.send();
		});
	}
}

// 데일리 정보 가져오기
function dailyFn() {
	if (this.readyState == 4 && this.status == 200) {
		let res = JSON.parse(this.responseText);
		let iconSrc = `../img/icon/${res.weather[0].icon}.png`;
		let temp = `현재온도: <b>${res.main.temp}</b>℃`;
		let desc = `현재날씨: ${res.weather[0].main}`;
		let _wrap = document.querySelector(".wrap-daily").querySelector(".conts");
		let _title = document.createElement("div");
		let _img = document.createElement("div");
		let _temp = document.createElement("div");
		let _desc = document.createElement("div");
		_title.innerHTML = '오늘의 날씨';
		_img.innerHTML = `<img src="${iconSrc}" class="w-100 daily-img">`;
		_temp.innerHTML = temp;
		_desc.innerHTML = desc;
		_title.setAttribute("class", "text-center py-3 fa-3x");
		_img.setAttribute("class", "text-center py-3");
		_temp.setAttribute("class", "text-center py-3 fa-2x");
		_desc.setAttribute("class", "text-center py-3 fa-2x");
		_wrap.innerHTML = '';
		_wrap.appendChild(_title);
		_wrap.appendChild(_img);
		_wrap.appendChild(_temp);
		_wrap.appendChild(_desc);
		wrapChg("D");
	}
}

// 위클리 정보 가져오기
function weeklyFn() {
	if (this.readyState == 4 && this.status == 200) {
		let res = JSON.parse(this.responseText);
		var kts;
		var html = '';
		var _conts = document.querySelector(".wrap-weekly > .conts");
		_conts.innerHTML = '';
		for(var v of res.list) {
			kts = new Date(new Date(v.dt_txt).getTime() + (9*60*60*1000));
			html = `
			<li class="w-item">
				<div>
					<img src="../img/icon/${v.weather[0].icon}.png" class="w-100">
				</div>
				<ul>
					<li class="w-temp">
						<span>${v.main.temp}</span>℃
					</li>
					<li class="w-desc">
						<span>${v.weather[0].main}</span>
						<span>${v.weather[0].description}</span>
					</li>
					<li class="w-date">${dspDate(kts, 2)} 예보</li>
				</ul>
			</li>`;
			_conts.innerHTML += html;
		}
	}
}