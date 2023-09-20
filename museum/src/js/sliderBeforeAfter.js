const sliderChange = document.querySelector('.slider__change');
const dragLine = document.querySelector('.drag__line');
const image = document.querySelector('.slider__before');

sliderChange.addEventListener('input', () => {
  const sliderValue = sliderChange.value;
  dragLine.style.left = `${sliderValue}%`;
  image.style.width = `${sliderValue}%`;
});
