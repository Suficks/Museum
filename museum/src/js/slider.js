import $ from 'jquery';
import 'slick-slider';

$('.slider').slick({
  dots: true,
  speed: 800,
  infinite: true,
  appendDots: $('.slider-dots'),
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: $('.prev'),
  nextArrow: $('.next'),
  variableWidth: true,
});

$('.iframe__slider').slick({
  dots: true,
  speed: 500,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.video__slider',
  focusOnSelect: true,
  appendDots: $('.buttons__container'),
  arrows: true,
  prevArrow: $('.video__prev'),
  nextArrow: $('.video__next'),
  variableWidth: true,
});

$('.video__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.iframe__slider',
});
