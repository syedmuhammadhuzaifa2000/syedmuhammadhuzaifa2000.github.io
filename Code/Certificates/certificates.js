document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("certificate-slider");
  const carousel = document.getElementById("certificate-carousel");
  const dotsContainer = document.getElementById("certificate-dots");
  if (!slider || !carousel || !dotsContainer) return;
  const images = Array.from(slider.querySelectorAll("img"));
  if (!images.length) return;
  let currentIndex = 0;
  let timer;
  let hoveringCertificate = false;

  const dots = images.map((image, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "certificate-dot";
    dot.setAttribute("aria-label", `Show certificate ${index + 1}`);
    dot.setAttribute("aria-controls", "certificate-slider");
    dot.addEventListener("click", () => { showImage(index); schedule(); });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    images.forEach((image, i) => {
      const active = i === currentIndex;
      image.classList.toggle("active", active);
      image.setAttribute("aria-hidden", String(!active));
      dots[i].classList.toggle("active", active);
      dots[i].setAttribute("aria-pressed", String(active));
    });
  }

  function schedule() {
    clearTimeout(timer);
    if (hoveringCertificate || images.length < 2) return;
    timer = setTimeout(() => { showImage(currentIndex + 1); schedule(); }, 2500);
  }

  document.getElementById("certificate-prev").addEventListener("click", () => {
    showImage(currentIndex - 1); schedule();
  });
  document.getElementById("certificate-next").addEventListener("click", () => {
    showImage(currentIndex + 1); schedule();
  });
  slider.addEventListener("click", () => { showImage(currentIndex + 1); schedule(); });
  slider.addEventListener("mouseenter", () => { hoveringCertificate = true; schedule(); });
  slider.addEventListener("mouseleave", () => { hoveringCertificate = false; schedule(); });
  // Reset the existing autoplay delay after interaction.
  ["pointermove", "pointerdown", "keydown", "focusin"].forEach(eventName => {
    carousel.addEventListener(eventName, schedule);
  });
  showImage(0);
  schedule();
});
