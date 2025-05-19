document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("languageSelect");

  // Load saved language from localStorage, fallback to 'vi'
  const savedLang = localStorage.getItem("lang") || "vi";
  languageSelect.value = savedLang;
  loadLanguage(savedLang);

  languageSelect.addEventListener("change", () => {
    const selectedLang = languageSelect.value;
    localStorage.setItem("lang", selectedLang);
    loadLanguage(selectedLang);
  });
});

function loadLanguage(lang) {
  fetch(`./locales/${lang}.json`)
    .then((res) => {
      if (!res.ok) throw new Error("Language file not found");
      return res.json();
    })
    .then((translations) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const text = translations[key];
        if (text) {
          if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            el.placeholder = text;
          } else if (el.tagName === "OPTION") {
            el.textContent = text;
          } else {
            el.textContent = text;
          }
        }
      });
    })
    .catch((err) => console.error("Language loading error:", err));
}
