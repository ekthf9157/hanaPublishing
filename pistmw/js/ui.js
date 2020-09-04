$(document).ready(function(){
    // 필수 함수
    initInputTypeBox();
    initMenuAll();

    // 사용자 함수
    initTab();
    initToggleList();
    
});

// 상품 상세화면 스크롤시 헤더 스타일 변경
function ctrlProdHeader() {
	if ($('#wrapper').hasClass('product_detail')) {
		$('#content').scroll(function() {
			var scrollValue = $(this).scrollTop();
		    	
	    	if (scrollValue > 395) {
	    		$('#header').addClass('type_small');
				$('#header').find('button').removeClass('white');
	    	} else {
	    		$('#header').removeClass('type_small');
				$('#header').find('button').addClass('white');
	    	}
		});
	} 
}
//동영상 링크 수급 시 삭제 20200528
function ctrlProdHeader02() {
   if ($('#wrapper').hasClass('product_detail')) {
       $('#content').scroll(function() {
          var scrollValue = $(this).scrollTop();
       
          if (scrollValue > 195) {
              $('#header').addClass('type_small');
             $('#header').find('button').removeClass('white');
           } else {
              $('#header').removeClass('type_small');
             $('#header').find('button').addClass('white');
           }
       });
   }
}

// 전체메뉴
function initMenuAll() {
    $('.list_menu_all').each(function() {
        $(this).find('> li > ul > li > a.link_toggle').on('click', function() {
            $(this).parent('li').toggleClass('active');
        });
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

// 탭 설정
function initTab(tabTopPopup) {
	$('.grp_tab').each(function() {
        var tab = $(this);
        var tabMenu = tab.find('> .tab_menu');
        var tabContent = tab.find('> .tab_content'); 
    	var isProductDetail = $('#wrapper').hasClass('product_detail');   // 상품 상세 화면 여부
        var offsetTop;
        var scrollTarget = tab.hasClass('in_popup') ? $('.popup_content') : $('#content');
        
        // 탭 좌표 지정(1level)
        if ($(this).hasClass('st_01')) {
        	// 상품상세
        	if (isProductDetail)  {
            	offsetTop = 396;
            	/*offsetTop = 196;*/
            } else {
            	// 팝업
            	if ($(this).hasClass('in_popup')) {
            		offsetTop = tabTopPopup;
            	// 서브페이지
            	} else {
            		offsetTop = tab.position().top;
            	}
            }
        }
        if ($(this).hasClass('type_02')) {/* 동영상 없을시 */
        	// 상품상세
        	if (isProductDetail)  {
            	offsetTop = 196;
            } else {
            	// 팝업
            	if ($(this).hasClass('in_popup')) {
            		offsetTop = tabTopPopup;
            	// 서브페이지
            	} else {
            		offsetTop = tab.position().top;
            	}
            }
        }
        
        // 초기 설정
        tabMenu.find('> ul > li').eq(0).addClass('active');
        tabContent.find('> .item').eq(0).addClass('active');

        // 탭메뉴 클릭시 이벤트
        tabMenu.find('> ul > li > a').off('click').on('click', function() {
            var idx = $(this).parent().index();

            tabMenu.find('> ul > li').removeClass('active');
            $(this).parent().addClass('active');
            tabContent.find('> .item').removeClass('active');
            tabContent.find('> .item').eq(idx).addClass('active');

            // 1단계 탭 클릭시 스크롤 이동
            if (tab.hasClass('st_01')) {
            	scrollTarget.animate({
                	scrollTop: offsetTop
                }, 800);

                return false;
            }
        });
        
        // 스크롤시 탭 고정
        if (tab.hasClass('st_01')) {
        	scrollTarget.scroll(function() {
        		var scrollValue = $(this).scrollTop();
        		
        		if (scrollValue > offsetTop) {
        			$('.grp_tab.st_01 > .tab_menu').addClass('fixed');
        		} else {
        			$('.grp_tab.st_01 > .tab_menu').removeClass('fixed');
        		}
        	});
        }
    });
}

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

function initGoTopBtn() {
	//Top 버튼
	$("#btnGoTop").hide();

	$(function () {
		$('#content').scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#btnGoTop').fadeIn();
			} else {
				$('#btnGoTop').fadeOut();
				$('#btnGoTop').removeClass('hover');
			}
		});

		$('#btnGoTop').on("click",function () {
			
			$(this).addClass('hover');
			
			$('#content').animate({
			   scrollTop: 0  //탑 설정 클수록 덜 올라간다
			},400);  // 탑 이동 스크롤 속도를 조절할 수 있다.
			return false;

		});
	});
}

