const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const discordWidget = document.querySelector("[data-discord-widget]")?.closest(".discord-widget");
const discordOnlineCount = document.querySelector("[data-discord-count]");
const discordMemberCount = document.querySelector("[data-discord-members]");
const discordMeta = document.querySelector("[data-discord-meta]");
const discordWidgetUrl = "https://discordapp.com/api/guilds/1330499227406565471/widget.json";
const discordInviteUrl = "https://discord.com/api/v9/invites/8MzyPqCg6n?with_counts=true";
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
  if (!discordOnlineCount || !discordMemberCount || !discordMeta) {
    return;
  }

  setDiscordWidgetState("loading");
  discordMeta.textContent = "Pobieranie aktualnej liczby osób online i wszystkich członków...";

  try {
    // Pobiera publiczne dane widgetu i publiczne statystyki zaproszenia Discord.
    const [widgetResponse, inviteResponse] = await Promise.all([
      fetch(discordWidgetUrl, {
        cache: "no-store"
      }),
      fetch(discordInviteUrl, {
        cache: "no-store"
      })
    ]);

    if (!widgetResponse.ok) {
      throw new Error(`Widget HTTP ${widgetResponse.status}`);
    }

    if (!inviteResponse.ok) {
      throw new Error(`Invite HTTP ${inviteResponse.status}`);
    }

    // Odczytuje liczbę użytkowników online z widgetu i wszystkich członków z endpointu invite.
    const [widgetData, inviteData] = await Promise.all([
      widgetResponse.json(),
      inviteResponse.json()
    ]);
    const onlineCount = widgetData?.presence_count;
    const memberCount = inviteData?.approximate_member_count;

    if (typeof onlineCount !== "number") {
      throw new Error("Brak pola presence_count w odpowiedzi API.");
    }

    if (typeof memberCount !== "number") {
      throw new Error("Brak pola approximate_member_count w odpowiedzi API.");
    }

    discordOnlineCount.textContent = `${onlineCount}`;
    discordMemberCount.textContent = `${memberCount}`;
    discordMeta.textContent = `Ostatnia aktualizacja: ${formatUpdatedTime()}`;
    setDiscordWidgetState("ready");
  } catch (error) {
    // Pokazuje czytelny komunikat, jeśli API lub połączenie zawiedzie.
    discordOnlineCount.textContent = "Błąd";
    discordMemberCount.textContent = "Błąd";
    discordMeta.textContent = "Sprawdź połączenie lub spróbuj ponownie za chwilę.";
    setDiscordWidgetState("error");
    console.error("Discord widget error:", error);
  }
}

if (discordWidget && discordOnlineCount && discordMemberCount && discordMeta) {
  updateDiscordPresence();
  // Automatycznie odświeża licznik co 60 sekund.
  window.setInterval(updateDiscordPresence, discordRefreshIntervalMs);
}
