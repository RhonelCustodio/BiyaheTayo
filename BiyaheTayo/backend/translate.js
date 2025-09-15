document.addEventListener("DOMContentLoaded", () => {
  const inputLang = document.getElementById("inputLang");
  const outputLang = document.getElementById("outputLang");
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const micBtn = document.getElementById("micBtn");
  const speakBtn = document.getElementById("speakBtn");
  const swapBtn = document.getElementById("swapBtn");
  const translateBtn = document.getElementById("translateBtn");

  let typingTimer;
  const debounceDelay = 800; // wait until typing stops
  let controller = null;
  let dotInterval = null;

  // ---------------- Helper: show "typing..." animation ----------------
  function showTypingAnimation() {
    let dots = 0;
    outputText.textContent = "Translating";
    clearInterval(dotInterval);
    dotInterval = setInterval(() => {
      dots = (dots + 1) % 4;
      outputText.textContent = "Translating" + ".".repeat(dots);
    }, 400);
  }

  // ---------------- Helper: type text letter by letter ----------------
function typeText(text) {
  clearInterval(dotInterval);
  outputText.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      // Preserve spaces and line breaks
      const char = text[i] === "\n" ? "<br>" : text[i];
      outputText.innerHTML += char;
      i++;
    } else {
      clearInterval(interval);
    }
  }, 30);
}


  // ---------------- API Translation ----------------
  async function translate() {
    const text = inputText.value.trim();
    const from = inputLang.value;
    const to = outputLang.value;

    if (!text) {
      outputText.textContent = "";
      return;
    }

    // Cancel previous fetch if typing continues
    if (controller) controller.abort();
    controller = new AbortController();
    const signal = controller.signal;

    // Show typing animation
    showTypingAnimation();

    try {
      const res = await fetch("api/translate.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phrase: text, from, to }),
        signal
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();

      if (data.translation) {
        typeText(data.translation);
      } else if (data.error) {
        outputText.textContent = "⚠️ " + data.error;
      } else {
        outputText.textContent = "[No translation]";
      }
    } catch (err) {
      if (err.name === "AbortError") return; // ignore aborted fetch
      console.error("Fetch failed:", err);
      outputText.textContent = "⚠️ Error: " + err.message;
    }
  }

  // Debounced typing
  inputText.addEventListener("input", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(translate, debounceDelay);
  });

  // ---------------- 🔄 Swap Languages ----------------
  swapBtn.addEventListener("click", () => {
    const temp = inputLang.value;
    inputLang.value = outputLang.value;
    outputLang.value = temp;

    const tempText = inputText.value;
    inputText.value = outputText.textContent;
    outputText.textContent = tempText;

    translate();
  });

  // ---------------- 🎤 Voice Input ----------------
  if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    micBtn.addEventListener("click", () => {
      micBtn.classList.add("text-primary");
      const langMap = { en: "en-US", tl: "tl-PH", pam: "tl-PH", ilo: "tl-PH" };
      recognition.lang = langMap[inputLang.value] || "en-US";
      recognition.start();
    });

    recognition.onresult = (event) => {
      inputText.value = event.results[0][0].transcript;
      translate();
    };

    recognition.onend = () => micBtn.classList.remove("text-primary");
    recognition.onerror = () => micBtn.classList.remove("text-primary");
  } else micBtn.style.display = "none";

  // ---------------- 🔊 Voice Output ----------------
  speakBtn.addEventListener("click", () => {
    const text = outputText.textContent;
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = { en: "en-US", tl: "tl-PH", pam: "tl-PH", ilo: "tl-PH" };
    utterance.lang = langMap[outputLang.value] || "en-US";
    speechSynthesis.speak(utterance);
  });

  // Translate button fallback
  if (translateBtn) translateBtn.addEventListener("click", translate);
});
