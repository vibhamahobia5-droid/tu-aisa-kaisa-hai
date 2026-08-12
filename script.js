const song = document.getElementById("song");
const button = document.getElementById("playButton");
const bar = document.getElementById("progressBar");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

button.addEventListener("click", async () => {
  if (song.paused) {
    await song.play();
    button.textContent = "Ⅱ";
  } else {
    song.pause();
    button.textContent = "▶";
  }
});

song.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(song.duration);
});

song.addEventListener("timeupdate", () => {
  current.textContent = formatTime(song.currentTime);
  const percent = song.duration ? (song.currentTime / song.duration) * 100 : 0;
  bar.style.width = `${percent}%`;
});

song.addEventListener("ended", () => {
  button.textContent = "▶";
  bar.style.width = "0%";
  current.textContent = "0:00";
});
