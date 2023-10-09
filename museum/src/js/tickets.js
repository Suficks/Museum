/* eslint-disable no-use-before-define */
/* eslint-disable default-case */
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
const NAME_REGEXP = /[^a-zа-яё\s]/gi;
const EMAIL_REGEXP = /^[a-zA-Z0-9_-]{3,15}@[a-zA-Z]{4,}\.[a-zA-Z]{2,5}$/;

const errorMessage = {
  nameTooShort: 'Минимальное количество символов 3',
  nameTooLong: 'Максимальное количество символов 15',
  invalidSymbols: 'Введите имя, от 3 до 15 символов, используя только буквы и пробел',
  invalidEmail: 'Пожалуйста, введите корректный email-адрес',
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
        mask: '+{7} (000) 000-00-00',
      };
      const mask = IMask(item, maskOptions);
      mask.updateValue();
      if (!item.value === '') {
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

// Добавление выбранной информации в билет

const addInfoToTicket = (infoContainer, info = '') => {
  if (!infoContainer.querySelector('span')) {
    infoContainer.insertAdjacentHTML('beforeend', info);
  } else {
    infoContainer.removeChild(infoContainer.querySelector('span'));
    infoContainer.insertAdjacentHTML('beforeend', info);
  }
};

// Добавление выбранной информации в билет

// Выбор даты

const dateInput = document.querySelector('.date');
const chosenDateShow = document.querySelector('.overview__date');

const setDateLimit = () => {
  const now = new Date().toLocaleDateString();
  const today = now.split('.').reverse().join('-');
  dateInput.setAttribute('min', today);
};

setDateLimit();

const dateChoice = () => {
  const chosenDate = dateInput.value;
  const date = new Date(chosenDate.replaceAll('-', '.'));
  const weekDay = date.toLocaleString('en-US', { weekday: 'long' });
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();
  const span = `<span>${weekDay}, ${month} ${day}</span>`;
  addInfoToTicket(chosenDateShow, span);
};

dateInput.addEventListener('input', dateChoice);

// Выбор даты

// Выбор времени

const timeInput = document.querySelector('.time');
const chosenTimeShow = document.querySelector('.overview__time');
const startTime = '09:00';
const endTime = '18:00';
const step = '30';

const timeChoice = () => {
  const error = timeInput.nextElementSibling;
  const selectedTime = timeInput.value;
  const hours = selectedTime.slice(0, 2);
  const minutes = selectedTime.slice(3, 5);

  if (selectedTime < startTime || selectedTime > endTime) {
    error.innerHTML = `Время между ${startTime} и ${endTime}`;
  } else if (minutes !== step && minutes !== '00') {
    error.innerHTML = `Выберите промежуток в ${step} минут`;
  } else {
    error.innerHTML = '';
    const span = `<span>${hours} : ${minutes}</span>`;
    addInfoToTicket(chosenTimeShow, span);
  }
};

timeInput.addEventListener('input', timeChoice);

// Выбор времени

// Кастомный Select

const arrowIconSelect = document.querySelector('.arrow__icon__select');
const selectContainer = document.querySelector('.select__container');
const select = document.querySelector('.select');
let selectOptions = [...document.querySelectorAll('.select__item')];

selectContainer.addEventListener('click', () => {
  arrowIconSelect.classList.toggle('rotate');
  selectContainer.classList.toggle('select__show');
});

const selectValueChange = (value) => {
  selectOptions = [...document.querySelectorAll('.select__item')];
  selectOptions[0].remove();
  const itemCopy = `<li class="select__item">${value}</li>`;
  select.insertAdjacentHTML('afterbegin', itemCopy);
};

selectOptions.forEach((item) => {
  item.addEventListener('click', () => {
    if (item.textContent !== 'Ticket Type') {
      selectValueChange(item.textContent);
    }
    showTicketType();
  });
});

// Кастомный Select

// Выбор билета

const radios = document.getElementsByName('type');
const chosenTicketType = document.querySelector('.overview__type');
let span = '';

const showTicketType = () => {
  const selected = Array.from(radios).find((radio) => radio.checked);
  const ticketType = selected?.parentNode.querySelector('.type__name').textContent;
  selectOptions = [...document.querySelectorAll('.select__item')];
  const selectValue = selectOptions[0].textContent;

  if (modal.classList.contains('modal__active') && selectValue !== 'Ticket Type') {
    span = `<span>${selectValue}</span>`;
  } else if (ticketType) {
    selectValueChange(ticketType);
    span = `<span>${ticketType}</span>`;
  } else span = `<span>${selectValue}</span>`;

  addInfoToTicket(chosenTicketType, span);
};

radios.forEach((item) => {
  item.addEventListener('click', showTicketType);
});

// Выбор билета

// Стоимость билетов

const basicTicketsInput = document.querySelector('.counter__item');
const seniorTicketsInput = document.querySelector('.second');

const basicTicketsInputModal = document.querySelector('.basic__count');
const seniorTicketsInputModal = document.querySelector('.senior__count');

const totalPriceContainer = document.querySelector('.final__cost');
const totalPriceContainerModal = document.querySelector('.total__cost');

const amountWrap = document.querySelector('.amount__wrap');
const buttons = [...amountWrap.querySelectorAll('button')];

const ticketForm = document.querySelector('.ticket__form');
const buttonsInModal = [...ticketForm.querySelectorAll('button')];

const basicTicketsAmountModal = document.querySelector('.basic__amount');
const seniorTicketsAmountModal = document.querySelector('.senior__amount');

const basicCost = document.querySelector('.basic__cost');
const seniorCost = document.querySelector('.senior__cost');

const basicTicketType = document.querySelector('.basic__type');
const seniorTicketType = document.querySelector('.senior__type');

const basicEntryTicketType = document.querySelector('.basic__ticket');
const seniorEntryTicketType = document.querySelector('.senior__ticket');

let basicPrice;
let seniorPrice;

// Тип выставки

const priceAccordingExhibition = (ticketType) => {
  switch (ticketType) {
    case '':
      basicPrice = 0;
      seniorPrice = 0;
      basicTicketType.innerHTML = `Basic (${basicPrice} €)`;
      seniorTicketType.innerHTML = `Senior (${seniorPrice} €)`;
      basicEntryTicketType.innerHTML = `Basic 18+ (${basicPrice} €)`;
      seniorEntryTicketType.innerHTML = `Senior 65+ (${seniorPrice} €)`;
      break;
    case 'Permanent exhibition':
      basicPrice = 20;
      seniorPrice = basicPrice / 2;
      basicTicketType.innerHTML = `Basic (${basicPrice} €)`;
      seniorTicketType.innerHTML = `Senior (${seniorPrice} €)`;
      basicEntryTicketType.innerHTML = `Basic 18+ (${basicPrice} €)`;
      seniorEntryTicketType.innerHTML = `Senior 65+ (${seniorPrice} €)`;
      break;
    case 'Temporary exhibition':
      basicPrice = 25;
      seniorPrice = 12;
      basicTicketType.innerHTML = `Basic (${basicPrice} €)`;
      seniorTicketType.innerHTML = `Senior (${seniorPrice} €)`;
      basicEntryTicketType.innerHTML = `Basic 18+ (${basicPrice} €)`;
      seniorEntryTicketType.innerHTML = `Senior 65+ (${seniorPrice} €)`;
      break;
    case 'Combined Admission':
      basicPrice = 40;
      seniorPrice = basicPrice / 2;
      basicTicketType.innerHTML = `Basic (${basicPrice} €)`;
      seniorTicketType.innerHTML = `Senior (${seniorPrice} €)`;
      basicEntryTicketType.innerHTML = `Basic 18+ (${basicPrice} €)`;
      seniorEntryTicketType.innerHTML = `Senior 65+ (${seniorPrice} €)`;
      break;
  }
};

// Тип выставки

// Добавление билетов в local storage

const ticket = {
  basic: 0,
  senior: 0,
  ticketType: '',
  totalPrice: 0,
};

function setLocalStorageData(data, key) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorageData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function addTicketsToLocalstorage(basic, senior, ticketType, total) {
  const localStorageData = getLocalStorageData('ticket');
  if (localStorageData === null) setLocalStorageData(ticket, 'ticket');
  else {
    ticket.basic = basic;
    ticket.senior = senior;
    ticket.ticketType = ticketType;
    ticket.totalPrice = total;
    setLocalStorageData(ticket, 'ticket');
  }
}

// Добавление билетов в local storage

// Отображение данных

let totalPrice;

const dataDisplay = (basicAmount, seniorAmount, ticketType = '') => {
  priceAccordingExhibition(ticketType);
  const basicTicketsPrice = basicAmount * basicPrice || 0;
  const seniorTicketsPrice = seniorAmount * seniorPrice || 0;
  totalPrice = basicTicketsPrice + seniorTicketsPrice;

  selectValueChange(ticketType || 'Ticket Type');
  const active = Array.from(radios).find((radio) => radio.parentNode.querySelector('.type__name').textContent === ticketType);
  if (active) active.checked = true;
  span = `<span>${ticketType}</span>`;
  addInfoToTicket(chosenTicketType, span);
  basicTicketsAmountModal.innerHTML = basicAmount || 0;
  seniorTicketsAmountModal.innerHTML = seniorAmount || 0;
  basicCost.innerHTML = `${basicTicketsPrice} €`;
  seniorCost.innerHTML = `${seniorTicketsPrice} €`;
  totalPriceContainerModal.innerHTML = `${totalPrice} €`;
  totalPriceContainer.innerHTML = totalPrice || 0;
  basicTicketsInputModal.value = basicAmount || 0;
  seniorTicketsInputModal.value = seniorAmount || 0;
  basicTicketsInput.value = basicAmount || 0;
  seniorTicketsInput.value = seniorAmount || 0;
};

// Отображение данных

// Стоимость билетов в модальном окне

function ticketsTotalPriceShowInModal() {
  selectOptions = [...document.querySelectorAll('.select__item')];
  const selectValue = selectOptions[0].textContent;
  const basicTicketsAmount = basicTicketsInputModal.value;
  const seniorTicketsAmount = seniorTicketsInputModal.value;
  dataDisplay(basicTicketsAmount, seniorTicketsAmount, selectValue);
  addTicketsToLocalstorage(basicTicketsAmount, seniorTicketsAmount, selectValue, totalPrice);
}

selectContainer.addEventListener('click', ticketsTotalPriceShowInModal);
basicEntryTicketType.addEventListener('input', ticketsTotalPriceShowInModal);
seniorEntryTicketType.addEventListener('input', ticketsTotalPriceShowInModal);
buttonsInModal.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    ticketsTotalPriceShowInModal();
  });
});

