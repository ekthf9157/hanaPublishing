
// 레이어팝업
function layerPop(id) {
    var $el = $('#' + id);

    if ($el.hasClass('alert') || $el.hasClass('sns') || $el.hasClass('keypad') || $el.hasClass('tooltip') || $el.hasClass('menuAll')) {
    	// dimmed 개수 확인 후 추가
    	if ($el.find('> .dimmed').length == 0) {
            // alert, bottom 팝업일 경우 dimmed 추가
            $el.prepend('<div class="dimmed" />');
    	}
    }

    // wrapper 스크롤 hidden 처리
    $('#wrapper').css('overflow-y','hidden');

    // 팝업 표시
    $el.fadeIn();

    if ($el.hasClass('menuAll')) {
        $('.menuAll').find('.wrapper_popup').stop(true, true).animate({right : '0'}, 400);
    }

    // 닫기버튼 클릭시 레이어 닫힘
    $el.find('.btn_close_popup, .wrapper_popup .pop_close, .btn_close_tooltip').off('click').on('click', function() {
        closeLayerPop();
    });

    if ($el.hasClass('sns') || $el.hasClass('tooltip') || $el.hasClass('clickable_dim') || $el.hasClass('menuAll')) {
	    // 딤드 배경 클릭시 레이어 닫힘
    	$el.find('.dimmed').click(function() {
	        closeLayerPop();
	    });
    }

    function closeLayerPop() {
    	if ($el.hasClass('menuAll')) {
    		$el.find('.wrapper_popup').animate({right : -$('.menuAll').width()}, 400, function() {
    			$el.find('.dimmed').remove();
    			$el.fadeOut();
    		});
    	} else {
	        $el.fadeOut(300, function() {
	            // dimmed 삭제
	            if ($el.hasClass('sns') || $el.hasClass('keypad') || $el.hasClass('tooltip') || $el.hasClass('clickable_dim')) {
	            	$el.find('.dimmed').remove();
	            }
	
	        });
    	}
        // wrapper 스크롤 hidden 처리 해제
        $('#wrapper').css('overflow-y','auto');
        return false;
    }
    
    // 탭이 있을 경우 탭 상단좌표 가져오기
    $el.find('.grp_tab.st_01').each(function() {
    	var tabTopPopup = $(this).position().top-52;
    	initTab(tabTopPopup);
    });
}

// 박스형 입력폼 포커스/아웃
function initInputTypeBox() {
    $('.ipt_box').each(function() {
        var box = $(this);

        // focus시
        $(this).find('.text_input > input').focus(function() {
            box.addClass('active');
        });

        // blur시
        $(this).find('.text_input > input').blur(function() {
            box.removeClass('active');
        });
    });
}

// 토글리스트 설정
function initToggleList() {
    $('.grp_togglelist').each(function() {
        if ($(this).hasClass('st_02') || $(this).hasClass('st_03')) {
	        $(this).find('> .item > .title > button').on('click', function() {
	            var item = $(this).parent().parent();
	            item.siblings().removeClass('active');
                if (item.hasClass('active')) {
                    item.removeClass('active');
                	$('.tg_btn').text('열기');
                } else {
                    item.addClass('active');
                	$('.tg_btn').text('닫기');
                }
	        });
    	} else {
            $(this).find('> .item > .title > a').on('click', function() {
                var item = $(this).parent().parent();
	            item.siblings().removeClass('active');
                if (item.hasClass('active')) {
                    item.removeClass('active');
                } else {
                    item.addClass('active');
                }
            });
    	}
	});
}
// 토글 필수 선택 동의 약관 
function toggleMoreTerms() {
	$('.js-btn-toggle-agreemnt').on('click',function(){
		var thisBtn = $(this);
		var thisPt = thisBtn. closest('.ipt_check_agreement');
		var toggleAgreement = thisPt.next('.toggle-agreement-wrap');

		if($(toggleAgreement).css("display") == "none"){
		    $(toggleAgreement).show();
		    $(thisPt).addClass('toggle-agreement-open');
		    
		} else {
			$(thisPt).removeClass('toggle-agreement-open');
		    $(toggleAgreement).hide();
		}	
	})
}
$(document).ready(function(){
    // 필수 함수
    initInputTypeBox();
    // 사용자 함수
    initToggleList();
    
});
