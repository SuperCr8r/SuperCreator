/* ==========================================
SMART SECTION NAVIGATION (UPDATED)
- Includes Key Info as top jump
- Supports new exercises/blogs ids
- Smooth scroll
- Active section highlighting
========================================== */

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("section-nav");
  if (!nav) return;

  nav.innerHTML = "";

  const navConfig = [
    { id: "key-info", labelFallback: document.title.replace(" | SuperCreator", "") || "Book" },
    { id: "tldr", labelFallback: "TL;DR" },
    { id: "summary", labelFallback: "Summary" },
    { id: "chapters", labelFallback: "Chapter-wise Summary" },
    { id: "exercises", labelFallback: "Exercises for You" },
    { id: "blogs", labelFallback: "Blogs" }
  ];

  const sections = navConfig
    .map(item => {
      const el = document.getElementById(item.id);
      return el ? { ...item, el } : null;
    })
    .filter(Boolean);

  if (sections.length === 0) return;

  sections.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = "#" + item.id;

    const heading =
      item.el.querySelector("h1, h2, .book-title") ||
      item.el.querySelector(".accordion-toggle span") ||
      null;

    a.textContent = heading
      ? heading.textContent.trim()
      : item.labelFallback;

    a.addEventListener("click", function (e) {
      e.preventDefault();

      item.el.scrollIntoView({
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
      const rect = item.el.getBoundingClientRect();

      if (rect.top <= 180 && rect.bottom >= 180) {
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
