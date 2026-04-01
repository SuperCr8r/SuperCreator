/* ==========================================
ADVANCED SECTION-WISE READ ALOUD
Features:
- Reads section block-by-block
- Highlights currently spoken block
- Auto-scrolls to spoken block
- Supports manual stop
========================================== */

let currentQueue = [];
let currentIndex = 0;
let isReading = false;
let currentSection = null;
let currentUtterance = null;

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
UTILITY: Remove all active highlights
========================================== */
function clearHighlights() {
  document.querySelectorAll(".reading-active").forEach(el => {
    el.classList.remove("reading-active");
  });

  document.querySelectorAll(".spoken-line").forEach(el => {
    el.classList.remove("spoken-line");
  });
}

/* ==========================================
UTILITY: Stop reading fully
========================================== */
function stopReading() {
  speechSynthesis.cancel();

  isReading = false;
  currentQueue = [];
  currentIndex = 0;
  currentSection = null;
  currentUtterance = null;

  clearHighlights();
}

/* ==========================================
UTILITY: Build readable queue from section
Reads only meaningful content blocks
========================================== */
function buildSpeechQueue(section) {
  if (!section) return [];

  const selectors = [
    "h2",
    "h3",
    "h4",
    "p",
    "li",
    "blockquote"
  ];

  const elements = Array.from(section.querySelectorAll(selectors.join(",")));

  return elements
    .map(el => ({
      element: el,
      text: getCleanText(el)
    }))
    .filter(item => item.text.length > 0);
}

/* ==========================================
UTILITY: Smooth scroll to active spoken block
========================================== */
function scrollToElement(element) {
  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

/* ==========================================
CORE: Speak next block in queue
========================================== */
function speakNextBlock() {
  if (!isReading || currentIndex >= currentQueue.length) {
    finishReading();
    return;
  }

  clearHighlights();

  if (currentSection) {
    currentSection.classList.add("reading-active");
  }

  const item = currentQueue[currentIndex];
  const element = item.element;
  const text = item.text;

  if (!text) {
    currentIndex++;
    speakNextBlock();
    return;
  }

  element.classList.add("spoken-line");
  scrollToElement(element);

  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.rate = 1;
  currentUtterance.pitch = 1;
  currentUtterance.lang = "en-US";

  currentUtterance.onend = () => {
    element.classList.remove("spoken-line");
    currentIndex++;
    speakNextBlock();
  };

  currentUtterance.onerror = () => {
    element.classList.remove("spoken-line");
    currentIndex++;
    speakNextBlock();
  };

  speechSynthesis.speak(currentUtterance);
}

/* ==========================================
UTILITY: Final cleanup after reading ends
========================================== */
function finishReading() {
  isReading = false;
  currentQueue = [];
  currentIndex = 0;
  currentUtterance = null;

  document.querySelectorAll(".spoken-line").forEach(el => {
    el.classList.remove("spoken-line");
  });

  if (currentSection) {
    currentSection.classList.remove("reading-active");
  }

  currentSection = null;
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

  stopReading();

  currentSection = section;
  currentSection.classList.add("reading-active");

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  currentQueue = buildSpeechQueue(section);
  currentIndex = 0;
  isReading = true;

  if (currentQueue.length === 0) {
    alert("No readable content found in this section.");
    stopReading();
    return;
  }

  speakNextBlock();
}

/* ==========================================
OPTIONAL: Read all sections if needed later
(Not currently used in UI, but retained)
========================================== */
function readAllSections() {
  stopReading();

  const sectionIds = ["tldr", "summary", "chapters", "blog"];
  const allItems = [];

  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      const items = buildSpeechQueue(section);
      allItems.push(...items);
    }
  });

  if (allItems.length === 0) {
    alert("No readable content found.");
    return;
  }

  currentQueue = allItems;
  currentIndex = 0;
  isReading = true;
  currentSection = null;

  speakNextBlock();
}

/* ==========================================
SAFETY: Cleanup on page unload
========================================== */
window.addEventListener("beforeunload", () => {
  stopReading();
});
