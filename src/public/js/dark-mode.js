document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("modeToggle");
  const rootElement = document.documentElement; // or document.body

  // Check and apply saved mode preference
  if (localStorage.getItem("darkMode") === "enabled") {
    rootElement.classList.add("dark-mode");
  }

  // Toggle dark mode and save preference
  modeToggle.addEventListener("click", () => {
    rootElement.classList.toggle("dark-mode");
    const isDarkMode = rootElement.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
  });
});
