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
    var height = $window.height()
    

    var headerOffsetStart = 0;
    if($('.page-content h1').offset() != null) {
        var headerOffsetStart = $('.page-content h1').offset().top + parseInt($('.page-content h1').css('padding-top').replace("px", ""));
    }
  
    

  function init() {
    onScroll();
    resize();
    placeHeaderTxt();
    $window.on('scroll', onScroll)
    $window.on('resize', resize)

    //Hard code the relative background size
    $( ".landing" ).css( "height",  $( ".landing" ).height()); 




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


    if ($body.hasClass('has-docked-nav')) {
      var availableSpace = 0.78 * (headerHeight - textHeight);
    }
    else {
        var availableSpace = 0.75 * (headerHeight - textHeight);
    }
    //Position the title on the landing page
    $( ".landing h1" ).css( "padding-top",  availableSpace); 
    
    $body.removeClass('has-docked-nav')
    navOffsetTop = $nav.offset().top
    onScroll();

      
  }


  function resize() {

  if ($window.width() != width) {
      placeHeaderTxt();
      width = $window.width()
    }
  else {
   $body.removeClass('has-docked-nav')
    navOffsetTop = $nav.offset().top
    onScroll()
  }
   
  }

  function onScroll() {


    if(navOffsetTop <= $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
      $body.addClass('has-docked-nav')
    }
    if(navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
      $body.removeClass('has-docked-nav')
    }

    
    if($('.page-content h1').offset() != null) {
      
      if ($window.scrollTop() <= headerOffsetStart) {
          opac =  0.5 * $window.scrollTop()/headerOffsetStart;
      }
      
      $( ".page-content .navbar" ).css({'background': 'linear-gradient(rgba(0,0,0,' + opac + '),rgba(0,0,0,' + opac + '))'}); 
    }
    
  }



  init();

});


$(window).on('beforeload', function() {
    alert("Test")
    //$(window).scrollTop(0);
});

