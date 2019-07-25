//banner
$(document).ready(function () {
	$('.slider').slick({
			dots: true,
			infinite: true,
			speed: 500,
			//fade: true,
			// cssEase: 'linear',
			autoplay: true,
			arrows: true,
			autoplaySpeed: 9000,
	});
	$('.slider').mouseover(function () {
			$('.slider').slick('slickPlay')
	});

	//customers
	$('.customers').slick({
			dots: false,
			infinite: true,
			speed: 500,
			//cssEase: 'linear',
			slidesToShow: 6,
			adaptiveHeight: true,
			autoplay: true,
			arrows: false,
			autoplaySpeed: 1000,
	});

	//testimonial

	$('.testimonial').slick({
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			adaptiveHeight: true,
			autoplay: true,
			arrows: false,
			autoplaySpeed: 4000,
	});

	$('.testimonial').mouseover(function () {
			$('.testimonial').slick('slickPlay')
	});



	// Countries
	var country_arr = new Array("Select Country", "AUSTRALIA", "INDIA", "NEW ZEALAND", "USA", "UAE", "MAURITIUS");

	$.each(country_arr, function (i, item) {
			$('#country').append($('<option>', {
					value: i,
					text: item,
			}, '</option>'));
	});

	// States
	var s_a = new Array();
	s_a[0] = "Select State";
	s_a[1] = "Select State|QUEENSLAND|VICTORIA";
	s_a[2] = "Select State|ANDHRAPRADESH|KARNATAKA|TAMILNADU|DELHI|GOA|W-BENGAL|GUJARAT|MADHYAPRADESH|MAHARASHTRA|RAJASTHAN";
	s_a[3] = "Select State|AUCKLAND";
	s_a[4] = "Select State|NEWJERSEY|ILLINOIS";
	s_a[5] = "Select State|DUBAI";
	s_a[6] = "Select State|MAURITIUS";

	// Cities
	var c_a = new Array();
	c_a['QUEENSLAND'] = "BRISBANE";
	c_a['VICTORIA'] = "MELBOURNE";
	c_a['ANDHRAPRADESH'] = "HYDERABAD";
	c_a['KARNATAKA'] = "BANGLORE";
	c_a['TAMILNADU'] = "CHENNAI";
	c_a['DELHI'] = "DELHI";
	c_a['GOA'] = "GOA";
	c_a['W-BENGAL'] = "KOLKATA";
	c_a['GUJARAT'] = "AHMEDABAD1|AHMEDABAD2|AHMEDABAD3|BARODA|BHAVNAGAR|MEHSANA|RAJKOT|SURAT|UNA";
	c_a['MADHYAPRADESH'] = "INDORE";
	c_a['MAHARASHTRA'] = "MUMBAI|PUNE";
	c_a['RAJASTHAN'] = "ABU";
	c_a['AUCKLAND'] = "AUCKLAND";
	c_a['NEWJERSEY'] = "EDISON";
	c_a['ILLINOIS'] = "CHICAGO";
	c_a['MAURITIUS'] = "MAURITIUS";
	c_a['DUBAI'] = "DUBAI";


	$('#country').change(function () {
			var c = $(this).val();
			var state_arr = s_a[c].split("|");
			$('#state').empty();
			$('#city').empty();
			if (c == 0) {
					$('#state').append($('<option>', {
							value: '0',
							text: 'Select State',
					}, '</option>'));
			} else {
					$.each(state_arr, function (i, item_state) {
							$('#state').append($('<option>', {
									value: item_state,
									text: item_state,
							}, '</option>'));
					});
			}
			$('#city').append($('<option>', {
					value: '0',
					text: 'Select City',
			}, '</option>'));
	});

	$('#state').change(function () {
			var s = $(this).val();
			if (s == 'Select State') {
					$('#city').empty();
					$('#city').append($('<option>', {
							value: '0',
							text: 'Select City',
					}, '</option>'));
			}
			var city_arr = c_a[s].split("|");
			$('#city').empty();

			$.each(city_arr, function (j, item_city) {
					$('#city').append($('<option>', {
							value: item_city,
							text: item_city,
					}, '</option>'));
			});


	});


	// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 0;
	// var navbarHeight = 350;
	var navbarHeight = $('.header').outerHeight();


	$(window).bind('scroll', function () {
		didScroll = true;
		if ($(window).scrollTop() > navbarHeight) {
			$('body').addClass('fixed');
		} else {
			$('body').removeClass('fixed');
		}
	});

	$(window).scroll(function (event) {
		didScroll = true;
	});

	setInterval(function () {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 120);

	function hasScrolled() {
		var st = $(this).scrollTop();

		// Make sure they scroll more than delta
		if (Math.abs(lastScrollTop - st) <= delta)
			return;

		// If they scrolled down and are past the navbar, add class .nav-up.
		// This is necessary so you never see what is "behind" the navbar.
		if (st > lastScrollTop && st > navbarHeight) {
			// Scroll Down
			$('.header').removeClass('nav-down').addClass('nav-up');
		} else {
			// Scroll Up
			if (st + $(window).height() < $(document).height()) {
				$('.header').removeClass('nav-up').addClass('nav-down');
			}
		}

		lastScrollTop = st;
	}



	// Clickable Vertical Tabs

	$(".clickable-tabs .item").click(function () {
			var aherf = $(this).attr("rel");
			var targetEl = $(this).parents('.clickable-tabs').siblings('.clickable-tab-content-wrapper').find('.clickable-tab-content');
			targetEl.removeClass("active");
			targetEl.each(function () {
					if ($(this).attr('id') === aherf) {
							$(this).toggleClass("active");
					}
			});
			$(this).parents(".clickable-tabs").find('.item').removeClass('active');
			$(this).addClass('active');

	});


	// Hoverable Vertical Tabs

	$(".hoverable-tabs .item").hover(function () {
			var aherf = $(this).attr("rel");
			var targetEl = $(this).parents('.hoverable-tabs').siblings('.hoverable-content-wrapper').find('.hoverable-tab-content');
			targetEl.removeClass("active");
			targetEl.each(function () {
					if ($(this).attr('id') === aherf) {
							$(this).toggleClass("active");
					}
			});
			$(this).parents(".hoverable-tabs").find('.item').removeClass('active');
			$(this).addClass('active');
	});


	$('.products-wrap .layout-wrap .layout-style-trigger').click(function () {
			$(this).toggleClass('change');
			$(this).parents('.layout-wrap').siblings().toggleClass('list-style');
	});






	// Sticky Tabs

	// get the sticky element with the id of `sticky-header`.
	var stickyHeader = document.getElementById('sticky-tabs');
	if (stickyHeader != null) {
			var stickyHeaderRef = document.getElementById('market-header');

			// then record the current position, so when we cross the
			// boundary the `sticky` class can be toggled
			var boundary = stickyHeaderRef.offsetHeight - 100;

			// when the page scrolls, do as little as possible, in this
			// case we're just registering a rAF callback to `checkSticky`
			window.onscroll = function (event) {
					requestAnimationFrame(checkSticky);
			};

			function checkSticky() {
					// collect current scroll position, with a arbitrary amount
					// of inertia.
					var y = window.scrollY + 2;

					// check if the element contains the `sticky` class already
					var isSticky = document.getElementById('listing-wrap').classList.contains('sticky');
					if (y > boundary) {
							// if we're in the "sticky" boundary, and it's not already
							// sticky, then apply the class, otherwise do nothing.
							if (!isSticky) {
									document.getElementById('listing-wrap').classList.add('sticky');
							}
					} else if (isSticky) {
							// otherwise, we're inside the region *and* the sticky
							// class needs to be removed.
							document.getElementById('listing-wrap').classList.remove('sticky');
					}
			}
	}



	// Cache selectors
	var lastId,
			topMenu = $("#sticky-tabs"),
			topMenuHeight = topMenu.outerHeight() + 110,
			// All list items
			menuItems = topMenu.find("a"),
			// Anchors corresponding to menu items
			scrollItems = menuItems.map(function () {
					var item = $($(this).attr("href"));
					if (item.length) {
							return item;
					}
			});



	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function (e) {
			var href = $(this).attr("href"),
					offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
			$('html, body').stop().animate({
					scrollTop: offsetTop
			}, 300);
			e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function () {
			// Get container scroll position
			var fromTop = $(this).scrollTop() + topMenuHeight;

			// Get id of current scroll item
			var cur = scrollItems.map(function () {
					if ($(this).offset().top < fromTop)
							return this;
			});
			// Get the id of the current element
			cur = cur[cur.length - 1];
			var id = cur && cur.length ? cur[0].id : "";

			if (lastId !== id) {
					lastId = id;
					// Set/remove active class
					menuItems
							.parent().removeClass("active")
							.end().filter("[href='#" + id + "']").parent().addClass("active");
			}
	});






	//scroll navbar
	// var prevScrollpos = window.pageYOffset;
	// window.onscroll = function () {
	//   var currentScrollPos = window.pageYOffset;
	//   if (prevScrollpos > currentScrollPos) {
	//     document.getElementById("navbar").style.top = "0";
	//   } else {
	//     document.getElementById("navbar").style.top = "-100px";
	//     $(".dropdown-menu").hide();
	//   }
	//   prevScrollpos = currentScrollPos;
	// }







	/* accordian*/
	$(window).on('resize', function () {
			check();
	});
	$(document).ready(function () {
			$('.tabs-list a').click(function () {
					var tabv = $(this).attr('data-tab');
					$('.tabs-list a').removeClass('active');
					$('.tb-content', 'acoordin').removeClass('active');
					$('.tb-content').css('display', 'none');
					$('.acoordin').css('display', 'none');
					$(this).addClass('active');
					$('.tb-content' + tabv).addClass('active').css('display', 'block');
					$('.acoordin' + tabv).addClass('active').css('display', 'block');
			});
			check();
	});

	function check() {
			var wi_th = $(window).width();
			if (wi_th <= 767) {
					$('.desktop').css('display', 'none');
					$('.mobile').css('display', 'block');
			} else {
					$('.desktop').css('display', 'block');
					$('.mobile').css('display', 'none')
			}
	}




	/* signin signup*/

	$(document).ready(function () {
			$(".block1 a.click").click(function () {
					//$('body').toggleClass('hidden-body');
					var div_move = $(this).attr('data-log');
					var div_id = '#' + div_move;
					$('.com-box').removeClass('m-active');
					//console.log(div_id)
					if (div_id == '#login') {
							if ($(div_id).hasClass('m-active')) {
									$(div_id).removeClass('m-active')
							} else {
									$(div_id).addClass('m-active')
							}
							// console.log('login');
					}
					if (div_id == '#sign') {
							if ($(div_id).hasClass('m-active')) {
									$(div_id).removeClass('m-active')
							} else {
									$(div_id).addClass('m-active')
							}
							//console.log('sign');
					}
			});
	});
});