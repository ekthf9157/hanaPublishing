$(document).ready(function(){
	menuEvent();
	
	/*content head*/
	$('#content').scroll(function() {
		var scrollValue = $(this).scrollTop();
	  	if (scrollValue > 0) {
	  		$('#header').addClass('active');
	  	} else {
	  		$('#header').removeClass('active');
	  	}
	});
	/*popup head*/
	$('.pop_cont .cont_box01, .pop_cont .cont_box02').scroll(function() {
		if ($('.layer_popup').hasClass('full')) {
			var scrollValue = $(this).scrollTop();
		  	if (scrollValue > 0) {
		  		$('.pop_head').addClass('active');
		  	} else {
		  		$('.pop_head').removeClass('active');
		  	}
		}
	});
	
	
	//공통 팝업 및 포커스 
	$('.pop_btn').off().on('click', function(){
		layerHandler(this);
	});
	
	
	//toggleCont
	$('.toggleCont > ul > li dt').off().on('click', function(){
		// 초기화
		$('.toggleCont > ul > li dt button').text('상세내용 열기');
		$(this).parents().siblings().removeClass('active');

		if( $(this).parents('li').hasClass('active')== false){
			$(this).parents('li').addClass('active');
			$(this).children('button').text('상세내용 닫기');
		} else {
			$(this).parents('li').removeClass('active');
			$(this).children('button').text('상세내용 열기');
		}
	});

	//input
	$('.ipt_box input').focus(function(){
		$(this).parents('.ipt_box').addClass('active');
	});
	$('.ipt_box input').blur(function(){
		$(this).parents('.ipt_box').removeClass('active');
	});

	
});

function menuEvent() {
	$('.btnAllMenu').click(function() {
		var start = $('#menuAll .start');
		var end = $('#menuAll .end');
		$('#menuAll').attr('tabindex', 0).show();
		$('#menuAll').focus();
		$('#menuAll').addClass('open_menu');
		$('#menuAll').css('right', -$('#menuAll').width());
	    $('#menuAll').prepend('<div class="dimmed" />');
	    $('#menuAll').stop(true, true).animate({right : '0'}, 400).stop();
	    $('#wrapper').css('overflow-y','hidden');
		end.keydown(function(e){
			var key = e.keyCode;
			if(key == '9' && e.shiftKey == false) {
				start.focus();
			} 
		});
		start.keydown(function(e){
			var key = e.keyCode;
			if(key == '9' && e.shiftKey == true) {
				end.focus();
			} 
		});
	});
	
	$('.btn_menu_close').click(function() {
		$('#menuAll').animate({right : -$('#menuAll').width()}, 400, function() {
			$('#menuAll').hide();
			$('#menuAll').find('.dimmed').remove();
		    $('#wrapper').css('overflow-y','auto');
			$('.btnAllMenu').focus();
		});
	});
};


function layerHandler(obj) {
		var bthObj = $(obj);
		var thisClass = $(obj).attr('class');
		var idNum = thisClass.substring(thisClass.length-2);
		var idPop = $('.pop_open' + idNum);
		var start = $('.pop_open' + idNum + ' .start');
		var end = $('.pop_open' + idNum + ' .end');
		idPop.attr('tabindex', 0).fadeIn();
		idPop.focus();
	    $('#wrapper').css('overflow-y','hidden');
		end.keydown(function(e){
			var key = e.keyCode;
			if(key == '9' && e.shiftKey == false) {
				start.focus();
			} 
		});
		start.keydown(function(e){
			var key = e.keyCode;
			if(key == '9' && e.shiftKey == true) {
				end.focus();
			} 
		});
		$('.close_btn' + idNum).on('click', function(){
			idPop.fadeOut(300, function() {
	            // dimmed 삭제
	            if (idPop.hasClass('tooltip')) {
	            	idPop.find('.dimmed').remove();
	            }

	        });
	        $('#wrapper').css('overflow-y','auto');
			$(bthObj).focus();
	        return false;
		});
		
}


