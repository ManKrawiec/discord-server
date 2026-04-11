const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-scroll]");
  if (!link) {
    return;
  }

  const targetId = link.getAttribute("href");
  if (!targetId || !targetId.startsWith("#")) {
    return;
  }

  const target = document.querySelector(targetId);
  if (!target) {
    return;
  }

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });

  if (siteNav && siteNav.classList.contains("is-open")) {
    siteNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});
