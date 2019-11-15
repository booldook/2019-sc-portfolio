/* 
// jQuery ajax 통신
function cityInit() {
	$.ajax({
		type: "get",
		url: "json/city.json",
		dataType: "json",
		success: function (res) {
			console.log(res);
		}
	});
}
*/

// 전역변수
var ajax = new XMLHttpRequest();
var dailyAjax = new XMLHttpRequest();
var weeklyAjax = new XMLHttpRequest();
var key = '02efdd64bdc14b279bc91d9247db4722';
var dailyAPI = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyAPI = 'https://api.openweathermap.org/data/2.5/forecast';
// main - 도시정보 가져오기
cityInit();
function cityInit() {
	ajax.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var cities = JSON.parse(this.responseText).cities;
			// id로 DOM 접근하기 - jQuery
			var $citySelect = $("#cities");
			// id로 DOM 접근하기 - ES5
			var citySelect5 = document.getElementById("cities");
			// id로 DOM 접근하기 - ES6
			var citySelect = document.querySelector("#cities");
			console.log($citySelect[0], $(citySelect5), citySelect);

			// jQuery: select#cities 에 도시를 option으로 추가하기
			/*
			for(var i in cities) {
				$citySelect.append('<option value="'+cities[i].id+'">'+cities[i].name+'</option>');
			}
			*/

			// ES5: select#cities 에 도시를 option으로 추가하기
			/*
			for(var i in cities) {
				var html = '<option value="'+cities[i].id+'">'+cities[i].name+'</option>';
				document.getElementById("cities").innerHTML += html;
				// console.log(document.getElementById("cities").innerHTML);
			}
			*/

			// ES6: select#cities 에 도시를 option으로 추가하기
			// var citySelect = document.querySelector("#cities");
			var elem;
			var cityName;
			elem = document.createElement('option');
			cityName = document.createTextNode("날씨를 검색할 도시 이름을 선택해 주세요.");
			elem.appendChild(cityName);
			elem.setAttribute("value", "");
			elem.setAttribute("selected", "selected");
			citySelect.appendChild(elem);
			for(var i in cities) {
				// tag를 만든다. 단 DOM에 적용되지 전단계
				elem = document.createElement('option');
				// tag 안에 삽입될 텍스트를 만든다.	
				cityName = document.createTextNode(cities[i].name);
				// 생성된 tag에 속성을 준다.
				elem.setAttribute("value", cities[i].id);
				// 생성된 tag에 생성된 텍스트를 붙인다.
				elem.appendChild(cityName);
				// 생성된 tag를 원하는 DOM의 Element에 붙인다.
				citySelect.appendChild(elem);
			}

			// jQuery select change 이벤트
			/*
			$("#cities").change(function(){
				console.log(	$(this).val()	);
			});
			*/

			// ES5, ES6 change 이벤트
			// citySelect.addEventListener(이벤트, 콜백함수)
			citySelect.addEventListener("change", function(){
				var cityId = this.value;
				var dailyURL = dailyAPI + "?appid=" + key + "&id=" + cityId;
				dailyAjax.onreadystatechange =  function(){
					if (this.readyState == 4 && this.status == 200) {
						var daily = JSON.parse(this.responseText);
						console.log(daily);
					}
				};
				dailyAjax.open("GET", dailyURL, true);
				dailyAjax.send();
			});
		}
	};
	ajax.open("GET", "../json/city.json", true);
	ajax.send();
}


/*
// innerHTML 사용법
var a = 5;
var html = a;
html += a;
console.log(html);

// var html = document.getElementById("sample").innerHTML;
// document.getElementById("sample").innerHTML = document.getElementById("sample").innerHTML + '<span>마바사아</span>';
document.getElementById("sample").innerHTML += '<span>마바사아</span>';
console.log(html);
*/