/***************************
****************************

이대목동병원 개방형실험실

****************************
****************************/

var $Gb = {};

(function($){

	'use strict';

	$(function(){
		$Gb.activeFunc().initFunc();
	});

	function $commonFunc(){
		// Web
		$Gb.Body = $('body'),
		$Gb.Foot = $('footer'),
		$Gb.gnbWrap = $('header .gnb-web'),
		$Gb.menu = $Gb.gnbWrap.find('.menu'),
		$Gb.gnbBg = $('header').find('.gnb-bg'),
		$Gb.mainSection = $('.main-section'),
		$Gb.depth2 = $Gb.gnbWrap.find('.depth2'),
		$Gb.Dropdown = $('.dropDown'),
		$Gb.mainCarousel = $('.mainCarousel'),
		$Gb.subCarousel = $('.subCarousel'),
		$Gb.noticeCarousel = $('.noticeCarousel'),
		$Gb.dimmed = $('<div id="dimmed"></div>'),
		$Gb.dimmed2 = $('<div id="dimmed2"></div>'),
		$Gb.dimmed30 = $('<div id="dimmed30"></div>'),
		$Gb.location = location.href.split('/'),
		$Gb.tabMenu = $('.tab-menu'),
		$Gb.tabMenu2 = $('.tab-menu2'),
		$Gb.scrollTop = document.documentElement.scrollTop,
		$Gb.clientHeight = document.documentElement.clientHeight,
		$Gb.scrollHeight = document.documentElement.scrollHeight,

		// Mobile
		$Gb.gnbWrap_m = $('header .gnb-mob'),
		$Gb.menu_m = $Gb.gnbWrap_m.find('.menu'),
		$Gb.dimmedAllmenu = $('<div id="dimmed_Allmenu"></div>');

		var gnbHover = function(){// pc Gnb

			$Gb.menu.find('> li').on({
				'mouseenter' : function(){
					var trgItem = $(this),
						Item_wid = $Gb.menu.find('> li').width(),
						idx = trgItem.index();

					trgItem.addClass('on');
					$Gb.menu.find('> li').not(trgItem).removeClass('on');

					$Gb.Body.append($Gb.dimmed30);
					$('#dimmed30').stop().fadeIn(400);

					$Gb.gnbBg.stop().slideDown(400);
					$Gb.depth2.stop().slideDown(400);
				}
			});

			$Gb.menu.on({
				'mouseleave' : function(){
					$Gb.menu.find('> li').removeClass('on');

					$Gb.depth2.stop().slideUp(300);
					$Gb.gnbBg.stop().slideUp(300);
					
					$('#dimmed30').stop().fadeOut(300, function(){
						$(this).remove();
					});
				}
			});

			$Gb.menu.find('> li > a').on({
				'focusin' : function(){
					var trgItem_ = $(this).closest('li'),
						Item_wid_ = $Gb.menu.find('> li').width(),
						idx_ = trgItem_.index();

					$Gb.menu.find('> li').removeClass('on');
					$(this).closest('li').addClass('on');

					$Gb.Body.append($Gb.dimmed30);
					$('#dimmed30').stop().fadeIn(400);

					$Gb.gnbBg.stop().slideDown(400);
					$Gb.depth2.stop().slideDown(400);
				}
			});

			$Gb.menu.find('> li').last().find('.depth2 li:last-child').on('focusout', function(){
				$Gb.menu.find('> li').removeClass('on');

				$Gb.depth2.stop().slideUp(300);
				$Gb.gnbBg.stop().slideUp(300);

				$('#dimmed30').stop().fadeOut(300, function(){
					$(this).remove();
				});
			});


		},

		allMenu = function(){// mobile 전체 메뉴
			$('.m-menu').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				if(!$(this).hasClass('open')){
					$(this).addClass('open');
					$Gb.gnbWrap_m.stop().animate({
						'right': 0
					},{
						duration:300,
						complete:function(){
							$Gb.dimmedAllmenu
							.insertAfter($Gb.gnbWrap_m)
							.stop().fadeIn(400);
							$Gb.Body.css({
								'height' : $Gb.dimmedAllmenu.height(),
								'overflow' : 'hidden'
							});
						}
					});
				}else {
					$(this).removeClass('open');
					$Gb.gnbWrap_m.stop().animate({
						'right': '-100%'
					},300);
					$Gb.Body.css({
						'height' : 'auto',
						'overflow' : 'visible'
					});
					$Gb.dimmedAllmenu.stop().fadeOut(300, function(){
						$(this).remove();
					});
				}
			});

			$Gb.menu_m.find('.depth2 a').each(function(){
				var _trg = $(this),
					_href = _trg.attr('href').split('/');

				if(_href[_href.length - 1] == $Gb.location[$Gb.location.length - 1]){
					_trg.addClass('on');
				}
			});

			$Gb.menu_m.find('> li > a').each(function(){
				var _trg = $(this),
					_href = _trg.attr('href').split('/');

				if(_href[_href.length - 2] == $Gb.location[$Gb.location.length - 2]){
					_trg.closest('li').addClass('on');

					if(_trg.next('.depth2').find('li').length){
						_trg.next('.depth2').css('display','block');
					}
				}

				_trg.on('click', function(e){
					var currentMenu = _trg.closest('li');

					if(_trg.next('.depth2').find('li').length){
						e.preventDefault();
						e.stopPropagation();
					}
					if(!currentMenu.hasClass('on')){
						currentMenu.addClass('on');
						$Gb.menu_m.find('> li').not(currentMenu).removeClass('on');
						if(currentMenu.find('li').length){
							currentMenu.find('.depth2').stop().slideDown(300);
						}
						$Gb.menu_m.find('> li').not(currentMenu).find('.depth2').stop().slideUp(300);
					}else {
						currentMenu.removeClass('on');
						currentMenu.find('.depth2').stop().slideUp(300);
					}
				});
			});
		},

		OpenlayerPop = function(){
			$('.btn-layerPop-Open').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				var pop_name = $(this).attr('name'),
				currentLayerPop = $('.layerPop#' + pop_name);

				currentLayerPop.stop().fadeIn(300);
				$Gb.Body.append($Gb.dimmed);
			});

			$(document).on('click', '.btn-layerPop-Close, #dimmed', function(e){
				e.preventDefault();
				e.stopPropagation();

				$('.layerPop').stop().fadeOut(300);
				$('#dimmed').remove();
			});
		},

		OpenCalendarPop = function(){ // 예약 레이어 팝업
			$('.Calendar > dl dd > div > a').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				$Gb.isMobile = window.innerWidth <= 768 ? true : false;
				
				var currentCalendarPop = $('#calendar-pop');

				if(!$Gb.isMobile){
					var lpopTop = currentCalendarPop.offset().top,
					hH = $('header .h_top').height();

					$('body, html').stop().animate({
						scrollTop : lpopTop - hH + 'px'
					},500);

				}else {
					currentCalendarPop.addClass('open');
					$Gb.Body.append($Gb.dimmed2);
				}
			});

			$(document).on('click', '.btn-calendarPop-Close, #dimmed2', function(e){
				e.preventDefault();
				e.stopPropagation();

				$('#calendar-pop').removeClass('open');
				$('#dimmed2').remove();
			});
		},

		MainSlider = function(){ //메인 슬라이드
			if($Gb.mainCarousel.length){
				$Gb.mainCarousel.slick({
				  dots: true,
				  dotsClass:'dots-item',
				  infinite: true,
				  speed: 600,
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  autoplay:true,
				  autoplaySpeed:6000,
				  adaptiveHeight:true,
				  arrows:false,
				  centerMode:true,
				  centerPadding: 0
				});
			};

			$Gb.mainCarousel.find('.dots-item li').attr('tabindex',0).first().find('button').addClass('on');

			$Gb.mainCarousel.on({
				'afterChange' : function(event, slick, currentSlide, nextSlide){
				 	var currentSlideIdx = $(this).slick('slickCurrentSlide'),
				 	slickSlide = $(this).find('.dots-item li');

					slickSlide.find('button').removeClass('on');
					slickSlide.eq(currentSlideIdx).find('button').addClass('on');
				}
			});

			slideController();
		},

		slideController = function(){ //슬라이드 일시정지 버튼
			var playController = $('.playController');

			playController.append('<button class="btn-controller pause"><em class="hidden_txt">일시정지</em></button>');

			playController.each(function(){
				var btnController = $(this).find('.btn-controller');
				
				btnController.on('click',function(){
					if($(this).hasClass('pause')){
						$Gb.mainCarousel.slick('slickPause');
						$(this)
						.removeClass('pause')
						.addClass('play')
						.find('em').text('재생하기');
					}else{
						$Gb.mainCarousel.slick('slickPlay');
						$(this)
						.removeClass('play')
						.addClass('pause')
						.find('em').text('일시정지');
					}
				});
			});
		},

		NoticeSlider = function(){
			if($Gb.noticeCarousel.length){
				$Gb.swiper = new Swiper($Gb.noticeCarousel, {
					// Optional parameters
					loop : false,
					speed : 600,
					effect : 'horizontal',
					slidesPerView: 'auto',
					centeredSlides: false,
					debugger: true, // Enable debugger
					setWrapperSize: true,
					scrollbar: {
			        	el: '.swiper-scrollbar',
			        	draggable:true,
			        	hide: false,
			        	dragSize: 'auto',
			        	snapOnRelease: true
				    },
					// Auto play
					autoplay: {
						delay: 2000,
						disableOnInteraction : false,
						pauseOnMouseEnter : true
					},
				});
			}
		},

		SubSlider = function(){ // 소개페이지 슬라이드
			if($Gb.subCarousel.length){
				for(var k = 0; k < $Gb.subCarousel.length; k++){
					$($Gb.subCarousel[k]).slick({
					  dots: true,
					  infinite: true,
					  speed: 500,
					  slidesToShow: 1,
					  slidesToScroll: 1,
					  autoplay:true,
					  autoplaySpeed:4000,
					  adaptiveHeight:true,
					  arrows:true,
					  centerMode:true,
					  centerPadding:0
					});
				}
			}
		},

		copyToClipboard = function(val) {
		  var t = document.createElement("textarea");

		  document.body.appendChild(t);

		  t.value = val;
		  t.select();

		  document.execCommand('copy');
		  document.body.removeChild(t);
		},

		copyUrl = function(){
		  copyToClipboard(location.href);
		  alert('링크가 복사되었습니다.\n '  + location.href);
		},

		goTop = function(){
			$('.btn-top').on('click',function(){
				$('html, body').stop().animate({
					scrollTop : 0
				},400);
			});
		},

		dropDown = function(){
			$Gb.Dropdown.find('> span a').on('click',function(e){
				e.preventDefault();
				e.stopPropagation();

				$Gb.Dropdown.find('> span a').not($(e.target)).removeClass('on');

				$Gb.Dropdown.find('ul')
				.not($(e.target).closest('span').next('ul'))
				.stop(false,true)
				.slideUp(300);

				if($(e.target).hasClass('on')){
					$(e.target)
					.closest('span')
					.next('ul')
					.stop(false,true)
					.slideUp(200, function(){
						$(e.target).removeClass('on');
					});
				}else {
					$(e.target)
					.closest('span')
					.next('ul')
					.stop(false,true)
					.slideDown(200, function(){
						$(e.target).addClass('on');
					});
				}
			});

			$Gb.Dropdown.each(function(){
				var _trg = $(this);

				_trg.find('li').last().find('> a').on('focusout', function(){
					_trg.find('ul').slideUp(200, function(){
						_trg.find('> span a').removeClass('on');
					});
				});

				_trg.on('mouseleave', function(){
					_trg.find('ul').slideUp(200, function(){
						_trg.find('> span a').removeClass('on');
					});
				});
			});
		},

		tabMenu = function(){
			$Gb.tabMenu.find('li a').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				var currentItem = $(this),
				currentId = currentItem.attr('href'),
				currentIdx = $Gb.tabMenu.find('a').index(currentItem);

				currentItem.addClass('on');
				$Gb.tabMenu.find('li a').not(currentItem).removeClass('on');
				$('.tab-contents > li').css('display','none');
				$('.tab-contents > li').filter(currentId).css('display','block');
			});
		},

		tabMenu2 = function(){
			$Gb.tabMenu2.find('li a').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				var currentItem_ = $(this),
				currentId_ = currentItem_.attr('href'),
				currentIdx_ = $Gb.tabMenu2.find('a').index(currentItem_);

				currentItem_.addClass('on');
				$Gb.tabMenu2.find('li a').not(currentItem_).removeClass('on');
				$('.tab-contents2 > li').css({
					'z-index' : '-1',
					'overflow' : 'hidden'
				});
				$('.tab-contents2 > li').filter(currentId_).css({
					'z-index' : 10,
					'overflow' : 'visible'
				});
			});
		},

		initFunc = function(){
			gnbHover();
			allMenu();
			dropDown();
			MainSlider();
			NoticeSlider();
			SubSlider();
			tabMenu();
			tabMenu2();
			OpenlayerPop();
			OpenCalendarPop();
			goTop();
		}

		return {
			initFunc : initFunc,
			slideController : slideController,
			copyUrl : copyUrl,
			goTop : goTop
		}
	}

	$Gb.activeFunc = function() {
		var $activeFunc = new $commonFunc();

		return $activeFunc;
	}

	$(window).on({
		'scroll' : function(){
			$Gb.scrollTop = document.documentElement.scrollTop,
			$Gb.clientHeight = document.documentElement.clientHeight,
			$Gb.scrollHeight = document.documentElement.scrollHeight;

			if($Gb.scrollTop > 0){
				$('header').addClass('fixed');
				$('.top-btn').stop().fadeIn(300);
			}else {
				$('header').removeClass('fixed');
				$('.top-btn').stop().fadeOut(300);
			}

			if(($Gb.scrollTop + $Gb.clientHeight + $Gb.Foot.height()) >= $Gb.scrollHeight){
				$('.top-btn').removeClass('fixed');
			}else {
				$('.top-btn').addClass('fixed');
			}
		},
		'resize' : function(){
			$Gb.isMobile = window.innerWidth <= 768 ? true : false;
		}
	});

})(jQuery);