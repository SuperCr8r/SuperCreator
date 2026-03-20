/* ==========================================
FEATURE: Smart Read Aloud (Filtered Content)
Reads only meaningful sections
========================================== */

let utterance;

function getReadableContent(){

  let content = "";

  // TLDR
  const tldr = document.querySelector("#tldr");
  if(tldr){
    content += "T L D R. " + tldr.innerText + " ";
  }

  // Summary
  const summary = document.querySelector("#summary");
  if(summary){
    content += "Summary. " + summary.innerText + " ";
  }

  // Chapter-wise Summary
  const chapters = document.querySelector("#chapters");
  if(chapters){
    content += "Chapter wise summary. " + chapters.innerText + " ";
  }

  // Blogs (multiple)
  const blogs = document.querySelectorAll(".blog");
  if(blogs.length > 0){
    blogs.forEach((blog, index) => {
      content += "Blog " + (index + 1) + ". " + blog.innerText + " ";
    });
  }

  return content;
}

document.getElementById("readAloudBtn").addEventListener("click", () => {

  const content = getReadableContent();

  if(!content.trim()){
    alert("No readable content found!");
    return;
  }

  utterance = new SpeechSynthesisUtterance(content);

  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.lang = "en-US";

  speechSynthesis.cancel(); // stop previous if running
  speechSynthesis.speak(utterance);

});

document.getElementById("stopReadingBtn").addEventListener("click", () => {
  speechSynthesis.cancel();
});

/* ==========================================
FEATURE: Section-wise Reading
========================================== */

/* ==========================================
FEATURE: Section Read + Auto Scroll + Highlight
========================================== */

function readSection(id){

  const section = document.getElementById(id);

  if(!section){
    alert("Section not found");
    return;
  }

  // Remove previous highlights
  document.querySelectorAll(".reading-active").forEach(el => {
    el.classList.remove("reading-active");
  });

  // Add highlight
  section.classList.add("reading-active");

  // Scroll to section
  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  const text = section.innerText;

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";

  // When reading ends → remove highlight
  speech.onend = () => {
    section.classList.remove("reading-active");
  };

  speechSynthesis.cancel();
  speechSynthesis.speak(speech);
}
