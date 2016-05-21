$(document).ready(function() {



// Our labels and three data series
var data = {
  labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'],
  series: [
    [5, 4, 3, 7, 5, 10],
    [3, 2, 9, 5, 4, 6],
    [2, 1, -3, -4, -2, 0]
  ]
};



// We are setting a few options for our chart and override the defaults
var options = {
  // Don't draw the line chart points
  showPoint: false,
  // Disable line smoothing
  lineSmooth: false,
  // X-Axis specific configuration
  axisX: {
    // We can disable the grid for this axis
    showGrid: false,
    // and also don't show the label
    showLabel: false
  },
  // Y-Axis specific configuration
  axisY: {
    // Lets offset the chart a bit from the labels
    offset: 60,
    // The label interpolation function enables you to modify the values
    // used for the labels on each axis. Here we are converting the
    // values into million pound.
    labelInterpolationFnc: function(value) {
      return '$' + value + 'm';
    }
  }
};

// All you need to do is pass your configuration as third parameter to the chart function
new Chartist.Line('.ct-chart', data, options);



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

    var widthContainer = $( ".landing2 .container" ).css('width').replace("px", "")

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


    height = $window.height();
    widthContainer = $( ".landing2 .container" ).css('width').replace("px", "")
    
    if(height > widthContainer) {
      $( ".landing2 h1" ).css( "font-size", height*0.05); 
      $( ".navbar#nav-main a" ).css( "font-size", height*0.02); 


    }else{
      $( ".landing2 h1" ).css( "font-size", widthContainer*0.05); 
      $( ".navbar#nav-main a" ).css( "font-size", widthContainer*0.02); 

    }
    



    if ($window.width() != width) {
        placeHeaderTxt(".landing", 0.6);
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








