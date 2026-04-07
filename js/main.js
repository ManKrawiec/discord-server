const navItems = document.querySelectorAll(".nav-item");
const panels = document.querySelectorAll("[data-panel]");
const panelTitle = document.getElementById("panelTitle");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const discordLogin = document.getElementById("discordLogin");
const oauthStatus = document.getElementById("oauthStatus");

function showPanel(targetId) {
  navItems.forEach((item) => {
    const isActive = item.dataset.target === targetId;
    item.classList.toggle("is-active", isActive);
    if (isActive) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });

  panels.forEach((panel) => {
    const isActive = panel.id === targetId;
    panel.hidden = !isActive;
    panel.classList.toggle("panel-card--active", isActive);
  });

  const activeItem = document.querySelector(`.nav-item[data-target="${targetId}"]`);
  if (activeItem && panelTitle) {
    panelTitle.textContent = activeItem.textContent.trim();
  }

  if (window.innerWidth <= 980 && sidebar && sidebarToggle) {
    sidebar.classList.remove("is-open");
    sidebarToggle.setAttribute("aria-expanded", "false");
  }
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    showPanel(item.dataset.target);
  });
});

if (sidebar && sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    sidebarToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (discordLogin && oauthStatus) {
  discordLogin.addEventListener("click", () => {
    oauthStatus.textContent =
      "Tutaj podłącz redirect OAuth2 Discorda. Po udanym logowaniu możesz pobrać role użytkownika i wyrenderować je w tym miejscu.";
  });
}
