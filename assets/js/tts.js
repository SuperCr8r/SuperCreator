/* ==========================================
STABLE TTS ENGINE (FULL FIX)
========================================== */

let utterance;

/* DOM READY */
document.addEventListener("DOMContentLoaded", function(){

  const readBtn = document.getElementById("readAloudBtn");
  const stopBtn = document.getElementById("stopReadingBtn");

  if(readBtn){
    readBtn.addEventListener("click", readAll);
  }

  if(stopBtn){
    stopBtn.addEventListener("click", () => speechSynthesis.cancel());
  }

});

/* ==========================================
READ ALL CONTENT
========================================== */

function readAll(){

  let content = "";

  const sections = ["tldr", "summary", "chapters"];

  sections.forEach(id => {
    const el = document.getElementById(id);
    if(el){
      content += el.innerText + " ";
    }
  });

  document.querySelectorAll(".blog").forEach(blog => {
    content += blog.innerText + " ";
  });

  if(!content.trim()){
    alert("No readable content found");
    return;
  }

  utterance = new SpeechSynthesisUtterance(content);

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

/* ==========================================
READ SINGLE SECTION
========================================== */

function readSection(id){

  let element;

  if(id === "blogs"){
    element = document.querySelector(".blog");
  } else {
    element = document.getElementById(id);
  }

  if(!element){
    alert("Section not found");
    return;
  }

  /* REMOVE OLD HIGHLIGHT */
  document.querySelectorAll(".reading-active").forEach(el=>{
    el.classList.remove("reading-active");
  });

  element.classList.add("reading-active");

  element.scrollIntoView({
    behavior:"smooth",
    block:"start"
  });

  const speech = new SpeechSynthesisUtterance(element.innerText);

  speech.onend = () => {
    element.classList.remove("reading-active");
  };

  speechSynthesis.cancel();
  speechSynthesis.speak(speech);
}
