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
      },
      headerToolbar: {
        left: "prevYear,prev,next,nextYear",
        center: "title",
        right: "today dropdownButton",
      },
      buttonIcons: {
        prev: "chevron-left",
        next: "chevron-right",
        prevYear: "chevrons-left",
        nextYear: "chevrons-right",
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

  const toggleDropdown = () => {
    const dropdownButton = document.querySelector(".fc-dropdownButton-button");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (dropdownButton && dropdownMenu) {
      const rect = dropdownButton.getBoundingClientRect();
      dropdownMenu.style.position = "absolute";
      dropdownMenu.style.top = `${rect.bottom}px`;
      dropdownMenu.style.left = `${rect.left}px`;
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";

      document.addEventListener("click", function (event) {
        if (
          !dropdownButton.contains(event.target) &&
          !dropdownMenu.contains(event.target)
        ) {
          dropdownMenu.style.display = "none";
        }
      });
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
