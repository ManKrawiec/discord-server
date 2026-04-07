const descriptions = {
  "📋 zasady": "Podstawowy kanał z zasadami serwera. Tutaj można umieścić regulamin, najważniejsze informacje porządkowe i zasady wejścia do społeczności.",
  "👋 powitalnia": "Kanał startowy dla nowych osób. To dobre miejsce na krótkie przywitanie i pierwsze informacje o serwerze.",
  "📢 ogłoszenia": "Sekcja na ważne komunikaty administracji, zmiany organizacyjne i aktualizacje dotyczące społeczności.",
  "🎤 streamek": "Kanał przeznaczony na informacje o streamach, zapowiedzi transmisji i szybkie zbieranie widzów.",
  "📜 spis-ról": "Przegląd dostępnych ról serwera wraz z krótkim opisem ich zastosowania i uprawnień.",
  "💸 podwyżka": "Miejsce na system awansów, wyróżnień albo serwerowych rang zależnych od aktywności.",
  "🎫 tickets": "Kanał organizacyjny do zgłoszeń, pytań technicznych i kontaktu z administracją.",
  "😴🤔 ogólny": "Główny kanał tekstowy do codziennych rozmów. Neutralne miejsce na aktywność całej społeczności.",
  "💡 pomysły": "Sekcja na propozycje zmian, nowych funkcji i ulepszeń serwera.",
  "🏠 rrl": "Kanał luźniejszy, bardziej prywatny i swobodny, przeznaczony na rozmowy poza głównym nurtem.",
  "🌐 tylko-dla-moderacji": "Wewnętrzny kanał organizacyjny dla zespołu moderacyjnego i administracji.",
  "👑 zasady-moderacji": "Przestrzeń na wewnętrzne standardy pracy moderacji, procedury i ustalenia zespołu.",
  "😄 szukanko-ludzi": "Kanał do zbierania ekip do gier, wspólnych rozmów i szybkiego szukania aktywnych osób.",
  "🔧 naprawy": "Sekcja do zgłaszania błędów, problemów organizacyjnych i propozycji poprawek.",
  "🎬 clipy": "Kanał na krótkie nagrania, śmieszne akcje i najlepsze momenty z gier lub rozmów.",
  "😂 memy": "Miejsce na memy i lżejszy content rozrywkowy dla społeczności.",
  "🎵 music": "Kanał do rozmów o muzyce, playlistach i wrzucania ulubionych utworów.",
  "📚 chwalanie-co-majo": "Sekcja na pochwalenie się sprzętem, kolekcją, zakupami albo innymi rzeczami, które ktoś chce pokazać.",
  "🧠 edity": "Kanał twórczy na montaże, grafiki, próbki projektów i inne edity.",
  "🎲 gry-i-sklep": "Miejsce na serwerowe zabawy, ekonomię i systemy związane z grami lub sklepem.",
  "🕹 komendo-tekstowy": "Kanał pod komendy tekstowe i interakcje z botami, żeby nie zaśmiecać innych sekcji.",
  "🎮 oceny-setup": "Sekcja do oceniania stanowisk, komputerów, peryferiów i całych setupów.",
  "🔢 odliczanie": "Kanał zabawowy oparty na kolejności wpisów i prostych zasadach liczenia.",
  "✏️ ostatnia-litera": "Luźna gra tekstowa, w której kolejna osoba odpowiada na bazie ostatniej litery poprzedniego słowa.",
  "🎉 igrzyska-żartu": "Kanał czysto rozrywkowy nastawiony na żarty, wewnętrzne formaty i zabawę społeczności.",
  "🔊 Ogólne": "Główny kanał głosowy do codziennych rozmów i wspólnego siedzenia na voice.",
  "🔊 duo": "Kanał głosowy przygotowany pod rozmowy w mniejszych, dwuosobowych grupach.",
  "🔊 trio": "Kanał głosowy dla trzech osób lub niewielkich ekip.",
  "🔊 quatro": "Kanał głosowy dla czteroosobowych grup i szybkiego podziału na drużyny.",
  "🔊 Unlimited": "Kanał bez sztywnego limitu, dobry na większe spotkania i otwarte rozmowy.",
  "🔊 Nieobecność": "Kanał do oznaczenia AFK lub chwilowego zejścia z aktywnej rozmowy.",
  "🔊 Streamek": "Voice pod streamowanie ekranu, oglądanie i wspólne komentowanie.",
  "❌ ban-room": "Kanał administracyjny do omawiania banów, powodów decyzji i logiki działań porządkowych.",
  "📩 requesty-na-bany": "Sekcja na zgłoszenia użytkowników oraz wnioski o działania moderatorskie.",
  "📜 zasady|Event": "Kanał z zasadami eventowymi. Opisuje przebieg wydarzenia, role i podstawowe ograniczenia dla uczestników.",
  "📅 zdarzenia-eventu": "W zakładce eventowej nie ma listy nadchodzących wydarzeń. Na serwerze odbył się jeden event z War Thundera i to tutaj można trzymać jego podsumowanie oraz zapis ustaleń.",
  "🤝 wspólne": "Kanał wspólny dla wszystkich uczestników eventu, przeznaczony na ustalenia i kontakt między stronami.",
  "🛡 drużyna-1": "Tekstowy kanał taktyczny dla pierwszej drużyny biorącej udział w wydarzeniu.",
  "🛡 drużyna-2": "Tekstowy kanał taktyczny dla drugiej drużyny biorącej udział w wydarzeniu.",
  "🏢 biuro-dowódcze-nr1": "Prywatny kanał organizacyjny dla dowództwa pierwszej strony eventu.",
  "🏢 biuro-dowódcze-nr2": "Prywatny kanał organizacyjny dla dowództwa drugiej strony eventu.",
  "🔊 Drużyna 1": "Kanał głosowy dla pierwszej drużyny podczas eventu.",
  "🔊 Drużyna 2": "Kanał głosowy dla drugiej drużyny podczas eventu.",
  "🔊 Organizacyjny": "Kanał głosowy dla organizatorów i ustaleń technicznych podczas wydarzenia."
};

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("channelSidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const joinButton = document.querySelector(".join-btn");
  const channelTitle = document.getElementById("channelTitle");
  const channelHeading = document.getElementById("channelHeading");
  const channelDescription = document.getElementById("channelDescription");
  const categoryLabel = document.getElementById("categoryLabel");
  const summaryCategory = document.getElementById("summaryCategory");
  const summaryChannel = document.getElementById("summaryChannel");
  const channelContent = document.getElementById("channelContent");
  const sidebarScroll = document.querySelector(".channel-sidebar__scroll");

  if (
    !sidebar
    || !sidebarToggle
    || !channelTitle
    || !channelHeading
    || !channelDescription
    || !categoryLabel
    || !summaryCategory
    || !summaryChannel
    || !channelContent
    || !sidebarScroll
  ) {
    return;
  }

  function getDescription(channelName, categoryName) {
    return descriptions[`${channelName}|${categoryName}`]
      || descriptions[channelName]
      || `To jest placeholder dla kanału ${channelName}. W tym miejscu możesz później dodać dokładny opis, zasady lub przeznaczenie tej sekcji.`;
  }

  function updateChannel(button) {
    const channelName = button.dataset.channel;
    const categoryName = button.dataset.category;
    const description = getDescription(channelName, categoryName);
    const channelItems = document.querySelectorAll(".channel-item");

    channelItems.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      if (isActive) {
        item.setAttribute("aria-current", "page");
      } else {
        item.removeAttribute("aria-current");
      }
    });

    channelTitle.textContent = channelName;
    channelHeading.textContent = channelName;
    channelDescription.textContent = description;
    categoryLabel.textContent = categoryName;
    summaryCategory.textContent = categoryName;
    summaryChannel.textContent = channelName;

    channelContent.classList.remove("is-transitioning");
    void channelContent.offsetWidth;
    channelContent.classList.add("is-transitioning");

    if (window.innerWidth <= 860) {
      sidebar.classList.remove("is-open");
      sidebarToggle.setAttribute("aria-expanded", "false");
    }
  }

  sidebarScroll.addEventListener("click", (event) => {
    const button = event.target.closest(".channel-item");
    if (!button) {
      return;
    }
    updateChannel(button);
  });

  sidebarScroll.addEventListener("wheel", (event) => {
    event.preventDefault();

    const multiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : 1;
    sidebarScroll.scrollTop += event.deltaY * multiplier;
  }, { passive: false });

  if (joinButton) {
    joinButton.addEventListener("pointermove", (event) => {
      const bounds = joinButton.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      joinButton.style.setProperty("--mouse-x", `${x}px`);
      joinButton.style.setProperty("--mouse-y", `${y}px`);
    });
  }

  sidebarToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    sidebarToggle.setAttribute("aria-expanded", String(isOpen));
  });
});
