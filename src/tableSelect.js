// Minimal JS for select all and row selection with bg-grey-eight

document.addEventListener("DOMContentLoaded", function () {
  const selectAll = document.getElementById("select-all");
  const checkboxes = document.querySelectorAll(".row-checkbox");
  const rows = document.querySelectorAll("#car-table-body tr");

  function updateRowBg() {
    checkboxes.forEach((cb, idx) => {
      if (cb.checked) {
        rows[idx].classList.add("bg-grey-eight");
      } else {
        rows[idx].classList.remove("bg-grey-eight");
      }
    });
  }

  // Select All logic
  if (selectAll) {
    selectAll.addEventListener("change", function () {
      checkboxes.forEach((cb) => {
        cb.checked = selectAll.checked;
      });
      updateRowBg();
    });
  }

  // Individual row logic
  checkboxes.forEach((cb, idx) => {
    cb.addEventListener("change", function () {
      updateRowBg();
      // If any unchecked, uncheck select all
      if (!cb.checked) {
        selectAll.checked = false;
      } else {
        // If all checked, check select all
        if ([...checkboxes].every((c) => c.checked)) {
          selectAll.checked = true;
        }
      }
    });
  });

  // Initial state
  updateRowBg();
});
