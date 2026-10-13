// Only cards with a data-video attribute can open a video.
document.querySelectorAll(".project-item[data-video]").forEach(card => {
  const video = card.querySelector("video");
  const closeBtn = card.querySelector(".close-video");
  if (!video || !closeBtn) return;

  function closeVideo() {
    video.pause();
    video.removeAttribute("src");
    video.load();
    card.classList.remove("active");
  }

  card.addEventListener("click", event => {
    // Native video controls and an already-open player must not restart playback.
    if (event.target.closest(".project-video") || card.classList.contains("active")) return;
    card.classList.add("active");
    video.src = card.dataset.video;
    video.play().catch(() => {
      // Leave the native controls available if the browser blocks autoplay.
    });
  });

  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "Close project video");
  closeBtn.addEventListener("click", event => {
    event.stopPropagation();
    closeVideo();
  });
});
