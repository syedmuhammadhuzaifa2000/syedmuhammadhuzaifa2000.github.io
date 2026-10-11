
function toggleSideNav() {
  document.body.classList.toggle("open-side-navbar");
  document.getElementById("sideNav").classList.toggle("open");
}

function openCnicPopup() {
  const popup = document.getElementById("cnicPopup");
  popup.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeCnicPopup() {
  const popup = document.getElementById("cnicPopup");
  popup.style.display = "none";
  document.body.style.overflow = "";
}

function highlightCurrentPage() {
  const currentPath = window.location.pathname.toLowerCase();

  document.querySelectorAll(
    ".top-nav-links a, .side-nav-links a"
  ).forEach(link => {
    const linkPath = new URL(link.href).pathname.toLowerCase();
    const isActive = linkPath === currentPath;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function watchNavbar() {
  const container = document.getElementById("nav-container");
  if (!container) return;

  highlightCurrentPage();

  const observer = new MutationObserver(highlightCurrentPage);
  observer.observe(container, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", watchNavbar);
} else {
  watchNavbar();
}






