const burger = document.querySelector('.burger__menu');
const headerNav = document.querySelector('.list');
const welcomeText = document.querySelector('.welcome__info');
const navMobile = document.querySelector('.nav__mobile');
const burgerMenuItems = document.querySelectorAll('.burger__item__link');

// Бургер меню на разрешении < 768px

const burgerMenuMobileActive = () => {
  if (window.innerWidth <= 768 && headerNav.classList.contains('list__active')) {
    document.body.style.overflow = 'hidden';
    navMobile.classList.add('nav__mobile__active');
  } else {
    document.body.style.overflow = 'visible';
    navMobile.classList.remove('nav__mobile__active');
  }
};

// Бургер меню на разрешении < 768px

// Открытие бургер меню

const burgerMenuActive = () => {
  burger.classList.toggle('burger__close');
  headerNav.classList.toggle('list__active');
  welcomeText.classList.toggle('welcome__info__hidden');
  burgerMenuMobileActive();
};

// Открытие бургер меню

// Закрытие меню при клике по любому месту

const closeMenuOnClickOutside = (event) => {
  const { target } = event;

  if (target !== burger) {
    burger.classList.remove('burger__close');
    headerNav.classList.remove('list__active');
    welcomeText.classList.remove('welcome__info__hidden');
    burgerMenuMobileActive();
  }
};

// Закрытие меню при клике по любому месту

// Вызов функций

burger.addEventListener('click', burgerMenuActive);
window.addEventListener('resize', burgerMenuMobileActive);
burgerMenuItems.forEach((item) => {
  item.addEventListener('click', burgerMenuActive);
});
document.addEventListener('click', closeMenuOnClickOutside);

// Вызов функций
