document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const dropdownButton = document.getElementById("dropdownButton");

  const initializeCalendar = (calendarElement) => {
    return new FullCalendar.Calendar(calendarElement, {
      initialView: "timeGridWeek",
      views: {
        dayGridMonth: {
          titleFormat: { year: "numeric", month: "long" },
        },
        timeGridWeek: {
          titleFormat: { year: "numeric", month: "long" },
        },
      },
      customButtons: {
        dropdownButton: {
          text: "View Options",
          click: toggleDropdown,
        },
        toggleThemeButton: {
          click: toggleTheme,
        },
      },
      headerToolbar: {
        left: "prevYear,prev,next,nextYear",
        center: "title",
        right: "today dropdownButton toggleThemeButton",
      },
      buttonIcons: {
        prev: "chevron-left",
        next: "chevron-right",
        prevYear: "chevrons-left",
        nextYear: "chevrons-right",
        toggleThemeButton: "moon",
      },
      buttonText: {
        today: "Today",
        month: "Monthly",
        week: "Week",
        day: "Day",
        list: "List",
      },
    });
  };

  const toggleThemeButton = document.querySelector(
    ".fc-toggleThemeButton-button"
  );

  if (toggleThemeButton) {
    toggleThemeButton.innerHTML = '<i class="fas fa-moon"></i>';
  }

  const toggleTheme = () => {
    const rootElement = document.documentElement; // or document.body
    const isDarkMode = rootElement.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    const toggleThemeButton = document.querySelector(
      ".fc-toggleThemeButton-button"
    );

    // Update the button icon
    toggleThemeButton.innerHTML = isDarkMode
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  };

  const toggleDropdown = () => {
    const dropdownButton = document.querySelector(".fc-dropdownButton-button");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (dropdownButton && dropdownMenu) {
      const rect = dropdownButton.getBoundingClientRect();
      const menuRect = dropdownMenu.getBoundingClientRect();
      var offset = (rect.width + menuRect.width) / 2
      dropdownMenu.style.position = "absolute";
      dropdownMenu.style.top = `${rect.bottom}px`;
      dropdownMenu.style.left = `${rect.left - offset - menuRect.left}px`;
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";

      const handleClickOutside = (event) => {
        if (
          !dropdownButton.contains(event.target) &&
          !dropdownMenu.contains(event.target)
        ) {
          dropdownMenu.style.display = "none";
          document.removeEventListener("click", handleClickOutside);
        }
      };

      document.addEventListener("click", handleClickOutside);
    }
  };

  const setupDropdownEventListeners = (calendar) => {
    document.getElementById("monthView").addEventListener("click", function () {
      changeCalendarView(calendar, "dayGridMonth");
    });

    document.getElementById("weekView").addEventListener("click", function () {
      changeCalendarView(calendar, "timeGridWeek");
    });

    document.getElementById("dayView").addEventListener("click", function () {
      changeCalendarView(calendar, "timeGridDay");
    });

    document.getElementById("listView").addEventListener("click", function () {
      changeCalendarView(calendar, "list");
    });
  };

  const changeCalendarView = (calendar, viewName) => {
    calendar.changeView(viewName);
    dropdownMenu.style.display = "none";
  };

  const calendar = initializeCalendar(calendarEl);

  setupDropdownEventListeners(calendar);

  calendar.render();
});
