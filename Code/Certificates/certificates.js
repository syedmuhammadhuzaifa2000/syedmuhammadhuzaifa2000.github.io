document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("certificate-slider");
  if (!slider) return;
  const images = slider.querySelectorAll("img");
  let currentIndex = 0;
  let interval;
  let isPaused = false;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.remove("active");
      if (i === index) img.classList.add("active");
    });
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function startSlider() {
    interval = setInterval(() => {
      if (!isPaused) nextImage();
    }, 3000);
  }

  slider.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  slider.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  images.forEach((img) => {
    img.addEventListener("click", () => {
      nextImage();
    });
  });

  showImage(currentIndex);
  startSlider();
});