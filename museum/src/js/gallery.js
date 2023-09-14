const imgContainer = document.querySelector('.img__container');

const sources = [
  'assets/galery1',
  'assets/galery2',
  'assets/galery3',
  'assets/galery4',
  'assets/galery5',
  'assets/galery6',
  'assets/galery7',
  'assets/galery8',
  'assets/galery9',
  'assets/galery10',
  'assets/galery11',
  'assets/galery12',
  'assets/galery13',
  'assets/galery14',
  'assets/galery15',
];

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const randomPic = () => {
  const arrShuffled = shuffle(sources);
  arrShuffled.forEach((item) => {
    imgContainer.insertAdjacentHTML('beforeend', `<img class="gallery__img" src="${item}.jpg" alt="gallery__img">`);
  });
};

randomPic();

const onEntry = (entry, observer) => {
  entry.forEach((change) => {
    document.addEventListener('scroll', () => {
      if (window.scrollY === 0) {
        observer.observe(change.target);
      }
    });

    if (change.isIntersecting) {
      change.target.classList.add('gallery__img__show');
      observer.unobserve(change.target);
    } else change.target.classList.remove('gallery__img__show');
  });
};

const options = { threshold: [0.1] };

const observer = new IntersectionObserver(onEntry, options);

const galeryImgs = document.querySelectorAll('.gallery__img');

galeryImgs.forEach((img) => {
  observer.observe(img);
});
