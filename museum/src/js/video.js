const videos = document.querySelectorAll('.video__item');
const bigPlay = document.querySelector('.big__play');
const play = document.querySelector('.play');
const progressLine = document.querySelector('.progress__line');
const volumeBtn = document.querySelector('.volume');
const volumeBar = document.querySelector('.volume__bar');
const fullscreenBtn = document.querySelector('.fullscreen');
const videoContainer = document.querySelector('.video__items__wrapper');
const sliderBtns = document.querySelector('.slider__buttons');
const videoControls = document.querySelector('.video__controls');
const iframe = document.querySelector('.iframe');

const backgroundNull = 'linear-gradient(to right, rgb(113, 7, 7) 0%, rgb(113, 7, 7) 0%, rgb(196, 196, 196) 0%, rgb(196, 196, 196) 100%)';

const videoPlay = (video) => {
  video.play();
  bigPlay.style.opacity = '0';
  play.setAttribute('src', 'assets/pause.svg');
  videoControls.style.opacity = '0';

  videoControls.addEventListener('mouseenter', () => {
    videoControls.style.opacity = '1';
  });
  videoControls.addEventListener('mouseleave', () => {
    videoControls.style.opacity = '0';
  });
};

const videoPause = (video) => {
  video.pause();
  bigPlay.style.opacity = '1';
  play.setAttribute('src', 'assets/play.svg');
  videoControls.style.opacity = '1';

  videoControls.addEventListener('mouseenter', () => {
    videoControls.style.opacity = '1';
  });
  videoControls.addEventListener('mouseleave', () => {
    videoControls.style.opacity = '1';
  });
};

const toggleVideoStatus = (video) => {
  const parent = video.closest('.slick-slide');
  if (parent.classList.contains('slick-active')) {
    if (video.paused) videoPlay(video);
    else videoPause(video);
  }
};

const videoProgress = (video) => {
  const progress = (Math.floor(video.currentTime) / (Math.floor(video.duration) / 100));
  progressLine.value = progress;
  progressLine.style.background = `linear-gradient(to right, rgb(113, 7, 7) 0%, rgb(113, 7, 7) ${progress}%, rgb(196, 196, 196) ${progress}%, rgb(196, 196, 196) 100%)`;
};

const videoChangeTime = (video, e) => {
  const progress = e.offsetX / (progressLine.offsetWidth / 100);
  video.currentTime = video.duration * (progress / 100);
  progressLine.style.background = `linear-gradient(to right, rgb(113, 7, 7) 0%, rgb(113, 7, 7) ${progress}%, rgb(196, 196, 196) ${progress}%, rgb(196, 196, 196) 100%)`;
};

let savedVolume = 50;

volumeBar.addEventListener('input', () => {
  savedVolume = volumeBar.value;
  volumeBar.style.background = `linear-gradient(to right, rgb(113, 7, 7) 0%, rgb(113, 7, 7) ${savedVolume}%, rgb(196, 196, 196) ${savedVolume}%, rgb(196, 196, 196) 100%)`;
});

const toggleVolume = (video) => {
  if (video.volume === 0) {
    video.volume = savedVolume / 100;
    volumeBar.value = savedVolume;
    volumeBar.style.background = `linear-gradient(to right, rgb(113, 7, 7) 0%, rgb(113, 7, 7) ${savedVolume}%, rgb(196, 196, 196) ${savedVolume}%, rgb(196, 196, 196) 100%)`;
    volumeBtn.setAttribute('src', 'assets/volume.svg');
  } else {
    video.volume = 0;
    volumeBtn.setAttribute('src', 'assets/mute.svg');
    volumeBar.value = 0;
    volumeBar.style.background = backgroundNull;
  }
};

const changeVolume = (video) => {
  const volume = volumeBar.value / 100;
  video.volume = volume;
  if (video.volume === 0) volumeBtn.setAttribute('src', 'assets/mute.svg');
  else volumeBtn.setAttribute('src', 'assets/volume.svg');
};

const toggleFullscreen = (video) => {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen()
      .catch((error) => console.log('Fullscreen request failed:', error));
    video.classList.add('video__item__fullscreen');
    fullscreenBtn.setAttribute('src', 'assets/fullscreen_exit.svg');
  } else if (document.fullscreenEnabled) {
    document.exitFullscreen();
    video.classList.remove('video__item__fullscreen');
    fullscreenBtn.setAttribute('src', 'assets/fullscreen.svg');
  }
};

const videosStop = () => {
  videos.forEach((video) => {
    videoPause(video);
  });
  progressLine.value = 0;
  progressLine.style.background = backgroundNull;
};

videos.forEach((video) => {
  video.addEventListener('click', () => {
    toggleVideoStatus(video);
  });
  video.addEventListener('timeupdate', () => {
    videoProgress(video);
  });
  play.addEventListener('click', () => {
    toggleVideoStatus(video);
  });
  bigPlay.addEventListener('click', () => {
    toggleVideoStatus(video);
  });
  volumeBtn.addEventListener('click', () => {
    toggleVolume(video);
  });
  progressLine.addEventListener('click', (e) => {
    videoChangeTime(video, e);
  });
  volumeBar.addEventListener('change', () => {
    changeVolume(video);
  });
  fullscreenBtn.addEventListener('click', () => {
    toggleFullscreen(video);
  });

  window.addEventListener('message', (e) => {
    if (e.data === 'videoPause') {
      videoPause(video);
    }
  });
});

// iframes.forEach((iframe) => {
document.addEventListener('DOMContentLoaded', () => {
  iframe.addEventListener('click', () => {
    console.log(iframe);
    window.parent.postMessage('videoPause', '*');
  });
});
// });

sliderBtns.addEventListener('click', videosStop);
