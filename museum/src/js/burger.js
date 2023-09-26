const burger = document.querySelector('.burger__menu');
const headerNav = document.querySelector('.list');
const welcomeText = document.querySelector('.welcome__info');
const navMobile = document.querySelector('.nav__mobile');
const burgerMenuItems = document.querySelectorAll('.burger__item__link');

const burgerMenuMobileActive = () => {
  if (window.innerWidth <= 768 && headerNav.classList.contains('list__active')) {
    document.body.style.overflow = 'hidden';
    navMobile.classList.add('nav__mobile__active');
  } else {
    document.body.style.overflow = 'visible';
    navMobile.classList.remove('nav__mobile__active');
  }
};

const burgerMenuActive = () => {
  burger.classList.toggle('burger__close');
  headerNav.classList.toggle('list__active');
  welcomeText.classList.toggle('welcome__info__hidden');
  burgerMenuMobileActive();
};

burger.addEventListener('click', burgerMenuActive);
window.addEventListener('resize', burgerMenuMobileActive);
burgerMenuItems.forEach((item) => {
  item.addEventListener('click', burgerMenuActive);
});
