// 삼항연산자
// 조건?참일때:거짓일때
console.log(3 > 5 ? "참" : "거짓");

// data-set
$("#bt-data-test").click(function () {
	var id = $(this).data("id");
	var show = $(this).data("show-text");
	var hide = $(this).data("hide-text");
	console.log(id, show, hide);
});

// 전역변수
var html = '';
var scoreURL = {
	site: "http://webmir.co.kr/score",
	cURL: "/score_in.php",
	rURL: "/score_li.php",
	uURL: "/score_up.php",
	dURL: "/score_del.php",
	getURL: function(url) {
		if(url == "C") return this.site + this.cURL;
		else if(url == "R") return this.site + this.rURL;
		else if(url == "U") return this.site + this.uURL;
		else if(url == "D") return this.site + this.dURL;
	}
}
var nowPage = 1;

console.log($);
console.log(jQuery);

getData(nowPage);
// 리스트 가져오기 
// get / https://webmir.co.kr/score/score_li.php / page
function getData(page) {
	nowPage = page;		//지역변수 page의 값을 전역변수 nowPage에 넣어준다.
	$.ajax({
		type: "get",
		url: scoreURL.getURL('R'),
		data: {
			page: page
		},
		dataType: "json",
		beforeSend: function() {
			//로딩바...
		},
		success: function (res) {
			console.log(res);
			$(".score-tb").find("tbody").empty();
			for (var i in res.student) {
				html = '<tr>';
				html += '<td>' + res.student[i].stdname + '</td>';
				html += '<td>' + res.student[i].kor + '점</td>';
				html += '<td>' + res.student[i].eng + '점</td>';
				html += '<td>' + res.student[i].math + '점</td>';
				html += '<td class="text-center">';
				html += '<button class="btn btn-success" onclick="upData(this, '+res.student[i].id+');">수정</button> ';
				html += '<button class="btn btn-danger" onclick="delData(this, '+res.student[i].id+');">삭제</button>';
				html += '<button class="btn btn-primary d-none" onclick="saveData(this, '+res.student[i].id+');">저장</button> ';
				html += '<button class="btn btn-info d-none" onclick="upCancel(this, '+res.student[i].id+');">취소</button>';
				html += '</td>';
				html += '</tr>';
				$(".score-tb").find("tbody").append(html);
			}
			pagerMaker(res.total, page);
		},
		error: function (xhr) {
			alert("통신이 실패했습니다. 관리자에게 문의하세요.");
			console.log(xhr);
		}
	});
}

// 리스트 수정하기
function upData(bt, id) {
	console.log(bt, $(bt), id);
	var $bt = $(bt);
	var $td = $bt.parent();
	var $tr = $td.parent();
	for(var i=0, txt='', type='text'; i<4; i++) {
		txt = $tr.children("td").eq(i).text();
		if(i>0) {
			txt = txt.replace("점", "");
			type = "number";
		}
		html = '<input type="'+type+'" class="form-control" value="'+txt+'">';
		$tr.children("td").eq(i).html(html);
	}
	$td.children(".btn").toggleClass("d-none");
}

function upCancel(bt, id) {
	getData(nowPage);
	/*
	var $bt = $(bt);
	var $td = $bt.parent();
	var $tr = $td.parent();
	for(var i=0, txt=''; i<4; i++) {
		txt = $tr.find("td").eq(i).find("input").val();
		if(i>0) txt += "점";
		$tr.children("td").eq(i).html(txt);
	}
	$td.children(".btn").toggleClass("d-none");
	*/
}


// 리스트 저장하기
function saveData(bt, id){
	var url = scoreURL.getURL('C');			// 초기값은 score_in.php로 설정
	var option = {};										// $.ajax의 data 값을 저장할 객체변수
	var $tr = $(bt).parent().parent();
	var $input = $tr.find("input");
	var comment = [];
	comment[0] = "학생이름을";
	comment[1] = "올바른 국어 점수를";
	comment[2] = "올바른 영어 점수를";
	comment[3] = "올바른 수학 점수를";
	for(var i=0; i<$input.length; i++) {
		if(i == 0) {
			if($input.eq(i).val() == "") {
				alert(comment[i] + " 입력해 주세요.");
				$input.eq(i).focus();
				return;
			}
		}
		else {
			if($.trim($input.eq(i).val()) == "" || Number($input.eq(i).val()) < 0 || Number($input.eq(i).val()) > 100) {
				alert(comment[i] + " 입력하세요.");
				$input.eq(i).focus();
				return;
			}
		}
	}

	option = {
		stdname: $.trim($input.eq(0).val()),
		kor: $input.eq(1).val(),
		eng: $input.eq(2).val(),
		math: $input.eq(3).val()
	};
	
	if(id > 0) {
		url = scoreURL.getURL('U');	// 최초설정값은 score_in.php를 score_up.php로 교체
		option.id = id;							// id 값을 option에 추가
	}

	$.ajax({
		type: "post",
		url: url,
		data: option,
		dataType: "json",
		success: function (res) {
			if (res.code == 200) {
				if(id == 0) $input.val('');
				getData(nowPage);
			}
			else alert("데이터 처리가 실패했습니다. 관리자에게 문의하세요.");
		}
	});

	/*
	var stdname = $.trim($("#stdname").val());
	var kor = Number($("#kor").val());
	var eng = Number($("#eng").val());
	var math = Number($("#math").val());
	if(kor == 0) kor = "0";
	if(eng == 0) eng = "0";
	if(math == 0) math = "0";
	if(stdname == "") {
		alert("학생 이름을 입력해 주세요.");
		$("#stdname").focus();
		return;
	}
	if(kor == "" || kor<0 || kor>100) {
		alert("올바른 국어점수를 입력하세요.");
		$("#kor").focus();
		return;
	}
	if(eng == "" || eng<0 || eng>100) {
		alert("올바른 영어점수를 입력하세요.");
		$("#eng").focus();
		return;
	}
	if(math == "" || math<0 || math>100) {
		alert("올바른 수학점수를 입력하세요.");
		$("#math").focus();
		return;
	}
	$.ajax({
		type: "post",
		url: scoreURL.cURL,
		data: {
			stdname: stdname,
			kor: kor,
			eng: eng,
			math: math
		},
		dataType: "json",
		success: function (res) {
			if (res.code == 200) getData(nowPage);
			else alert("데이터 처리가 실패했습니다. 관리자에게 문의하세요.");
		}
	});
	*/
}

