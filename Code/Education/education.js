/* ========== EDUCATION SLIDER ========== */
let eduIndex = 0;
let eduTimer = null;

const slides = document.querySelectorAll(".education-slide");
const dots = document.querySelectorAll(".edu-dots .dot");
const nextBtn = document.getElementById("nextEdu");
const prevBtn = document.getElementById("prevEdu");

function showEdu(index) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

function nextEdu() {
  eduIndex = (eduIndex + 1) % slides.length;
  showEdu(eduIndex);
}

function prevEdu() {
  eduIndex = (eduIndex - 1 + slides.length) % slides.length;
  showEdu(eduIndex);
}

// 🔁 AUTO SCROLL (5 seconds)
function startEduAutoScroll() {
  stopEduAutoScroll(); // prevent duplicates
  eduTimer = setInterval(nextEdu, 5000);
}

function stopEduAutoScroll() {
  if (eduTimer) clearInterval(eduTimer);
}

// Arrow controls
if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    nextEdu();
    startEduAutoScroll(); // reset timer on manual click
  });

  prevBtn.addEventListener("click", () => {
    prevEdu();
    startEduAutoScroll(); // reset timer on manual click
  });
}

// Start auto scroll after page load
document.addEventListener("DOMContentLoaded", () => {
  if (slides.length > 1) {
    startEduAutoScroll();
  }
});