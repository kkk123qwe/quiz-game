const quiz = [
  {
    question: "What does Apollo represent in this sculpture?",
    image: "images/Apollo.png",
    options: [
      "War and conquest",
      "Trades and arts",
      "Weather and farming",
      "Time and space",
    ],
    answer: "Trades and arts",
    description:
      "A wooden figure sculpture, possibly representing Apollo in polychrome wood. Apollo, the Classical god of light, poetry, music, healing and prophecy, was often used to represent the trades, arts and professions. Here he is their protector. There is a bird of prey on his shoulder and a lamb by his left foot. He wears a laurel wreath on his head and carries a pomegranate. The figure is naked except for narrow red bands to which are attached the symbols of trades, professions, crafts and artistic pursuits of the many guilds of the time. Decoration is confined to the front of the statue, suggesting that the piece was made to stand in a corner. The feet are not original. Augsburg, Germany.",
  },
  {
    question: "Who ordered the O Dea Mitre in 1418?",
    image: "images/Mitre.png",
    options: [
      "Bishop O'Malley",
      "Bishop O Dea",
      "Bishop Thomas",
      "Bishop Forth",
    ],
    answer: "Bishop O Dea",
    description:
      "The O Dea Mitre is on display in the Museum on behalf of the Roman Catholic diocese of Limerick. The mitre was made to the order of Bishop Conor O Dea of Limerick in 1418 and still belongs to his successor. This mitre made by Thomas O Carryd would have been used for the most solemn occasions.",
  },
  {
    question: "Who drew the Four Cats Menu Card?",
    image: "images/Picasso.png",
    options: ["Salvador Dalí", "Pablo Picasso", "Joan Miró", "Henri Matisse"],
    answer: "Pablo Picasso",
    description:
      "A drawing in wax crayon and ink on paper, Four Cats / Plat del Dia, by Pablo Picasso. It is a menu card for a cafe called in Catalan Els Quatre Gats (the Four Cats), depicting a waiter carrying a bottle in one hand and holding a panel inscribed Plat del Dia (dish of the day) in the other. There is a blank panel below. It is signed P. Ruiz Picasso, the form of his signature used by Picasso until 1901.",
  },
  {
    question: "Where was the porcelain puppy made?",
    image: "images/puppy.png",
    options: ["Paris", "Japan", "London", "Beijing"],
    answer: "Japan",
    description:
      "File of material relating to figures of a cat and dog. Includes two photocopies of information card with photocopies of images of objects (date unspecified); photocopy of Hunt Museum object comment sheet (17 April 1996) containing comments made about object by Peter Francis. He attributes them to Arita, Japan, and dates them to the late seventeenth century; photocopy of incomplete letter (date unspecified) written by Peter Francis commenting on various objects in the Hunt Museum; photocopy of paper by Doctor Oliver Impey entitled 'Figures from Japan: A survey of export porcelain figures of the late 17th and 18th centuries. Part I: Animals' published in 'Ceramics' (c. July-August 1986). Includes images of similar objects; photocopy of a poem by Thomas Gray entitled 'On a Favourite Cat, Drowned in a Tub of Goldfishes' (date unspecified); photocopy of extract from 'The folk arts of Japan' (Japan: Charles E. Tuttle Company, 1958) by Hugo Munsterberg, which discusses symbolism of figures of cats and dogs in Japan; photocopy of extract from 'Mingei: Japan's Enduring Folk Arts' (Japan: Heian International, 1983) by Amaury Saint-Gilles. Extract discusses figures of beckoning cats; photocopy of extract from 'Judith Leiber: The Artful Handbag' (Harry N. Abrams Inc., 1995), text by Enid Nemy. Comprises images of similar figures.",
  },
  {
    question: "What phrase is inscribed on the gold band around the coin?",
    image: "images/coin.png",
    options: [
      "In God We Trust",
      "Victory for the Charioteer",
      "This is the price of blood",
      "Paid in silver",
    ],
    answer: "This is the price of blood",
    description:
      "A pendant made from a silver coin, the dekadrachm (ten-drachma) of Syracuse, set in a gold mount with a suspension loop. The front face shows a female head surrounded by four dolphins, possibly Arethusa or Persephone. The reverse shows a chariot pulled by four horses and a charioteer. The goddess of victory Nike flies overhead to crown the charioteers head with a wreath. This coin is reputed to be one of the so-called thirty pieces of silver paid to Judas for betraying Christ. This belief comes from the Middle Ages. The gold band surrounded the coin is inscribed with: Quia precium sanguinis est [This is the price of blood]. The coin is Greek, Sicilian or Southern Italian; the mount medieval.",
  },
];

let current = 0;
let score = 0;
let time = 15;
let timerInterval;
const wrongAnswers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const timerBox = document.getElementById("timer-box");
const progressCount = document.getElementById("progress-count");
const progressFill = document.getElementById("progress-fill");
const imageEl = document.getElementById("quiz-image");
const reviewSection = document.getElementById("review-section");

function startTimer() {
  time = 15;
  timerBox.textContent = time;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    time--;
    timerBox.textContent = time;
    if (time === 0) {
      clearInterval(timerInterval);
      showAnswer(null);
    }
  }, 1000);
}

function showQuestion() {
  const q = quiz[current];
  questionEl.textContent = q.question;
  imageEl.src = q.image;
  imageEl.style.display = "block";
  optionsEl.innerHTML = "";
  progressCount.textContent = `${current + 1} / ${quiz.length}`;
  progressFill.style.width = `${((current + 1) / quiz.length) * 100}%`;

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => showAnswer(opt);
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function showAnswer(selected) {
  clearInterval(timerInterval);
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === quiz[current].answer) {
      btn.classList.add("correct");
    } else if (btn.textContent === selected) {
      btn.classList.add("wrong");
    }
  });

  if (selected !== quiz[current].answer) {
    wrongAnswers.push(quiz[current]);
  } else {
    score++;
  }

  setTimeout(() => {
    current++;
    if (current < quiz.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1500);
}

function showResults() {
  questionEl.textContent = "Quiz Completed!";
  imageEl.style.display = "none";
  optionsEl.innerHTML = "";
  progressCount.textContent = "";
  timerBox.textContent = "";
  progressFill.style.width = "100%";
  scoreEl.textContent = `Your final score is ${score} / ${quiz.length}`;

  // Show wrong answers
  if (wrongAnswers.length > 0) {
    reviewSection.innerHTML = `<h3>Review</h3>`;
    wrongAnswers.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("review-item");
      div.innerHTML = `
        <img src="${item.image}" alt="wrong answer image" />
        <p><strong>Correct Answer:</strong> ${item.answer}</p>
        <p>${item.description}</p>
      `;
      reviewSection.appendChild(div);
    });
  }
}

showQuestion();
