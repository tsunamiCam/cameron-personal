/* Implemetation of the sticky navigation bar functionality */

$(document).ready(function() {


var headerHeight = $( ".landing" ).height();

$( ".landing h1" ).css( "padding-top",  headerHeight*0.60); // Setting an individual property.
 


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