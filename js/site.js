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

    
    
    var headerOffsetStart = 0;
    var transitionNavbar = 0;

    if($('.post-header h1').offset() != null) {
      var headerOffsetStart = $('.post-header h1').offset().top + parseInt($('.post-header h1').css('padding-top').replace("px", ""));
      transitionNavbar = 1;
    }
    
    if($('.scholarship').offset() != null) {
      var headerOffsetStart = $('.scholarship').offset().top + parseInt($('.scholarship').css('padding-top').replace("px", ""));
      transitionNavbar = 1;

    }
    
    
  
    

  function init() {
    onScroll();
    resize();
    
    //Reduce H1 font size for small devices
    if (width < 550) { 

      $( ".landing h1" ).css( "font-size",  "3em"); 
      placeHeaderTxt(".landing",0.75);
    }
    else {
      placeHeaderTxt(".landing",0.75);
    }

    //Place the header text
    
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
      $( ".navbar" ).css({'background': 'linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0))'}); 
    }

    
    if($body.hasClass('has-docked-nav') && transitionNavbar == 1) {

      /*Grey the background of the Navbar as the user scrolls down the page*/
        var opac = 0.5;
        if ($window.scrollTop() <= headerOffsetStart) {
            opac =  0.5 * $window.scrollTop()/headerOffsetStart;
        } 
          $( ".navbar" ).css({'background': 'linear-gradient(rgba(0,0,0,' + opac + '),rgba(0,0,0,' + opac + '))'}); 
    } 

  }



  function close_accordion_section() {
        $('.accordion .accordion-section-title').removeClass('active');
        $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    
    }
 
    $('.accordion-section-title').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');
 
        if($(e.target).is('.active')) {
            close_accordion_section();
        }else {
            close_accordion_section();
 
            // Add active class to section title
            $(this).addClass('active');
            // Open up the hidden content panel
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
        }
 
        e.preventDefault();
    });



  function toggleNavbarMenu() {


        if ($("nav#nav-mobile ul").hasClass("expanded")) {
            $("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
            $("#nav-trigger span").removeClass("open");
        } else {
            $("nav#nav-mobile ul").addClass("expanded").slideDown(250);
            $("#nav-trigger span").addClass("open");
        }

  }



    /*Initialise the Navigation Bar*/
    $("#nav-mobile").html($("#nav-main").html());

    $("#nav-trigger span").click(function(){
      toggleNavbarMenu();
    });



  init();

});








