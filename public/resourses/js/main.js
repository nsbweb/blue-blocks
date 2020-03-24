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
    header = $('header');
    checkMQs();
    checkFeatures();
    if (header.length) {
        initHeader();
    }
    adjustMenuHov();
    adjustFooter();
    initHeader();
});
$(window).resize(function() {
    waitForFinalEvent(function() {
        sizeOrientationChange();
    }, 100, 'main resize');
    adjustFooter();
    initHeader();
    adjustMenuHov();
});
if (!window.addEventListener) {
    window.attachEvent('orientationchange', sizeOrientationChange);
} else {
    window.addEventListener('orientationchange', sizeOrientationChange, false);
}
var initHeader = function() {
    if (Modernizr.mq()) {
        if ($(".inner-banner").length) {
            $(".inner-pg .wrapper").css({
                'padding-top': 0
            });
            $("body.booking-flow").css({
                'padding-top': 0
            });
        }
    } else {
        $(".wrapper").css({
            'padding-top': ($("header").outerHeight())
        });
        $("body.booking-flow").css({
            'padding-top': ($("header").outerHeight())
        });
    }
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
$(".nav_overlay").mouseenter(function(e) {
    $("#nav_menu").stop().slideUp();
    $(".menuTrigger").removeClass("active");
    $nav_overlay.hide();
});

function sizeOrientationChange() {
    checkMQs();
}

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