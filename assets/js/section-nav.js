/* ==========================================
SMART SECTION NAVIGATION (CLEAN + STABLE)
- Only picks valid content sections
- No page title / no noise
- Smooth active highlighting
========================================== */

document.addEventListener("DOMContentLoaded", function () {

  const nav = document.getElementById("section-nav");

  if (!nav) return;

  // Clear existing (safety)
  nav.innerHTML = "";

  /* ==========================================
  DEFINE VALID SECTIONS (STRICT CONTRACT)
  ========================================== */

  const validSectionIds = ["tldr", "summary", "chapters", "blog"];

  const sections = validSectionIds
    .map(id => document.getElementById(id))
    .filter(section => section !== null);

  /* ==========================================
  BUILD NAV
  ========================================== */

  sections.forEach(section => {

    const heading = section.querySelector("h2");
    if (!heading) return;

    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = "#" + section.id;
    a.textContent = heading.textContent;

    // Smooth scroll on click
    a.addEventListener("click", function (e) {
      e.preventDefault();

      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    li.appendChild(a);
    nav.appendChild(li);
  });

  const navLinks = nav.querySelectorAll("a");

  /* ==========================================
  SCROLL-BASED ACTIVE STATE (IMPROVED)
  ========================================== */

  function setActiveLink() {

    let currentSectionId = "";

    sections.forEach(section => {

      const rect = section.getBoundingClientRect();

      // Section is considered active if near viewport top
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + currentSectionId) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);

  // Run once on load
  setActiveLink();

});
