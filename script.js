const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const discordWidget = document.querySelector("[data-discord-widget]")?.closest(".discord-widget");
const discordCount = document.querySelector("[data-discord-count]");
const discordMeta = document.querySelector("[data-discord-meta]");
const discordWidgetUrl = "https://discordapp.com/api/guilds/1330499227406565471/widget.json";
const discordRefreshIntervalMs = 60_000;

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

function setDiscordWidgetState(state) {
  if (!discordWidget) {
    return;
  }

  discordWidget.classList.toggle("is-loading", state === "loading");
  discordWidget.classList.toggle("is-error", state === "error");
}

function formatUpdatedTime() {
  return new Date().toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

async function updateDiscordPresence() {
  if (!discordCount || !discordMeta) {
    return;
  }

  setDiscordWidgetState("loading");
  discordMeta.textContent = "Pobieranie aktualnej liczby osób online...";

  try {
    // Pobiera publiczne dane widgetu serwera Discord.
    const response = await fetch(discordWidgetUrl, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // Odczytuje liczbę użytkowników online z pola presence_count.
    const data = await response.json();
    const onlineCount = data?.presence_count;

    if (typeof onlineCount !== "number") {
      throw new Error("Brak pola presence_count w odpowiedzi API.");
    }

    discordCount.textContent = `${onlineCount} osób online`;
    discordMeta.textContent = `Ostatnia aktualizacja: ${formatUpdatedTime()}`;
    setDiscordWidgetState("ready");
  } catch (error) {
    // Pokazuje czytelny komunikat, jeśli API lub połączenie zawiedzie.
    discordCount.textContent = "Nie udało się pobrać danych";
    discordMeta.textContent = "Sprawdź połączenie lub spróbuj ponownie za chwilę.";
    setDiscordWidgetState("error");
    console.error("Discord widget error:", error);
  }
}

if (discordWidget && discordCount && discordMeta) {
  updateDiscordPresence();
  // Automatycznie odświeża licznik co 60 sekund.
  window.setInterval(updateDiscordPresence, discordRefreshIntervalMs);
}
