const quotes = [
  { text: "작은 시작이 결국 큰 변화를 만든다.", author: "익명", category: "도전" },
  { text: "오늘의 한 걸음은 내일의 자신감을 만든다.", author: "익명", category: "성장" },
  { text: "완벽함보다 중요한 건 계속하는 것이다.", author: "익명", category: "습관" },
  { text: "마음이 흔들릴수록, 천천히 가는 힘이 필요하다.", author: "익명", category: "위로" },
  { text: "성공은 속도가 아니라 방향에서 시작된다.", author: "익명", category: "성장" },
  { text: "두려움은 사라지는 것이 아니라 넘어서는 것이다.", author: "익명", category: "도전" },
  { text: "습관은 미래의 나를 조용히 바꾸는 도구다.", author: "익명", category: "습관" },
  { text: "오늘 버틴 사람만이 내일의 웃음을 얻는다.", author: "익명", category: "위로" },
  { text: "시작이 반이라는 말은, 반만큼은 이미 해냈다는 뜻이다.", author: "익명", category: "도전" },
  { text: "어제보다 나은 오늘이면 충분히 잘하고 있는 것이다.", author: "익명", category: "위로" },
  { text: "성장은 늘 불편한 곳에서 시작된다.", author: "익명", category: "성장" },
  { text: "반복은 지루함이 아니라 실력을 만드는 힘이다.", author: "익명", category: "습관" },
  { text: "멈추지 않는 사람은 결국 자기 길을 만든다.", author: "익명", category: "도전" },
  { text: "쉬어도 괜찮다. 멈추지만 않으면 된다.", author: "익명", category: "위로" },
  { text: "꾸준함은 재능을 이기는 가장 조용한 무기다.", author: "익명", category: "습관" },
  { text: "낯선 길은 늘 성장의 시작점이다.", author: "익명", category: "성장" },
  { text: "오늘의 나를 믿는 순간, 길이 보이기 시작한다.", author: "익명", category: "위로" },
  { text: "실패는 끝이 아니라 방향 조정일 뿐이다.", author: "익명", category: "도전" },
  { text: "작게라도 매일 움직이면 인생은 분명 달라진다.", author: "익명", category: "습관" },
  { text: "마음이 무거운 날엔, 잘 버틴 것만으로 충분하다.", author: "익명", category: "위로" },
  { text: "한 번의 용기가 오래된 한계를 무너뜨린다.", author: "익명", category: "도전" },
  { text: "배움은 나를 작게 만드는 것이 아니라 넓히는 것이다.", author: "익명", category: "성장" },
  { text: "좋은 습관은 좋은 운보다 오래 간다.", author: "익명", category: "습관" },
  { text: "당신은 이미 생각보다 많이 해내고 있다.", author: "익명", category: "위로" },
];

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const quoteCategory = document.getElementById("quoteCategory");
const quoteIndex = document.getElementById("quoteIndex");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeCategory = "all";
let currentQuote = quotes[0];

function getFilteredQuotes() {
  if (activeCategory === "all") {
    return quotes;
  }
  return quotes.filter((quote) => quote.category === activeCategory);
}

function renderQuote(nextQuote) {
  currentQuote = nextQuote;

  const filtered = getFilteredQuotes();
  const filteredIndex = filtered.indexOf(nextQuote) + 1;
  const paddedIndex = String(filteredIndex).padStart(2, "0");
  const total = String(filtered.length).padStart(2, "0");

  quoteText.textContent = nextQuote.text;
  quoteAuthor.textContent = `- ${nextQuote.author}`;
  quoteCategory.textContent = `#${nextQuote.category}`;
  quoteIndex.textContent = `${paddedIndex} / ${total}`;

  quoteText.classList.remove("fade");
  void quoteText.offsetWidth;
  quoteText.classList.add("fade");

  if (filtered.length === 1) {
    showToast(`${nextQuote.category} 명언 1개를 찾았어요.`);
  } else if (activeCategory !== "all") {
    showToast(`${nextQuote.category} 카테고리에서 새 명언을 골랐어요.`);
  } else {
    showToast("새 명언이 만들어졌어요.");
  }
}

function showToast(message) {
  toast.textContent = message;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.textContent = "";
  }, 1800);
}

function generate() {
  const list = getFilteredQuotes();
  if (list.length === 0) {
    showToast("선택한 카테고리에 명언이 없어요.");
    return;
  }

  let nextQuote = list[Math.floor(Math.random() * list.length)];
  if (list.length > 1) {
    while (nextQuote === currentQuote) {
      nextQuote = list[Math.floor(Math.random() * list.length)];
    }
  }

  renderQuote(nextQuote);
}

async function copyQuote() {
  const text = `${currentQuote.text} ${quoteAuthor.textContent}`;

  try {
    await navigator.clipboard.writeText(text);
    showToast("명언을 클립보드에 복사했어요.");
  } catch {
    showToast("복사에 실패했어요. 브라우저 권한을 확인해 주세요.");
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.category;
    generate();
  });
});

generateBtn.addEventListener("click", generate);
copyBtn.addEventListener("click", copyQuote);

renderQuote(currentQuote);
