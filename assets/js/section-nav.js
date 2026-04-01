/* ==========================================
SMART SECTION NAVIGATION (CLEAN + STABLE)
- Only picks valid content sections
- No page title / no noise
- Smooth active highlighting
========================================== */

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("section-nav");

  if (!nav) return;

  nav.innerHTML = "";

  const validSectionIds = ["tldr", "summary", "chapters", "blog"];
  const sections = validSectionIds
    .map(id => document.getElementById(id))
    .filter(section => section !== null);

  if (sections.length === 0) return;

  sections.forEach(section => {
    const heading = section.querySelector("h2");
    if (!heading) return;

    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = "#" + section.id;
    a.textContent = heading.textContent.trim();

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

  function setActiveLink() {
    let currentSectionId = "";

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();

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
  setActiveLink();
});
