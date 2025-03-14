const songImg = document.getElementById("song-cover");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".song-artist");
const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration");
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

const loadSong = (index) => {
  songName.textContent = songs[index].title;
  artistName.textContent = songs[index].artist;
  songImg.src = songs[index].img;
  audio.src = songs[index].src;
};

const updateProgressBar = () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100;
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
};

progressBar.addEventListener("input", function () {
  audio.currentTime = (this.value / 100) * audio.duration;
});

loadSong(currentSongIndex);

playPauseBtn.addEventListener("click", playPauseSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
