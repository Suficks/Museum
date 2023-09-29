/* eslint-disable default-case */
// eslint-disable-next-line import/no-extraneous-dependencies
import IMask from 'imask';

// Открытие/закрытие модального окна

const buyBtn = document.querySelector('.buy');
const modal = document.querySelector('.booking__modal');
const closeCross = document.querySelector('.close');
const overlay = document.querySelector('.overlay');

const modalToggle = () => {
  modal.classList.toggle('modal__active');
  overlay.classList.toggle('overlay__active');
};

buyBtn.addEventListener('click', modalToggle);
closeCross.addEventListener('click', modalToggle);
overlay.addEventListener('click', modalToggle);

// Открытие/закрытие модального окна

// Ripple эффект

const bookBtn = document.querySelector('.book__btn');

const createRipple = (e) => {
  e.preventDefault();
  const button = e.currentTarget;
  console.log(e.clientX);
  const ripple = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  ripple.style.width = `${diameter}px`;
  ripple.style.height = `${diameter}px`;
  ripple.style.left = `${e.pageX - (button.getBoundingClientRect().left + window.scrollX) - radius}px`;
  ripple.style.top = `${e.pageY - (button.getBoundingClientRect().top + window.scrollY) - radius}px`;
  ripple.classList.add('ripple');
  bookBtn.appendChild(ripple);

  setTimeout(() => {
    if (ripple) ripple.remove();
  }, 1000);
};

bookBtn.addEventListener('click', createRipple);

// Ripple эффект

// Валидация форм

const bookingModal = document.querySelector('.booking__modal');
const inputs = bookingModal.querySelectorAll('input');

const MINMANELENGTH = 3;
const MAXMANELENGTH = 15;
const MAXPHONELENGTH = 16;
const NAME_REGEXP = /[^a-zа-яё\s]/gi;
const EMAIL_REGEXP = /^[a-zA-Z0-9_-]{3,15}@[a-zA-Z]{4,}\.[a-zA-Z]{2,}$/;

const errorMessage = {
  nameTooShort: 'Минимальное количество символов 3',
  nameTooLong: 'Максимальное количество символов 15',
  invalidSymbols: 'Введите имя, от 3 до 15 символов, используя только буквы и пробел',
  invalidEmail: 'Пожалуйста, введите корректный email-адрес',
  phoneTooLong: 'Максимальное количество цифр 10',
};

const validation = (item) => {
  const error = item.nextElementSibling;
  const inputName = item.getAttribute('data-input');

  // let isCorrect = false;

  switch (inputName) {
    case ('name'): {
      if (item.value === '') {
        item.classList.remove('input__invalid');
        error.innerHTML = '';
      } else if (NAME_REGEXP.test(item.value)) {
        item.classList.add('input__invalid');
        error.innerHTML = errorMessage.invalidSymbols;
      } else if (item.value.length < MINMANELENGTH) {
        item.classList.add('input__invalid');
        error.innerHTML = errorMessage.nameTooShort;
      } else if (item.value.length > MAXMANELENGTH) {
        item.classList.add('input__invalid');
        error.innerHTML = errorMessage.nameTooLong;
      } else {
        item.classList.remove('input__invalid');
        error.innerHTML = '';
        // isCorrect = true;
      }
      break;
    }

    case ('email'): {
      if (item.value === '') {
        item.classList.remove('input__invalid');
        error.innerHTML = '';
      } else if (!EMAIL_REGEXP.test(item.value)) {
        item.classList.add('input__invalid');
        error.innerHTML = errorMessage.invalidEmail;
      } else {
        item.classList.remove('input__invalid');
        error.innerHTML = '';
        // isCorrect = true;
      }
      break;
    }

    case ('tel'): {
      const maskOptions = {
        mask: '+{7}(000)000-00-00',
      };
      const mask = IMask(item, maskOptions);
      mask.updateValue();
      if (item.value.length > MAXPHONELENGTH) {
        item.classList.add('input__invalid');
        error.innerHTML = errorMessage.phoneTooLong;
      } else {
        item.classList.remove('input__invalid');
        error.innerHTML = '';
        // isCorrect = true;
      }
      break;
    }
  }
};

inputs.forEach((item) => {
  item.addEventListener('input', () => {
    validation(item);
  });
});

// Валидация форм
