/* ==========================================
ADVANCED SECTION-WISE READ ALOUD
+ SMART CENTERED SCROLLING
+ PREMIUM FOCUS ANIMATION
+ ACCORDION SAFE
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
    el.classList.remove("spoken-animate");
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
UTILITY: Open all nested accordions in section
========================================== */
function expandAllAccordionsInSection(section) {
  if (!section) return;

  const containers = section.querySelectorAll(".accordion-section, .accordion-subsection");

  containers.forEach(container => {
    container.classList.add("open");

    const toggle = container.querySelector(":scope > .accordion-toggle");
    const content = container.querySelector(":scope > .accordion-content");

    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
    }

    if (content) {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

/* ==========================================
UTILITY: Build readable queue from section
========================================== */
function buildSpeechQueue(section) {
  if (!section) return [];

  const selectors = [
    ".accordion-toggle span:first-child",
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
SMART CENTERED SCROLL
========================================== */
function scrollToElement(element) {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const elementTop = rect.top;
  const elementBottom = rect.bottom;

  const isComfortablyVisible =
    elementTop >= 120 && elementBottom <= viewportHeight - 120;

  if (isComfortablyVisible) return;

  const absoluteTop = window.scrollY + rect.top;

  if (absoluteTop < 320) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    return;
  }

  const offset = absoluteTop - (viewportHeight / 2) + (rect.height / 2);

  window.scrollTo({
    top: offset,
    behavior: "smooth"
  });
}

/* ==========================================
CORE: Speak next block
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

  element.classList.remove("spoken-animate");
  void element.offsetWidth;
  element.classList.add("spoken-animate");

  scrollToElement(element);

  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.rate = 1;
  currentUtterance.pitch = 1;
  currentUtterance.lang = "en-US";

  currentUtterance.onend = () => {
    element.classList.remove("spoken-line");
    element.classList.remove("spoken-animate");
    currentIndex++;
    speakNextBlock();
  };

  currentUtterance.onerror = () => {
    element.classList.remove("spoken-line");
    element.classList.remove("spoken-animate");
    currentIndex++;
    speakNextBlock();
  };

  speechSynthesis.speak(currentUtterance);
}

/* ==========================================
UTILITY: Final cleanup
========================================== */
function finishReading() {
  isReading = false;
  currentQueue = [];
  currentIndex = 0;
  currentUtterance = null;

  document.querySelectorAll(".spoken-line").forEach(el => {
    el.classList.remove("spoken-line");
    el.classList.remove("spoken-animate");
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

  expandAllAccordionsInSection(section);

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
OPTIONAL: Read all sections
========================================== */
function readAllSections() {
  stopReading();

  const sectionIds = ["tldr", "summary", "chapters", "exercises", "blogs"];
  const allItems = [];

  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      expandAllAccordionsInSection(section);
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
SAFETY
========================================== */
window.addEventListener("beforeunload", () => {
  stopReading();
});
