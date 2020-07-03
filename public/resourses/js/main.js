$(function() {
    mq_red = '(min-width: 1300px)';
    mq_orange = '(min-width: 992px) and (max-width: 1299px)';
    mq_purple = '(max-width: 991px)';
    mq_yellow = '(min-width: 768px) and (max-width: 991px)';
    mq_green = '(max-width: 767px)';
    mq_blue = '(max-width: 479px)';
    mq_brown = '(max-width: 599px)';
    anSp = 500;
    anSpFast = 400; 
    isMobileNav = false;
    mobileNav = '';
    checkMQs();
    adjustMenuHov();
});
$(window).resize(function() {
    waitForFinalEvent(function() {
        sizeOrientationChange();
    }, 100, 'main resize');
    //initHeader();
    adjustMenuHov();
});
if (!window.addEventListener) {
    window.attachEvent('orientationchange', sizeOrientationChange);
} else {
    window.addEventListener('orientationchange', sizeOrientationChange, false);
}

function sizeOrientationChange() {
    checkMQs();
}

var $nav_overlay = $('#nav_overlay');
$(".menuTrigger").bind('touchend , click', function(e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
        $("#nav_menu").stop().slideUp();
        $(this).removeClass("active");
        $nav_overlay.hide();
    } else {
        $(this).addClass("active");
        $("#nav_menu").stop().slideDown();
        $nav_overlay.stop(true, true).fadeTo(200, 0.3);
    }
});

var ChangeView = function() {}

function checkMQs() {
    if (Modernizr.mq('only all')) {
        mq_red_check = Modernizr.mq(mq_red);
        mq_orange_check = Modernizr.mq(mq_orange);
        mq_yellow_check = Modernizr.mq(mq_yellow);
        mq_green_check = Modernizr.mq(mq_green);
        mq_blue_check = Modernizr.mq(mq_blue);
        mq_purple_check = Modernizr.mq(mq_purple);
    } else {
        mq_red_check = false;
        mq_orange_check = true;
        mq_yellow_check = false;
        mq_green_check = false;
        mq_blue_check = false;
        mq_purple_check = false;
    }
}

function checkFeatures() {
    touchEnabled = Modernizr.touch;
    if (touchEnabled) {
        $('html, body').removeClass('no-touch').addClass('touch-mod');
    }
    formPlaceholders = Modernizr.input.placeholder;
    boxShadows = Modernizr.boxshadow;
    isIE7 = $('html').hasClass('ie7');
    isIE8 = $('html').hasClass('ie8');
    if (forms.length) {}
}
var waitForFinalEvent = (function() {
    var timers = {};
    return function(callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

function setLocation(url) {
    window.location.href = url
}
$(".toggleMenu").click(function(e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
        $("body").removeClass('menuOpen');
        $('.mobile-nav').animate({
            'opacity': 1
        }, 1000, function() {
            $(this).hide()
        });
        $("html").removeClass('scroll-hidden');
        $(this).removeClass("active");
    } else {
        $(this).addClass("active");
        $('.mobile-nav').show(0, function() {
            $("body").addClass('menuOpen');
        });
        $("html").addClass('scroll-hidden');
    }
});
$(".totop").hide();
$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.totop').slideDown();
        } else {
            $('.totop').slideUp();
        }
    });
    $('.totop a').click(function(e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });
});
$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('header').addClass('header-sm');
            $('.wrapper').addClass('wrapper-sm');
        } else {
            $('header').removeClass('header-sm');
            $('.wrapper').removeClass('wrapper-sm');
        }
    });
    $('.scroll-down').click(function(e) {
        e.preventDefault();
        $.scrollTo('#scrollTraget', 500, {
            offset: -150
        });
    });
});
jQuery(window).ready(function() {
    theme.init();
});
jQuery(window).load(function() {
    theme.initAnimation();
});
'use strict';
var theme = function() {
    function handlePreventEmptyLinks() {
        $('a[href=#]').click(function(event) {
            event.preventDefault();
        });
    }

    function handleToTopButton() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 10) {
                $('.to-top').css({
                    bottom: '15px'
                });
            } else {
                $('.to-top').css({
                    bottom: '-100px'
                });
            }
        });
        $('.to-top').click(function() {
            $('html, body').animate({
                scrollTop: '0px'
            }, 800);
            return false;
        });
    }
    return {
        onResize: function() {
            resizePage();
        },
        init: function() {
            handleToTopButton();
        },
        initAnimation: function() {
            var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile == false) {
                $('*[data-animation]').addClass('animated');
                $('*[data-animation]').addClass('animated');
                $('.animated').waypoint(function(down) {
                    var elem = $(this);
                    var animation = elem.data('animation');
                    if (!elem.hasClass('visible')) {
                        var animationDelay = elem.data('animation-delay');
                        if (animationDelay) {
                            setTimeout(function() {
                                elem.addClass(animation + ' visible');
                            }, animationDelay);
                        } else {
                            elem.addClass(animation + ' visible');
                        }
                    }
                }, {
                    offset: $.waypoints('viewportHeight') - 60
                });
            }
        }
    }
}();
if (navigator.userAgent.match(/(iPhone|Android|BlackBerry)/)) {} else if (navigator.userAgent.match(/(iPod|iPad)/)) {
    $('a[href^=tel]').click(function(e) {});
} else {
    $('a[href^=tel]').click(function(e) {
        e.preventDefault();
    });
    $('a[href^=tel]').addClass('disable')
}

