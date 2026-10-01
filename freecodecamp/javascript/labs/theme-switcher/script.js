const themes = [
  {
    name: "light",
    message: "Light theme is on!"
  }, 
  {
    name: "dark",
    message: "Dark theme is on!"
  }
];

console.log(themes);

const themeSwitcherButton = document.querySelector("#theme-switcher-button");

const themeDropdown = document.querySelector("#theme-dropdown");

const status = document.querySelector("#status");

const body = document.body;


themeSwitcherButton.addEventListener("click", () => {
  const isHidden = themeDropdown.hidden;
  themeDropdown.hidden = !isHidden;
  themeSwitcherButton.setAttribute("aria-expanded", String(isHidden))
});

const themeMenuItems = document.querySelectorAll('[role="menuitem"]');

themeMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectedTheme = item.textContent.trim();
    console.log(selectedTheme);

    const selectedThemeData = themes.find((theme) => {
      return theme.name === selectedTheme;
    });
    console.log(selectedThemeData);

    body.className = `theme-${selectedThemeData.name}`;

    status.textContent = selectedThemeData.message;
  });
})
