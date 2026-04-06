<!-- KEEP ALL YOUR CONTENT SAME ABOVE -->

<script>
document.addEventListener("DOMContentLoaded", function () {

  function setHeightAutoThenScroll(content) {
    if (!content) return;

    // Reset first (important)
    content.style.maxHeight = "none";

    // Force reflow
    content.offsetHeight;

    // Then set correct height
    content.style.maxHeight = content.scrollHeight + "px";
  }

  function updateAllParents(element) {
    let current = element.parentElement;

    while (current) {
      if (
        current.classList &&
        (current.classList.contains("accordion-section") ||
         current.classList.contains("accordion-subsection"))
      ) {
        const parentContent = current.querySelector(":scope > .accordion-content");

        if (parentContent && current.classList.contains("open")) {
          setHeightAutoThenScroll(parentContent);
        }
      }
      current = current.parentElement;
    }
  }

  const accordionToggles = document.querySelectorAll(".accordion-toggle");

  accordionToggles.forEach(toggle => {
    toggle.addEventListener("click", function () {
      const parent = this.closest(".accordion-section, .accordion-subsection");
      const isOpen = parent.classList.contains("open");
      const content = this.nextElementSibling;

      parent.classList.toggle("open");
      this.setAttribute("aria-expanded", String(!isOpen));

      if (content) {
        if (!isOpen) {
          // Step 1: expand child FIRST
          setHeightAutoThenScroll(content);

          // Step 2: wait for DOM paint, then update parents
          requestAnimationFrame(() => {
            updateAllParents(parent);
          });

        } else {
          content.style.maxHeight = null;

          requestAnimationFrame(() => {
            updateAllParents(parent);
          });
        }
      }
    });
  });

  // Initial open sections
  document.querySelectorAll(
    ".accordion-section.open > .accordion-content, .accordion-subsection.open > .accordion-content"
  ).forEach(content => {
    setHeightAutoThenScroll(content);
  });

  // Resize fix
  window.addEventListener("resize", () => {
    document.querySelectorAll(
      ".accordion-section.open > .accordion-content, .accordion-subsection.open > .accordion-content"
    ).forEach(content => {
      setHeightAutoThenScroll(content);
    });
  });

});
</script>
