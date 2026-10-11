document.querySelectorAll(".project-item").forEach(card => {
  card.addEventListener("click", () => {

    // Prevent double loading
    if (card.querySelector("video")) return;

    const videoSrc = card.dataset.video;

    card.innerHTML = `
      <video class="project-video" controls autoplay>
        <source src="${videoSrc}" type="video/mp4">
      </video>
    `;
  });
});

document.querySelectorAll(".project-item").forEach(card => {
  const videoSrc = card.dataset.video;
  const video = card.querySelector("video");
  const closeBtn = card.querySelector(".close-video");

  // OPEN VIDEO
  card.addEventListener("click", e => {
    // prevent reopening when clicking close
    if (e.target.classList.contains("close-video")) return;

    // close other open cards
    document.querySelectorAll(".project-item.active").forEach(open => {
      if (open !== card) {
        open.classList.remove("active");
        const v = open.querySelector("video");
        v.pause();
        v.src = "";
      }
    });

    // open this card
    card.classList.add("active");
    video.src = videoSrc;
    video.play();
  });

  // CLOSE VIDEO
  closeBtn.addEventListener("click", e => {
    e.stopPropagation();
    card.classList.remove("active");
    video.pause();
    video.src = "";
  });
});

