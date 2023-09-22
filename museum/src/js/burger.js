const burger = document.querySelector('.burger__menu');
const headerNav = document.querySelector('.list');
const welcomeText = document.querySelector('.welcome__info');

const burgerMenuActive = () => {
  burger.classList.toggle('burger__close');
  headerNav.classList.toggle('list__active');
  welcomeText.classList.toggle('welcome__info__hidden');
};

burger.addEventListener('click', burgerMenuActive);
