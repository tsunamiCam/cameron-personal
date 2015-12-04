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


    var width = $window.width();
    var height = $window.height();
    var index = 0;

    //Set the height of the background 
    $( ".landing" ).css( "height",  height); 

    
    /*
    var headerOffsetStart = 0;
    if($('.post-header h1').offset() != null) {
        var headerOffsetStart = $('.post-header h1').offset().top + parseInt($('.post-header h1').css('padding-top').replace("px", ""));
    }
    
  */
    

  function init() {
    onScroll();
    resize();
    placeHeaderTxt(".landing",0.75);
    placeHeaderTxt(".post-header",0.9 );    
    $window.on('scroll', onScroll)
    $window.on('resize', resize)

    //Hard code the relative background size
    $( ".landing" ).css( "height",  $( ".landing" ).height()); 
    $( ".post-header" ).css( "height",  $( ".post-header" ).height()); 

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

  function placeHeaderTxt(parentClass, spacingFactor) {


    var headerHeight = $( parentClass ).height();
    var textHeight = $( parentClass + " h1" ).height();
    var pHeight = $( parentClass + " p" ).height();

    if ($body.hasClass('has-docked-nav')) {
      var availableSpace = spacingFactor * (headerHeight - textHeight -pHeight);
    }
    else {
        var availableSpace = spacingFactor * (headerHeight - textHeight - pHeight);
    }
    //Position the title on the landing page
    $( parentClass + " h1" ).css( "padding-top",  availableSpace); 
    
    $body.removeClass('has-docked-nav')
    navOffsetTop = $nav.offset().top
    onScroll();

      
  }


  function resize() {

  if ($window.width() != width) {
      placeHeaderTxt(".landing", 0.75);
      placeHeaderTxt(".post-header",0.8); 
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

    
    if($('.post-header h1').offset() != null) {
      
      var opac = 0.5;
      if ($window.scrollTop() <= headerOffsetStart) {
          opac =  0.5 * $window.scrollTop()/headerOffsetStart;
      }
      
      $( ".post-header .navbar" ).css({'background': 'linear-gradient(rgba(0,0,0,' + opac + '),rgba(0,0,0,' + opac + '))'}); 
    }
    
  }



  init();

});


$(window).on('beforeload', function() {
    alert("Test")
    //$(window).scrollTop(0);
});




