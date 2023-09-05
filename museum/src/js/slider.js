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
