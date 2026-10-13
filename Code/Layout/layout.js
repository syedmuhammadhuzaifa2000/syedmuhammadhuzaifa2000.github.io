
function setSideNav(open) {
  const nav = document.getElementById("sideNav");
  if (!nav) return;
  document.body.classList.toggle("open-side-navbar", open);
  nav.classList.toggle("open", open);
  nav.inert = !open;
  nav.setAttribute("aria-hidden", String(!open));
  document.querySelector(".menu-btn")?.setAttribute("aria-expanded", String(open));
  const overlay = document.querySelector(".nav-backdrop");
  if (overlay) overlay.hidden = !open;
  if (open) nav.querySelector(".close-btn")?.focus();
  else document.querySelector(".menu-btn")?.focus();
}

function toggleSideNav() {
  setSideNav(!document.getElementById("sideNav")?.classList.contains("open"));
}

function initializeNavigation() {
  const nav = document.getElementById("sideNav");
  if (!nav || nav.dataset.ready) return;
  nav.dataset.ready = "true";
  const overlay = document.createElement("button");
  overlay.type = "button";
  overlay.className = "nav-backdrop";
  overlay.setAttribute("aria-label", "Close navigation");
  overlay.tabIndex = -1;
  overlay.hidden = true;
  overlay.addEventListener("click", () => setSideNav(false));
  document.body.append(overlay);
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setSideNav(false)));
  document.addEventListener("keydown", event => {
    if (!nav.classList.contains("open")) return;
    if (event.key === "Escape") { event.preventDefault(); setSideNav(false); }
    if (event.key === "Tab") {
      const items = [...nav.querySelectorAll("button, a[href]")];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
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

  const updateNavigation = () => { highlightCurrentPage(); initializeNavigation(); };
  updateNavigation();

  const observer = new MutationObserver(updateNavigation);
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






