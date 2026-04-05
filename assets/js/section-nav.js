/* ==========================================
SMART SECTION NAVIGATION (CONTROLLED + STABLE)
- Explicit book page section map
- Includes book title as top anchor
- Smooth active highlighting
========================================== */

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("section-nav");
  if (!nav) return;

  nav.innerHTML = "";

  const sectionMap = [
    { id: "book-top", label: document.querySelector(".book-title-area h1")?.textContent?.trim() || "Book" },
    { id: "tldr", label: "TL;DR" },
    { id: "summary", label: "Summary" },
    { id: "chapters", label: "Chapter-wise Summary" },
    { id: "exercises", label: "Exercises for You" },
    { id: "blogs", label: "Blogs" }
  ];

  const sections = sectionMap
    .map(item => ({
      ...item,
      element: document.getElementById(item.id)
    }))
    .filter(item => item.element !== null);

  if (sections.length === 0) return;

  sections.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = "#" + item.id;
    a.textContent = item.label;

    a.addEventListener("click", function (e) {
      e.preventDefault();

      item.element.scrollIntoView({
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

    sections.forEach(item => {
      const rect = item.element.getBoundingClientRect();

      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSectionId = item.id;
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
