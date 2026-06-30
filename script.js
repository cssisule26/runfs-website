const root = document.documentElement;
const links = Array.from(document.querySelectorAll("[data-route]"));
const views = Array.from(document.querySelectorAll("[data-view]"));
const nav = document.querySelector(".site-nav");
const menu = document.querySelector(".menu-button");
const toggle = document.querySelector(".theme-toggle");

function applyTheme(theme) {
  root.dataset.theme = theme;
  toggle.textContent = theme === "dark" ? "Light" : "Dark";
  toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
}

function setRoute(route) {
  const next = views.some((view) => view.dataset.view === route) ? route : "home";
  views.forEach((view) => view.classList.toggle("active", view.dataset.view === next));
  links.forEach((link) => {
    const active = link.dataset.route === next;
    link.classList.toggle("active", active);
    if (link.closest(".site-nav")) {
      link.setAttribute("aria-current", active ? "page" : "false");
    }
  });
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
}

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const route = link.dataset.route;
    history.pushState(null, "", `#${route}`);
    setRoute(route);
  });
});

menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});

toggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "cream" : "dark";
  applyTheme(next);
  localStorage.setItem("runfs-theme", next);
});

applyTheme(localStorage.getItem("runfs-theme") || root.dataset.theme || "dark");
window.addEventListener("popstate", () => setRoute(location.hash.replace("#", "")));
setRoute(location.hash.replace("#", ""));
