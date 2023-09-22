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
  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
});

$('.video__slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.iframe__slider',
});

const number = document.querySelector('.first');
const sliderBtns = [...document.querySelectorAll('[role="presentation"]')];
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slider = document.querySelector('.slider');

const sliderCountChange = () => {
  const activeBtn = document.querySelector('li.slick-active');
  const index = sliderBtns.indexOf(activeBtn);
  number.innerHTML = `0${index + 1}`;
};

sliderBtns.forEach((item) => {
  item.addEventListener('click', sliderCountChange);
});
prevBtn.addEventListener('click', sliderCountChange);
nextBtn.addEventListener('click', sliderCountChange);
slider.addEventListener('mousemove', sliderCountChange);
