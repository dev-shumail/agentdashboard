// Theme switcher logic
const themeSelect = document.getElementById("theme-switcher");
// const root = document.documentElement;
const html = document.documentElement;
// Helper to set theme
function setTheme(mode) {
  if (mode === "dark") {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else if (mode === "light") {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    // auto
    localStorage.removeItem("theme");
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }
}
// On load, set theme from localStorage or system
function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    themeSelect.value = saved;
    setTheme(saved);
  } else {
    themeSelect.value = "auto";
    setTheme("auto");
  }
}
// Listen for system changes if auto
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (localStorage.getItem("theme") === null) {
      setTheme("auto");
    }
  });
// Listen for user change
themeSelect.addEventListener("change", (e) => {
  setTheme(e.target.value);
});
// Init
initTheme();
