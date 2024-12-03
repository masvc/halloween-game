// AudioController クラス
class AudioController {
  constructor() {
    this.initializeAudio();
  }

  initializeAudio() {
    this.bgMusic = null;
    this.flipSound = null;
    this.matchSound = null;
    this.victorySound = null;
    this.gameOverSound = null;
  }

  startMusic() {
    if (this.bgMusic) this.bgMusic.play();
  }

  stopMusic() {
    if (this.bgMusic) {
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
    }
  }

  flip() {
    if (this.flipSound) this.flipSound.play();
  }

  match() {
    if (this.matchSound) this.matchSound.play();
  }

  victory() {
    if (this.bgMusic) this.stopMusic();
    if (this.victorySound) this.victorySound.play();
  }

  gameOver() {
    if (this.bgMusic) this.stopMusic();
    if (this.gameOverSound) this.gameOverSound.play();
  }
}

// ゲームロジック
class MixOrMatch {
  constructor(totalTime, cards) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById("time-remaining");
    this.ticker = document.getElementById("flips");
    this.audioController = new AudioController();
  }

  startGame() {
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.cardToCheck = null;
    this.matchedCards = [];
    this.busy = true;
    setTimeout(() => {
      this.audioController.startMusic();
      this.shuffleCards(this.cardsArray);
      this.countdown = this.startCountdown();
      this.busy = false;
    }, 500);
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
  }

  startCountdown() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;
      if (this.timeRemaining === 0) this.gameOver();
    }, 1000);
  }

  gameOver() {
    clearInterval(this.countdown);
    this.audioController.gameOver();
    document.getElementById("game-over-text").classList.add("visible");
  }

  victory() {
    clearInterval(this.countdown);
    this.audioController.victory();
    document.getElementById("victory-text").classList.add("visible");
  }

  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove("visible");
      card.classList.remove("matched");
    });
  }

  flipCard(card) {
    if (this.canFlipCard(card)) {
      this.audioController.flip();
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
      card.classList.add("visible");

      if (this.cardToCheck) {
        this.checkForCardMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }

  checkForCardMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck))
      this.cardMatch(card, this.cardToCheck);
    else this.cardMismatch(card, this.cardToCheck);

    this.cardToCheck = null;
  }

  cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    card1.classList.add("matched");
    card2.classList.add("matched");
    this.audioController.match();
    if (this.matchedCards.length === this.cardsArray.length) this.victory();
  }

  cardMismatch(card1, card2) {
    this.busy = true;
    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
      this.busy = false;
    }, 1000);
  }

  shuffleCards(cardsArray) {
    for (let i = cardsArray.length - 1; i > 0; i--) {
      const randIndex = Math.floor(Math.random() * (i + 1));
      [cardsArray[i], cardsArray[randIndex]] = [
        cardsArray[randIndex],
        cardsArray[i],
      ];
    }
    cardsArray = cardsArray.map((card, index) => {
      card.style.order = index;
    });
  }

  getCardType(card) {
    return card.getElementsByClassName("card-value")[0].src;
  }

  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchedCards.includes(card) &&
      card !== this.cardToCheck
    );
  }
}

// ゲームの初期化
function initializeGame() {
  const overlays = Array.from(document.getElementsByClassName("overlay-text"));
  const cards = Array.from(document.getElementsByClassName("card"));
  const game = new MixOrMatch(100, cards);

  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      game.startGame();
    });
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      game.flipCard(card);
    });
  });
}
