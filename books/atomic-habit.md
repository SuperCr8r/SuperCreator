---
layout: book
title: "Atomic Habits"
author: "James Clear"
year: 2018
rating: 9
cover: "atomic-habits.jpg"
section: books
tags: [habits, productivity, behavior, systems, self-improvement]
description: "A practical framework for building good habits and breaking bad ones through small, consistent improvements."
---

<section id="tldr" class="accordion-section open">
  <button class="accordion-toggle level-1" type="button" aria-expanded="true">
    <span>TL;DR</span>
    <span class="accordion-icon">+</span>
  </button>

  <div class="accordion-content">
    <div class="accordion-subsection open">
      <button class="accordion-toggle level-2" type="button" aria-expanded="true">
        <span>One-Line Book Thesis</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-content">
        <p>1Tiny, consistent improvements—designed through systems and identity—compound into remarkable long-term results.</p>
      </div>
    </div>

    <div class="accordion-subsection">
      <button class="accordion-toggle level-2" type="button">
        <span>Top 5 Key Insights</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-content">
        <ul>
          <li><strong>You do not rise to the level of your goals; you fall to the level of your systems.</strong></li>
          <li><strong>Habits are votes for the type of person you want to become.</strong></li>
          <li><strong>Small changes compound over time.</strong></li>
          <li><strong>Environment beats motivation.</strong></li>
          <li><strong>Use the 4 Laws of Behavior Change.</strong></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section id="summary" class="accordion-section">
  <button class="accordion-toggle level-1" type="button">
    <span>Summary</span>
    <span class="accordion-icon">+</span>
  </button>

  <div class="accordion-content">
    <p><strong>Atomic Habits</strong> explains how small behavioral changes compound into long-term transformation. The focus is on systems and identity, not goals.</p>
  </div>
</section>

<section id="chapters" class="accordion-section">
  <button class="accordion-toggle level-1" type="button">
    <span>Chapter-wise Summary</span>
    <span class="accordion-icon">+</span>
  </button>

  <div class="accordion-content">
    <div class="accordion-subsection">
      <button class="accordion-toggle level-2" type="button">
        <span>Chapter 1 — The Power of Tiny Habits</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-content">
        <p>Small improvements compound over time.</p>
      </div>
    </div>
  </div>
</section>

<section id="exercises" class="accordion-section">
  <button class="accordion-toggle level-1" type="button">
    <span>Exercises for You</span>
    <span class="accordion-icon">+</span>
  </button>

  <div class="accordion-content">
    <div class="accordion-subsection">
      <button class="accordion-toggle level-2" type="button">
        <span>Habit Audit</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-content">
        <p>Track your habits for a day.</p>
      </div>
    </div>
  </div>
</section>

<section id="blogs" class="accordion-section">
  <button class="accordion-toggle level-1" type="button">
    <span>Blogs</span>
    <span class="accordion-icon">+</span>
  </button>

  <div class="accordion-content">
    <div class="accordion-subsection">
      <button class="accordion-toggle level-2" type="button">
        <span>Leader Perspective</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-content">
        <p>Culture is repeated behavior.</p>
      </div>
    </div>
  </div>
</section>

<script>
document.addEventListener("DOMContentLoaded", function () {

  function setHeight(el) {
    if (!el) return;
    el.style.maxHeight = el.scrollHeight + "px";
  }

  function updateParents(el) {
    let parent = el.parentElement;

    while (parent) {
      if (
        parent.classList &&
        (parent.classList.contains("accordion-section") ||
         parent.classList.contains("accordion-subsection"))
      ) {
        const content = parent.querySelector(":scope > .accordion-content");
        if (content && parent.classList.contains("open")) {
          setHeight(content);
        }
      }
      parent = parent.parentElement;
    }
  }

  document.querySelectorAll(".accordion-toggle").forEach(btn => {
    btn.addEventListener("click", function () {

      const container = this.closest(".accordion-section, .accordion-subsection");
      const content = this.nextElementSibling;
      const isOpen = container.classList.contains("open");

      container.classList.toggle("open");
      this.setAttribute("aria-expanded", !isOpen);

      if (content) {
        if (!isOpen) {
          setHeight(content);
          requestAnimationFrame(() => updateParents(container));
        } else {
          content.style.maxHeight = null;
          requestAnimationFrame(() => updateParents(container));
        }
      }

    });
  });

  document.querySelectorAll(".accordion-section.open > .accordion-content, .accordion-subsection.open > .accordion-content")
    .forEach(setHeight);

});
</script>