// 리스트 삭제하기 
function delData(bt, id) {
	if(confirm("정말로 삭제하시겠습니까?")) {
		$.ajax({
			type: "post",
			url: scoreURL.getURL('D'),
			data: {id: id},
			dataType: "json",
			success: function (res) {
				if (res.code == 200) getData(nowPage);
				else alert("데이터 처리가 실패했습니다. 관리자에게 문의하세요.");
			}
		});
	}
}


// 페이저 생성
function pagerMaker(total, page) {
	var div = 5; // 세트당 나올 페이지 수
	var cnt = Math.ceil(total / 10); // 전체 페이지 개수
	var stn = 0; // 세트중에 시작페이지
	var edn = 0; // 세트중에 마지막페이지
	var prev = 0; // < 를 클릭시 나타날 페이지 
	var next = 0; // > 를 클릭시 나타날 페이지
	var prevShow = false;	// << 회색(false), 파란색(true)
	var lastShow = false;	// >> 회색(false), 파란색(true)
	var lastIndex = (Math.ceil(cnt / div) - 1); // 페이지 세트의 마지막 index
	var nowIndex = (Math.ceil(page / div) - 1); // 현재페이지 세트의 index

	stn = nowIndex * div + 1; // 세트의 시작페이지 값
	if (cnt < stn + div - 1) edn = cnt;		// 세트의 마지막 페이지 값
	else edn = stn + div - 1;

	if (nowIndex > 0) {
		prevShow = true;
		prev = stn - 1;
	}

	if (lastIndex > nowIndex) {
		lastShow = true;
		next = edn + 1;
	}

	console.log("stn:" + stn);
	console.log("edn:" + edn);
	console.log("lastIndex:" + lastIndex);
	console.log("nowIndex:" + nowIndex);

	html = '<li class="page-item page-first ' + (prevShow ? "" : "disabled") + '" data-page="' + prev + '">';
	html += '<span class="page-link"><i class="fas fa-angle-double-left"></i></span>';
	html += '</li>';
	html += '<li class="page-item page-prev ' + ((page > 1) ? "" : "disabled") + '" data-page="' + ((page > 1) ? (page - 1) : 0) + '">';
	html += '<span class="page-link"><i class="fas fa-angle-left"></i></span>';
	html += '</li>';
	for (var i = stn; i <= edn; i++) {
		html += '<li class="page-item page-ct ' + (page == i ? "active" : "") + '" data-page="' + i + '">';
		html += '<span class="page-link">' + i + '</span>';
		html += '</li>';
	}
	html += '<li class="page-item page-next ' + (page < cnt ? "" : "disabled") + '" data-page="' + ((page < cnt) ? (page + 1) : 0) + '">';
	html += '<span class="page-link"><i class="fas fa-angle-right"></i></span>';
	html += '</li>';
	html += '<li class="page-item page-last ' + (lastShow ? "" : "disabled") + '" data-page="' + next + '">';
	html += '<span class="page-link"><i class="fas fa-angle-double-right"></i></span>';
	html += '</li>';
	$(".pager").html(html);
	$(".page-item").click(function () {
		if (!$(this).hasClass("disabled")) getData($(this).data("page"));
	});
}
console.log(!false);




/*
function deleteMaker() {
	// post / https://webmir.co.kr/score/score_del.php / id
	$(".bt-del").click(function () {
		if(confirm("정말로 삭제하시겠습니까?")) {
			$.ajax({
				type: "post",
				url: scoreURL.dURL,
				data: {id: $(this).data("id")},
				dataType: "json",
				success: function (res) {
					if (res.code == 200) getData(nowPage);
					else alert("데이터 처리가 실패했습니다. 관리자에게 문의하세요.");
				}
			});
		}
	});
}
*/


