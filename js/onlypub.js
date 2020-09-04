// ie0, ie11 css-hack
var ua = navigator.userAgent,
  doc = document.documentElement;

if ((ua.match(/MSIE 10.0/i))) {
doc.className = doc.className + " ie10";

} else if((ua.match(/rv:11.0/i))){
doc.className = doc.className + " ie11";
}

// if (!("ontouchstart" in doc)) {
// 	    doc.className = doc.className + " no-touch";
// }


$(document).ready(function() {

	toggleZipcdTab(0);
	cyberMenuEvent();
	initMenuAll();

	
	//터치 이벤트
    $('.topGroup *,.mainMenu a, .allMenuCont .list a ,button, .btnMd, .btnSm, .btnSm02, .btnXSm').bind('touchstart touchend', function(e) {
        $(this).toggleClass('touchEffect');
    });


	// 우편번호 검색 탭 클릭 이벤트
	$('#tabZipcd li a').click(function () {
		var idx = $(this).parent().index();
		toggleZipcdTab(idx);
	});
	// 툴팁 토글
	/* 2020 - 툽팁 수정 */
	$('.btnHelp').click(function() {
		// 전체 툴팁 숨김
		$('.btnHelp').removeClass('active');
		$('.tooltip').removeClass('active');
		$('.tooltip').hide();
		$(this).addClass('active');
		$(this).next('.tooltip').addClass('active');
		$(this).next('.tooltip').show();
	});

	// 툴팁 닫기 버튼 클릭 이벤트
	$('.btnHelpClose').click(function() {
		var tooltip = $(this).parent().parent();
		tooltip.removeClass('active');
		tooltip.prev('.btnHelp').removeClass('active');
		tooltip.hide();
	});
	/*//2020 - 툽팁 수정 */

	// 보안 키패드 버튼 클릭 이벤트
	$('.btnMouse').click(function() {
		var $this = $(this)
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
	});

	var $boxinput = $('.inBox input'); //인풋 활성화 이벤트
	// var $boxinputDisabled = $('.boardQnA .inBox input'); //인풋 비활성화 이벤트
	var $boxselect = $('.inBox select');
	var $boxTextarea = $('.textareaBox textarea');

	$boxinput.each(function(){
		var $this = $(this)
		var $box = $this.parents('.inBox')
		$this.on('focusin', function(){
			$box.addClass('boxFocus')
		});
		$this.on('focusout', function(){
			$box.removeClass('boxFocus')
		});

	});


	$boxselect.each(function(){
		var $this = $(this)
		var $box = $this.parents('.inBox')
		$this.on('focusin', function(){
			$box.addClass('boxFocus')
		});
		$this.on('focusout', function(){
			$box.removeClass('boxFocus')
		});
	});

	$boxTextarea.each(function(){
		var $this = $(this)
		var $box = $this.parents('.textareaBox')
		$this.on('focusin', function(){
			$box.addClass('boxFocus')
		});
		$this.on('focusout', function(){
			$box.removeClass('boxFocus')
		});
	});


	//Top 버튼
	$("#btnGoTop").hide();

	$(function () {

	    $(window).scroll(function () {
	        if ($(this).scrollTop() > 100) {
	            $('#btnGoTop').fadeIn();

	        } else {
	            $('#btnGoTop').fadeOut();
	             $('#btnGoTop').removeClass("hover");
	        }
	    });

	    $('#btnGoTop').on("click",function () {
			// var target='#container';

			// $('body, html').css('scrollTop', $(target).offset().top);
			// $('body, html').animate({ scrollTop: $(target).offset().top }, 800);
			// window.scrollTo(0, $(target).offset().top);
			$(this).addClass("hover");

			$('body,html').animate({
			   scrollTop: 0  //탑 설정 클수록 덜 올라간다
			},400);
			  // 탑 이동 스크롤 속도를 조절할 수 있다.
			return false;


	    });
	});

	//toggleCont
	$(".toggleCont > ul > li dt").on("click", function(){
		// 초기화
		$(".toggleCont > ul > li dt button").text("열기");
		$(this).parents().siblings().removeClass('on');

		if( $(this).parents("li").hasClass("on")== false){
			$(this).parents("li").addClass("on");
			$(this).children("button").text('닫기');
		} else {
			$(this).parents("li").removeClass("on");
			$(this).children("button").text('열기');
		}
	});
	
	//toggleContvar
	$(".toggleContvar > ul > li dt").on("click", function(){
		// 초기화
		$(".toggleContvar > ul > li dt button").text("열기");
		$(this).parents().siblings().removeClass('on');

		if( $(this).parents("li").hasClass("on")== false){
			$(this).parents("li").addClass("on");
			$(this).children("button").text('닫기');
		} else {
			$(this).parents("li").removeClass("on");
			$(this).children("button").text('열기');
		};
	});	
	
	
	//table
	$(".tblToggle .trClick").on("click", function(){
		// 초기화
		$(".tblToggle .trClick td button").text("열기");
		$(this).next().siblings().removeClass('on');

		if( $(this).next().hasClass("on")== false){
			$(this).addClass("on");
			$(this).next().addClass("on");
			$(".tblToggle .trClick td button").text('닫기');
		} else {
			$(this).removeClass("on");
			$(this).next().removeClass("on");
			$(".tblToggle .trClick td button").text('열기');
		}
	});


	$('.content.type02, .contents.type02').css('min-height', $(window).height() - $('#header').height() - $('#footer').height()  - $('.bannerArea').height() - 43 + 'px');



});

