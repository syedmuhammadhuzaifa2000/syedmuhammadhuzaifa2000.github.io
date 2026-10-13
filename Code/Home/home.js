/*-----------HOME JS--------------------------*/

function initTypewriter() {
  const text =
  "Hi, I’m an OT & Automation Engineer focused on industrial networks, control systems, and system integration.";
  const element = document.getElementById("typewriter");

  if (!element) return;
  if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) {
    element.textContent = text;
    return;
  }

  let index = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!isDeleting) {
      element.textContent = text.slice(0, index++);
      if (index > text.length) {
        setTimeout(() => (isDeleting = true), 2000);
      }
    } else {
      element.textContent = text.slice(0, index--);
      if (index === 0) {
        isDeleting = false;
      }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 60);
  }

  typeEffect();
}