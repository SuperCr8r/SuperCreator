/* ==========================================
TTS ENGINE (Stable Version)
========================================== */

let utterance;

/* Wait for DOM */
document.addEventListener("DOMContentLoaded", function(){

  const readBtn = document.getElementById("readAloudBtn");
  const stopBtn = document.getElementById("stopReadingBtn");

  if(readBtn){
    readBtn.addEventListener("click", startReading);
  }

  if(stopBtn){
    stopBtn.addEventListener("click", stopReading);
  }

});


/* ==========================================
READ FULL CONTENT (FILTERED)
========================================== */

function getReadableContent(){

  let content = "";

  const sections = ["tldr","summary","chapters"];

  sections.forEach(id => {
    const el = document.getElementById(id);
    if(el){
      content += el.innerText + " ";
    }
  });

  document.querySelectorAll(".blog").forEach(blog => {
    content += blog.innerText + " ";
  });

  return content;
}

function startReading(){

  const content = getReadableContent();

  if(!content.trim()){
    alert("No readable content found");
    return;
  }

  utterance = new SpeechSynthesisUtterance(content);
  utterance.rate = 1;
  utterance.pitch = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function stopReading(){
  speechSynthesis.cancel();
}


/* ==========================================
SECTION READ + SCROLL + HIGHLIGHT
========================================== */

function readSection(id){

  let target;

  if(id === "blog"){
    target = document.querySelector(".blog");
  } else {
    target = document.getElementById(id);
  }

  if(!target){
    alert("Section not found");
    return;
  }

  // remove previous highlight
  document.querySelectorAll(".reading-active").forEach(el=>{
    el.classList.remove("reading-active");
  });

  target.classList.add("reading-active");

  target.scrollIntoView({
    behavior:"smooth",
    block:"start"
  });

  const speech = new SpeechSynthesisUtterance(target.innerText);

  speech.onend = () => {
    target.classList.remove("reading-active");
  };

  speechSynthesis.cancel();
  speechSynthesis.speak(speech);
}
