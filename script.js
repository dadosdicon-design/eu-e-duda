const startDate = new Date("2024-08-02T00:00:00");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const openLetterModalBtn = document.getElementById("openLetterModal");
const closeLetterModalBtn = document.getElementById("closeLetterModal");
const letterModal = document.getElementById("letterModal");
const letterContent = document.getElementById("letterContent");

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = String(days);
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCounter();
setInterval(updateCounter, 1000);

function openLetter() {
  letterModal.classList.add("open");
  letterModal.setAttribute("aria-hidden", "false");
}

function closeLetter() {
  letterModal.classList.remove("open");
  letterModal.setAttribute("aria-hidden", "true");
}

openLetterModalBtn.addEventListener("click", openLetter);
closeLetterModalBtn.addEventListener("click", closeLetter);

letterModal.addEventListener("click", (event) => {
  if (event.target === letterModal) {
    closeLetter();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && letterModal.classList.contains("open")) {
    closeLetter();
  }
});

async function loadLetterText() {
  const text = typeof window.CARTA_TEXTO === "string" ? window.CARTA_TEXTO : "";
  const blocks = text
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  letterContent.innerHTML = "";

  if (blocks.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Escreva sua carta no arquivo carta-conteudo.js";
    letterContent.appendChild(emptyMessage);
    return;
  }

  blocks.forEach((block) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = block;
    letterContent.appendChild(paragraph);
  });
}

loadLetterText();
