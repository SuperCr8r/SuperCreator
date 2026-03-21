/* ==========================================
ADVANCED TTS (LINE LEVEL + AUTO SCROLL)
========================================== */

let speechQueue = [];
let isReading = false;

/* ==========================================
HELPER: GET TEXT BLOCKS
========================================== */

function getBlocksFromSection(startId){

  const start = document.getElementById(startId);
  if(!start) return [];

  let blocks = [];
  let node = start.parentElement.nextElementSibling;

  while(node && node.tagName !== "HR" && !node.id){

    if(node.innerText.trim()){
      blocks.push(node);
    }

    node = node.nextElementSibling;
  }

  return blocks;
}

/* ==========================================
READ SECTION (LINE LEVEL)
========================================== */

function readSection(id){

  stopReading();

  let blocks = [];

  if(id === "blogs"){
    document.querySelectorAll(".blog").forEach(blog=>{
      blocks.push(blog);
    });
  } else {
    blocks = getBlocksFromSection(id);
  }

  speakBlocks(blocks);
}

/* ==========================================
READ ALL
========================================== */

function readAll(){

  stopReading();

  let blocks = [];

  ["tldr","summary","chapters"].forEach(id=>{
    blocks = blocks.concat(getBlocksFromSection(id));
  });

  document.querySelectorAll(".blog").forEach(blog=>{
    blocks.push(blog);
  });

  speakBlocks(blocks);
}

/* ==========================================
SPEAK BLOCKS WITH SCROLL + HIGHLIGHT
========================================== */

function speakBlocks(blocks){

  if(!blocks.length){
    alert("No readable content found");
    return;
  }

  isReading = true;

  let index = 0;

  function speakNext(){

    if(index >= blocks.length || !isReading){
      return;
    }

    const block = blocks[index];

    // Remove old highlight
    document.querySelectorAll(".reading-active").forEach(el=>{
      el.classList.remove("reading-active");
    });

    block.classList.add("reading-active");

    block.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    const utter = new SpeechSynthesisUtterance(block.innerText);

    utter.onend = () => {
      index++;
      speakNext();
    };

    speechSynthesis.speak(utter);
  }

  speakNext();
}

/* ==========================================
STOP
========================================== */

function stopReading(){
  isReading = false;
  speechSynthesis.cancel();

  document.querySelectorAll(".reading-active").forEach(el=>{
    el.classList.remove("reading-active");
  });
}