$(".navigation > ul > li > a").each(function() {
    if ($(this).next().length > 0) {
        $(this).addClass("parent");
    };
})
$("html.touch .navigation > ul > li > a.parent").attr({
    'href': 'javascript:void();'
});
$('#main-menu ul > li:has(".submenu")').addClass('has-submenu');
$('html.touch .navigation > ul > li.has-submenu > a.parent').click(function() {});
var adjustMenuHov = function(e) {
    var $nav_menu = $('#main-menu ul');
    var $nav_menu_items = $nav_menu.find('li.has-submenu');
    var $nav_menu_items_link = $nav_menu.find('li.has-submenu > a');
    var $nav_overlay = $('#nav_overlay');
    $nav_menu_items.find('.dropdown-menu').hide();
    if (Modernizr.mq(mq_green)) {
        $nav_overlay.hide();
    } else {
        $nav_menu_items.bind('touchstart mouseenter ', function() {
            var $this = $(this);
            $this.addClass('slided selected');
            $this.find('.dropdown-menu').css('z-index', '9999').stop(true, true).slideDown(200, function() {
                $nav_menu_items.not($this).find('.dropdown-menu').hide();
                $nav_overlay.stop(true, true).fadeTo(200, 0.4);
                $this.addClass('hovered');
                $('header').addClass('sec-hove');
            });
        }).bind('mouseleave', function() {
            var $this = $(this);
            $this.removeClass('selected').find('.dropdown-menu').css('z-index', '1').slideUp(200, function() {
                $this.removeClass('slided selected');
                $this.removeClass('hovered');
                $nav_overlay.stop(true, true).fadeTo(200, 0, function() {
                    $('header').removeClass('sec-hove');
                    $nav_overlay.hide();
                });
            });
        })
        $('#main-menu ul li.has-submenu .dropdown-menu').css({
            "display": "none"
        });
    }
}
$(".navigation  > ul  > li.has-submenu > a").focus(function() {
    $(this).parents('li').addClass("focused");
}).blur(function() {
    $(this).parents('li').removeClass("focused");
});

$('.single-item-slide').owlCarousel({
    items: 1,
    loop: false,
    margin: 0,
    nav: true,
    mouseDrag: false,
    pullDrag: false,
    drag: false,
    navText: [, ],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    },
    autoHeight:false,
    autoplay: true,
    autoplayTimeout: 8000,
    autoplayHoverPause: true
});



