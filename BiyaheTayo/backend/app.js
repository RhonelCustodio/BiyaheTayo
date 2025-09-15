const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const inputLang = document.getElementById("inputLang");
const outputLang = document.getElementById("outputLang");
const speakBtn = document.getElementById("speakBtn");
const micBtn = document.getElementById("micBtn");

async function translateText() {
  const text = inputText.value.trim();
  if (!text) return;
  
  const from = inputLang.value;
  const to = outputLang.value;

  const res = await fetch(`api/get_translation.php?phrase=${encodeURIComponent(text)}&from=${from}&to=${to}`);
  const data = await res.json();
  outputText.textContent = data.translation || "[No translation found]";
}

// Text-to-speech
speakBtn.addEventListener("click", () => {
  if (!('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(outputText.textContent);
  utter.lang = outputLang.value;
  speechSynthesis.speak(utter);
});

// Speech recognition
micBtn.addEventListener("click", () => {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech recognition not supported");
    return;
  }
  const recog = new webkitSpeechRecognition();
  recog.lang = inputLang.value;
  recog.onresult = (e) => {
    inputText.value = e.results[0][0].transcript;
    translateText();
  };
  recog.start();
});
