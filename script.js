function initMedia() {
  const bgMusic = document.getElementById("background-music");
  const bgVideo = document.getElementById("background");

  if (bgMusic) {
    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => {});
  }

  if (bgVideo) {
    bgVideo.muted = true;
    bgVideo.play().catch(() => {});
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const startScreen = document.getElementById("start-screen");
  const startText = document.getElementById("start-text");
  const profileBio = document.getElementById("profile-bio");
  const visitorCount = document.getElementById("visitor-count");

  function updateCounter() {
    let total = localStorage.getItem("visitor_count");
    total = total ? parseInt(total) + 1 : 921234;
    localStorage.setItem("visitor_count", total);
    visitorCount.textContent = total.toLocaleString();
  }

  updateCounter();

  const message = "Click here to see the motion baby";
  let idx = 0;

  function typeStart() {
    if (idx < message.length) {
      startText.textContent = message.slice(0, ++idx);
      setTimeout(typeStart, 60);
    }
  }

  typeStart();

  const bios = [
    "Fu*k Guns.lol & Fakecrime.bio got banned too often, so I created my own.",
    "\"Hello, World!\""
  ];

  let bIndex = 0;
  let bPos = 0;
  let deleting = false;

  function typeBio() {
    const current = bios[bIndex];

    if (!deleting && bPos < current.length) {
      profileBio.textContent = current.slice(0, ++bPos);
    } else if (deleting && bPos > 0) {
      profileBio.textContent = current.slice(0, --bPos);
    } else if (bPos === current.length) {
      deleting = true;
      return setTimeout(typeBio, 1500);
    } else if (bPos === 0) {
      deleting = false;
      bIndex = (bIndex + 1) % bios.length;
    }

    setTimeout(typeBio, deleting ? 60 : 120);
  }

  startScreen.addEventListener("click", () => {
    startScreen.style.opacity = "0";
    setTimeout(() => startScreen.remove(), 400);
    typeBio();
  });
});