$('.carousel').owlCarousel({
    items: 3,
    loop: false,
    margin: 0,
    nav: true,
    mouseDrag: false,
    pullDrag: false,
    drag: false,
    navText: [, ],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    },
    autoHeight:false,
    autoplay: true,
    autoplayTimeout: 8000,
    autoplayHoverPause: true
});

$(window).load(function(){
    $('.grid').masonry({
        itemSelector: '.grid-item',
    });
})

$('.faqslist dt').click(function() {
    var FaqAns = $(this).next('dd')
    $(this).next(FaqAns).slideToggle('slow');
    $(this).toggleClass('active');
});

$('.accordion-box .tl').click(function() {
    var accordionCont = $(this).next('.accordion')
    $(this).next(accordionCont).slideToggle('slow');
    $(this).toggleClass('active');
});

$('.hrzTabs').each(function(){
    $(this).responsiveTabs({
        startCollapsed: 'accordion'
    });
});

$(".r-tabs-accordion-title").each(function(){
    var thisAnchorHref = $(this).find('a').attr('href');
    $(this).addClass('box-cont r-tabs-tab');
    if(thisAnchorHref === "#tab-1"){
        $(this).addClass('green-light');
    }else if(thisAnchorHref === "#tab-2"){
        $(this).addClass('yellow');
    }else if(thisAnchorHref === "#tab-3"){
        $(this).addClass('blue');
    }else if(thisAnchorHref === "#tab-4"){
        $(this).addClass('pink');
    }else {
    }
});

$('.btn-admission').click(function(){
    if(!$(this).hasClass('active')){
        $(this).addClass('active');
    }else{
        $(this).removeClass('active');
    }
});

$('.navbar-toggler').click(function(){
    if(!$(this).hasClass('active')){
        $(this).addClass('active');
        $('#navbarHeader').slideDown().removeClass('d-none');
    }else{
        $(this).removeClass('active');
        $('#navbarHeader').slideUp();
    }
});

// var i;
// var myDiv = $('.thumn-desc p');
// myDiv.text(myDiv.text().substring(0,100) + '<a href="#">Read more</a>');

$(function(){
    var $elem = $('.thumn-desc p'); // The element or elements with the text to hide

    $elem.each(function(i){
        var $limit = 100; // The number of characters to show
        var $str = $(this).html(); // Getting the text
        var $strtemp = $str.substr(0,$limit);   // Get the visible part of the string
        var $PopUPID = $(this).parent().find('h3').text().replace(/[_\W]+/g, "-").toLowerCase();
        //var i = -1;
        $thumbBox = $(this).parents('.thumn-desc').clone().appendTo(".popSec").addClass('modal fade').attr('id',$PopUPID).attr('tabindex', i-- ).attr('role','dialog').attr('aria-labelledby', $PopUPID +'Label').attr('aria-hidden', true).wrapInner( "<div class='modal-body'></div>").append("<div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button></div>").wrapInner("<div class='modal-content'></div>").wrapInner("<div class='modal-dialog' role='document></div>");
        
        $str = $strtemp+ ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#'+ $PopUPID + '">' + 'Read More' + '</button>' + '<span class="hide">' + $str.substr($limit,$str.length) + '</span>';  // Recompose the string with the span tag wrapped around the hidden part of it
        $(this).html($str); // Write the string to the DOM 
    });

    $elem.parents('body').find('.show').addClass('WeFoundYou').find('button').attr('data-dismiss','modal').click(function(){
        alert('we Found You');
    });
});


// let theButton = document.getElementsByClassName('navbar-toggler');
// let theText = document.getElementById('');

// theButton.onclick = function () { 
//     console.log(error);
//   for(let x of theText) {
//     x.classList.toggle('colorized');
//   }
// };