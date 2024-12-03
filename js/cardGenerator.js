const CARD_TYPES = [
  "Bat",
  "Bones",
  "Cauldron",
  "Dracula",
  "Eye",
  "Ghost",
  "Pumpkin",
  "Skull",
];

function createCard(type) {
  const card = document.createElement("div");
  card.classList.add("card");

  // カードの裏面
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back", "card-face");
  cardBack.innerHTML = `
    <img class="cob-web cob-web-top-left" src="https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/Cobweb.png" />
    <img class="cob-web cob-web-top-right" src="https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/Cobweb.png" />
    <img class="cob-web cob-web-bottom-left" src="https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/Cobweb.png" />
    <img class="cob-web cob-web-bottom-right" src="https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/Cobweb.png" />
    <img class="spider" src="https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/Spider.png" />
  `;

  // カードの表面
  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front", "card-face");
  cardFront.innerHTML = `
    <img class="cob-web cob-web-top-left" src="https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/CobwebGrey.png" />
    <img class="cob-web cob-web-top-right" src="https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/CobwebGrey.png" />
    <img class="cob-web cob-web-bottom-left" src="https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/CobwebGrey.png" />
    <img class="cob-web cob-web-bottom-right" src="https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/CobwebGrey.png" />
    <img class="card-value" src="https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/${type}.png" />
  `;

  card.appendChild(cardBack);
  card.appendChild(cardFront);

  return card;
}

function generateCards() {
  const container = document.querySelector(".game-container");

  // 既存のカードを削除
  container.innerHTML = "";

  CARD_TYPES.forEach((type) => {
    // 各カードを2枚ずつ生成
    for (let i = 0; i < 2; i++) {
      const card = createCard(type);
      container.appendChild(card);
    }
  });
}

// ページ読み込み時にカードを生成
document.addEventListener("DOMContentLoaded", generateCards);