// Стоимость билетов в модальном окне

// Стоимость билетов из секции tickets

const ticketsTotalPriceShow = () => {
  const basicTicketsAmount = basicTicketsInput.value;
  const seniorTicketsAmount = seniorTicketsInput.value;
  const selected = Array.from(radios).find((radio) => radio.checked);
  const ticketType = selected?.parentNode.querySelector('.type__name').textContent;

  dataDisplay(basicTicketsAmount, seniorTicketsAmount, ticketType);
  addTicketsToLocalstorage(basicTicketsAmount, seniorTicketsAmount, ticketType, totalPrice);
};

basicTicketsInput.addEventListener('input', ticketsTotalPriceShow);
seniorTicketsInput.addEventListener('input', ticketsTotalPriceShow);
radios.forEach((item) => {
  item.addEventListener('click', ticketsTotalPriceShow);
});
buttons.forEach((item) => {
  item.addEventListener('click', ticketsTotalPriceShow);
});

// Стоимость билетов из секции tickets

// Отображение данных из Local Storage при перезагрузке

const dataFromLocalStorageDisplay = () => {
  const localStorageData = getLocalStorageData('ticket');
  dataDisplay(localStorageData?.basic, localStorageData?.senior, localStorageData?.ticketType);
};

dataFromLocalStorageDisplay();

// Отображение данных из Local Storage при перезагрузке
