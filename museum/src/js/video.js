const videos = document.querySelectorAll('.video__item');
const bigPlay = document.querySelector('.big__play');
const play = document.querySelector('.play');
const progressLine = document.querySelector('.progress__line');
const volumeBtn = document.querySelector('.volume');
const volumeBar = document.querySelector('.volume__bar');
const fullscreenBtn = document.querySelector('.fullscreen');
const videoContainer = document.querySelector('.video__items__wrapper');
const sliderBtns = document.querySelectorAll('.slider__buttons');
const videoControls = document.querySelector('.video__controls');
const speedFactor = document.querySelector('.speed');
const speedIcon = document.querySelector('.speed__icon');

const backgroundNull = 'linear-gradient(to right, rgb(113, 7, 7) 0%, rgb(113, 7, 7) 0%, rgb(196, 196, 196) 0%, rgb(196, 196, 196) 100%)';

let isPlay = false;

const timer = () => {
  setTimeout(() => { videoControls.style.opacity = '0'; }, 3000);
};

const videoPlay = (video) => {
  video.play();
  isPlay = true;
  bigPlay.style.opacity = '0';
  play.style.backgroundImage = 'url(assets/pause.svg)';

  videoContainer.addEventListener('mouseenter', () => {
    videoControls.style.opacity = '1';
  });
  videoContainer.addEventListener('mouseleave', timer);
};

const videoPause = (video) => {
  video.pause();
  bigPlay.style.opacity = '1';
  play.style.backgroundImage = 'url(assets/play.svg)';
  videoControls.style.opacity = '1';

  videoContainer.removeEventListener('mouseleave', timer);
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

const mouseMoveHandler = (e) => {
  videos.forEach((video) => {
    videoChangeTime(video, e);
  });
};

const mouseUpHandler = () => {
  progressLine.removeEventListener('mousemove', mouseMoveHandler);
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
    volumeBtn.style.backgroundImage = 'url(assets/volume.svg)';
  } else {
    video.volume = 0;
    volumeBtn.style.backgroundImage = 'url(assets/mute.svg)';
    volumeBar.value = 0;
    volumeBar.style.background = backgroundNull;
  }
};

const changeVolume = (video) => {
  const volume = volumeBar.value / 100;
  video.volume = volume;
  if (video.volume === 0) volumeBtn.style.backgroundImage = 'url(assets/mute.svg)';
  else volumeBtn.style.backgroundImage = 'url(assets/volume.svg)';
};

const toggleFullscreen = (video) => {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen()
      .catch((error) => console.log('Fullscreen request failed:', error));
    video.classList.add('video__item__fullscreen');
    progressLine.classList.add('progress__line__fullscreen');
    volumeBar.classList.add('volume__bar__fullscreen');
    fullscreenBtn.style.backgroundImage = 'url(assets/fullscreen_exit.svg)';
  } else if (document.fullscreenEnabled) {
    document.exitFullscreen();
    video.classList.remove('video__item__fullscreen');
    progressLine.classList.remove('progress__line__fullscreen');
    volumeBar.classList.remove('volume__bar__fullscreen');
    fullscreenBtn.style.backgroundImage = 'url(assets/fullscreen.svg)';
  }
};

const videosStop = (video) => {
  videoPause(video);
  video.currentTime = 0;
  progressLine.value = 0;
  progressLine.style.background = backgroundNull;
};

const keyboardVideoControl = (video, e) => {
  if (e.keyCode === 32) toggleVideoStatus(video);
  if (e.keyCode === 77) toggleVolume(video);
  if (e.keyCode === 70) toggleFullscreen(video);
  if (e.shiftKey && e.code === 'Comma') {
    video.playbackRate -= 0.25;
    speedFactor.classList.add('speed__show');
    speedIcon.classList.add('speed__icon__back__show');
    speedFactor.innerHTML = `${video.playbackRate}x`;
    setTimeout(() => {
      speedFactor.classList.remove('speed__show');
      speedIcon.classList.remove('speed__icon__back__show');
    }, 500);
  }
  if (e.shiftKey && e.code === 'Period') {
    video.playbackRate += 0.25;
    speedFactor.classList.add('speed__show');
    speedIcon.classList.add('speed__icon__show');
    speedFactor.innerHTML = `${video.playbackRate}x`;
    setTimeout(() => {
      speedIcon.classList.remove('speed__icon__show');
      speedFactor.classList.remove('speed__show');
    }, 500);
  }
};

videos.forEach((video) => {
  video.addEventListener('click', () => {
    toggleVideoStatus(video);
  });
  video.addEventListener('timeupdate', () => {
    videoProgress(video);
  });
  video.addEventListener('ended', videosStop);
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
  volumeBar.addEventListener('mousemove', () => {
    changeVolume(video);
  });
  fullscreenBtn.addEventListener('click', () => {
    toggleFullscreen(video);
  });
  document.addEventListener('keydown', (e) => {
    if (isPlay) {
      e.preventDefault();
      keyboardVideoControl(video, e);
    }
  });
  sliderBtns.forEach((item) => {
    item.addEventListener('click', () => {
      videosStop(video);
    });
  });
});

progressLine.addEventListener('mousedown', () => {
  progressLine.addEventListener('mousemove', mouseMoveHandler);
});
document.addEventListener('mouseup', mouseUpHandler);
