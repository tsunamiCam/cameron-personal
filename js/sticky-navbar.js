/* Implemetation of the sticky navigation bar functionality */

$(document).ready(function() {

  var  mn = $(".navbar"),
      mns = "has-docked-nav",
      navOffsetTop = $('nav').offset().top;

    if( navOffsetTop<= $(this).scrollTop() && !$('body').hasClass('has-docked-nav')) {
      $('body').addClass(mns);

    } 
      if(navOffsetTop  > $(this).scrollTop() && $('body').hasClass('has-docked-nav')) {
       $('body').removeClass(mns);
    }

  $(window).scroll(function() {

   
    if( navOffsetTop<= $(this).scrollTop() && !$('body').hasClass('has-docked-nav')) {
      $('body').addClass(mns);

    } 
      if(navOffsetTop  > $(this).scrollTop() && $('body').hasClass('has-docked-nav')) {
       $('body').removeClass(mns);
    }
  });

});