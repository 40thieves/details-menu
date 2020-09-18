(function () {
  /*
   * Details Menu component
   * Inspired by Inspired by https://github.com/muan/details-on-details
   * No JS is required for the basic functionality
   * This script just adds Esc, Up and Down arrow key support. This is marked as
   * optional in the WAI-ARIA Practices document (https://www.w3.org/TR/wai-aria-practices-1.1/#menu)
   * Also it felt like a nice UX enhancement for menus
   */
  document.querySelectorAll(".details-menu").forEach((detailsEl) => {
    detailsEl.addEventListener("toggle", () => {
      if (detailsEl.hasAttribute("open")) {
        detailsEl.addEventListener("keydown", keydown);
      } else {
        detailsEl.removeEventListener("keydown", keydown);
      }
    });
  });

  function keydown(e) {
    const details = event.currentTarget;
    if (!(details instanceof Element)) return;

    // Ignore key presses from nested details.
    if (details.querySelector("details[open]")) return;

    switch (e.key) {
      case "Escape":
        close(details);
        e.preventDefault();
        e.stopPropagation();
        break;

      case "ArrowDown":
        {
          const target = findSibling(details, true);
          if (target) target.focus();
          e.preventDefault();
        }
        break;

      case "ArrowUp":
        {
          const target = findSibling(details, false);
          if (target) target.focus();
          e.preventDefault();
        }
        break;
    }
  }

  function findSibling(details, findNext) {
    const options = Array.from(
      details.querySelectorAll(
        '[role^="menuitem"]:not([hidden]):not([disabled]):not([aria-disabled="true"])'
      )
    ).filter(
      (el) =>
        el.closest('[role="menu"]') === details.querySelector('[role="menu"]')
    );
    const selected = document.activeElement;
    const index = options.indexOf(selected);
    const sibling = findNext ? options[index + 1] : options[index - 1];
    const fallback = findNext ? options[0] : options[options.length - 1];
    return sibling || fallback;
  }

  function close(details) {
    details.removeAttribute("open");
    const summary = details.querySelector("summary");
    if (summary) summary.focus();
  }
})();
