/* ==========================================
FEATURE: Section-wise Read Aloud (Stable Version)
Reads clean section content only
========================================== */

let currentUtterance = null;

/* ==========================================
UTILITY: Stop current reading + cleanup
========================================== */
function stopReading() {
  speechSynthesis.cancel();
  currentUtterance = null;

  document.querySelectorAll(".reading-active").forEach(el => {
    el.classList.remove("reading-active");
  });
}

/* ==========================================
UTILITY: Clean readable text
========================================== */
function getCleanText(element) {
  if (!element) return "";

  return element.innerText
    .replace(/\s+/g, " ")
    .replace(/•/g, ". ")
    .trim();
}

/* ==========================================
UTILITY: Speak text safely
========================================== */
function speakText(text, onEndCallback = null) {
  if (!text || !text.trim()) {
    alert("No readable content found!");
    return;
  }

  stopReading();

  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.rate = 1;
  currentUtterance.pitch = 1;
  currentUtterance.lang = "en-US";

  currentUtterance.onend = () => {
    if (typeof onEndCallback === "function") {
      onEndCallback();
    }
  };

  speechSynthesis.speak(currentUtterance);
}

/* ==========================================
FEATURE: Read one section
========================================== */
function readSection(id) {
  const section = document.getElementById(id);

  if (!section) {
    alert(`Section "${id}" not found`);
    return;
  }

  // Remove old highlight
  document.querySelectorAll(".reading-active").forEach(el => {
    el.classList.remove("reading-active");
  });

  // Highlight active section
  section.classList.add("reading-active");

  // Scroll to section
  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  const text = getCleanText(section);

  speakText(text, () => {
    section.classList.remove("reading-active");
  });
}

/* ==========================================
OPTIONAL: Read all content if ever needed later
(Not currently used by UI, but kept for scalability)
========================================== */
function getReadableContent() {
  const sectionIds = ["tldr", "summary", "chapters", "blog"];
  let content = "";

  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      content += getCleanText(section) + " ";
    }
  });

  return content.trim();
}

/* ==========================================
SAFETY: Cleanup on page unload
========================================== */
window.addEventListener("beforeunload", () => {
  stopReading();
});