/* 20200420 */
// 메인상품 토글 설정
function initToggleList() {
    $('.grp_togglelist').each(function() {
        $(this).find('> .item > .title > a').on('click', function() {
            var item = $(this).parent().parent();
            item.siblings().removeClass('active');
            if (item.hasClass('active')) {
                item.removeClass('active');
            } else {
                item.addClass('active');
            }
        });
	});
}
/* //20200420 */
//전체메뉴
function cyberMenuEvent() {
	//첫번째 메뉴 열기

  // 전체 메뉴 클릭 시 LNB 펼치기
  $('button[class=btnAllMenu]').click(function() {
    $('#menuAll').css('display','block');
    /* 20200420 */
    $('#menuAll').prepend('<div class="dimmed" />');
    $('#menuAll').find('.wrapper_popup').stop(true, true).animate({right : '0'}, 400);
    /* //20200420 */
    $("html, body,#wrap").addClass("overNo");

    $('#menuAll .dimmed').click(function () {
  	  menuClose();
    });
  });
  
  // 닫기 버튼 클릭시 LNB 접기
  $('#menuAll button[class=btn_close_popup]').click(function() {
	  /* 20200420 */
	  menuClose()
	/* //20200420 */
  });
}

function menuClose() {
	$('#menuAll').find('.wrapper_popup').animate({right : -$('#menuAll').width()}, 400, function() {
		$('#menuAll').hide();
		$('#menuAll').find('.dimmed').remove();
		$("html, body,#wrap").removeClass("overNo");
	});
}
function initMenuAll() {
    $('.list_menu_all').each(function() {
        $(this).find('> li > ul > li > a.link_toggle').on('click', function() {
            $(this).parent('li').toggleClass('active');
        });
    });
}





// 우편번호 탭
function toggleZipcdTab(idx) {
	$('.tabCont').hide();
	$('.tabCont').eq(idx).show();
	$('#tabZipcd li').removeClass('active');
	$('#tabZipcd li').eq(idx).addClass('active');
}



// 팝업 호출
function layer_open(el){

   var temp = $('#' + el);   //레이어의 id를 temp변수에 저장
   var back = temp.prev().hasClass('back');  //dimmed 레이어를 감지하기 위한 boolean 변수


   $('.layerWrap').hide();
   temp.parent('.layerWrap').show();
   temp.show();

	$("html, body,#innerWrap").addClass("overNo");
	$("#innerWrap").off("touchmove").on("touchmove", function(e) {

		e.preventDefault();
	});
	
	if ( temp.hasClass('popStyle02') ){
		temp.parent('.layerWrap').css('z-index', '901');
		$('.popup').css('display', 'fixed').css('height', temp.find('.popCont').height() + 68).css('top', ($(window).height() / 2) - (temp.find('.popCont').height() / 2) - 26.5);
	} else if ( temp.hasClass('popStyle03') ){
		temp.parent('.layerWrap').css('z-index', '901');
		$('.popup').css('height', temp.find('.popCont').height() + 30).css('top', ($(window).height() / 2) - (temp.find('.popCont').height() / 2) - 15);
	} else {
		$('.popup').css('height', $(window).height() );
		var top = 0;
		temp.find('.popup').css({top:top});
	}
	temp.find('.close, .btnClose').click(function(){
		if(back){
			$('.layerWrap').hide();
			$("html, body, #innerWrap").removeClass("overNo");
			$("#innerWrap").off("touchmove").css("overflow","auto");
		}else{
			$('.layerWrap').hide();
			temp.hide();   //'닫기'버튼을 클릭하면 레이어가 사라진다.
			$("html, body,#innerWrap").removeClass("overNo");
			$("#innerWrap").off("touchmove");
		}
		return false;
	});

   $('.layerWrap .back').click(function(){
		$('.layerWrap').hide();
		$("html, body,#innerWrap").removeClass("overNo");
		$("#innerWrap").off("touchmove");
		return false;
	});

};









