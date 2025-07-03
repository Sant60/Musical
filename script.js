// script.js - Spotify Clone (Santosh Version)

console.log("🎧 Spotify Clone Loaded");

// Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

// Songs (1.mp3 to 10.mp3)
let songs = [];
for (let i = 1; i <= 10; i++) {
  songs.push({
    songName: `Song ${i}`,
    filePath: `songs/${i}.mp3`,
    coverPath: `covers/${i}.jpg`,
  });
}

// Render songs
songItems.forEach((el, i) => {
  if (i < songs.length) {
    el.querySelector("img").src = songs[i].coverPath;
    el.querySelector(".songName").innerText = songs[i].songName;
  }
});

// Hamburger toggle for sidebar
const hamburger = document.getElementById("hamburger");
const sideNav = document.getElementById("sidebar");
if (hamburger && sideNav) {
  hamburger.addEventListener("click", () => {
    sideNav.classList.toggle("active");
  });
}

// Main play button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    updatePlayState(true);
  } else {
    audioElement.pause();
    updatePlayState(false);
  }
});

// Update progress bar
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Reset icons
function makeAllPlays() {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((el) => {
    el.classList.remove("fa-pause-circle");
    el.classList.add("fa-play-circle");
  });
}

function updatePlayState(isPlaying) {
  if (isPlaying) {
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
}

// Play song from icon
Array.from(document.getElementsByClassName("songItemPlay")).forEach((el) => {
  el.addEventListener("click", (e) => {
    let index = parseInt(e.target.id);
    if (songIndex === index && !audioElement.paused) {
      audioElement.pause();
      updatePlayState(false);
      makeAllPlays();
    } else {
      makeAllPlays();
      songIndex = index;
      audioElement.src = songs[songIndex].filePath;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      updatePlayState(true);
    }
  });
});

// Play song from card
songItems.forEach((el, i) => {
  if (i < songs.length) {
    el.addEventListener("click", () => {
      makeAllPlays();
      songIndex = i;
      audioElement.src = songs[i].filePath;
      masterSongName.innerText = songs[i].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      updatePlayState(true);
      const icon = el.querySelector(".songItemPlay");
      if (icon) {
        icon.classList.remove("fa-play-circle");
        icon.classList.add("fa-pause-circle");
      }
    });
  }
});

// Next/Previous
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
  });
}

function playSong(index) {
  makeAllPlays();
  audioElement.src = songs[index].filePath;
  masterSongName.innerText = songs[index].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  updatePlayState(true);
  const icon = document.getElementById(index);
  if (icon) {
    icon.classList.remove("fa-play-circle");
    icon.classList.add("fa-pause-circle");
  }
}
