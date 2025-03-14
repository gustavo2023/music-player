const songImg = document.getElementById("song-cover");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".song-artist");
const currentPlayTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".duration");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const prevBtn = document.querySelector(".prev-button");
const playPauseBtn = document.querySelector(".play-pause-button");
const playPauseImg = playPauseBtn.querySelector("img");
const nextBtn = document.querySelector(".next-button");
const audioPlayer = document.getElementById("audio-player");

const songs = [
  {
    title: "Lost in City Lights",
    artist: "Cosmo Sheldrake",
    src: "./resources/lost-in-city-lights-145038.mp3",
    img: "./resources/cover-1.jpg",
  },
  {
    title: "Forest Lullaby",
    artist: "Lesfm",
    src: "./resources/forest-lullaby-110624.mp3",
    img: "./resources/cover-2.jpg",
  },
];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].src);

const playPauseSong = () => {
  if (audio.paused) {
    audio.play();
    playPauseImg.src = "./resources/pause-icon.svg";
    playPauseImg.alt = "Pause";
  } else {
    audio.pause();
    playPauseImg.src = "./resources/Play_fill.svg";
    playPauseImg.alt = "Play";
  }
};

const nextSong = () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
};

const prevSong = () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
};

const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
};

const loadSong = (index) => {
  songName.textContent = songs[index].title;
  artistName.textContent = songs[index].artist;
  songImg.src = songs[index].img;
  audio.src = songs[index].src;
};

const updateProgressBar = () => {
  currentPlayTime.textContent = formatTime(audio.currentTime);
  progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
};

progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const clickRatio = clickX / width;
  audio.currentTime = clickRatio * audio.duration;
});

loadSong(currentSongIndex);

audio.addEventListener("loadedmetadata", () => {
  songDuration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", updateProgressBar);
audio.addEventListener("ended", nextSong);
playPauseBtn.addEventListener("click", playPauseSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
