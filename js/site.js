$(document).ready(function() {

  // Variables
  var $codeSnippets = $('.code-example-body'),
      $nav = $('.navbar'),
      $body = $('body'),
      $window = $(window),
      $popoverLink = $('[data-popover]'),
      navOffsetTop = $nav.offset().top,
      $document = $(document),
      entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
      }

    var width = $window.width()

  function init() {
    onScroll();
    resize();
    placeHeaderTxt();
    $window.on('scroll', onScroll)
    $window.on('resize', resize)
  }

  function smoothScroll(e) {
    e.preventDefault();
    $(document).off("scroll");
    var target = this.hash,
        menu = target;
    $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top-40
    }, 0, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
    });
  }

  function placeHeaderTxt() {

    var headerHeight = $( ".landing" ).height();
    var textHeight = $( ".landing h1" ).height();
    
    var navbarHeight = 0;

    if (!$body.hasClass('has-docked-nav')) {
        navbarHeight = $( ".navbar" ).height();
    }

    var availableSpace = 0.85 * (headerHeight - textHeight- navbarHeight);
    //Position the title on the landing page
    $( ".landing h1" ).css( "padding-top",  availableSpace); 
      
  }


  function resize() {

    $body.removeClass('has-docked-nav')
    navOffsetTop = $nav.offset().top
    onScroll()

    if ($window.width() != width) {
      placeHeaderTxt();
      width = $window.width()
    }
  }

  function onScroll() {

    if(navOffsetTop <= $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
      $body.addClass('has-docked-nav')
    }
    if(navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
      $body.removeClass('has-docked-nav')
    }
  }



  init();

});