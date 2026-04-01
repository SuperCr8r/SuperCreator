/* ==========================================
FEATURE: Back to Top (Safe Version)
- Defensive against missing button
- Smooth scroll
========================================== */

document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (!backToTopBtn) return;

  function toggleBackToTop() {
    const scrolled = document.body.scrollTop > 300 || document.documentElement.scrollTop > 300;
    backToTopBtn.style.display = scrolled ? "block" : "none";
  }

  window.addEventListener("scroll", toggleBackToTop);

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  toggleBackToTop();
});
