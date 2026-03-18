/* ==========================================
FEATURE: Text-to-Speech (Read Aloud)
Uses browser SpeechSynthesis API
========================================== */

let utterance;

document.getElementById("readAloudBtn").addEventListener("click", () => {

  const content = document.querySelector(".book-content").innerText;

  utterance = new SpeechSynthesisUtterance(content);

  utterance.rate = 1;      // speed (0.5 - 2)
  utterance.pitch = 1;     // tone
  utterance.lang = "en-US";

  speechSynthesis.speak(utterance);

});

document.getElementById("stopReadingBtn").addEventListener("click", () => {
  speechSynthesis.cancel();
});
