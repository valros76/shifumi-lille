window.addEventListener("DOMContentLoaded", () => {

  const boardGamePlay = document.querySelector("#boardGamePlay");

  let gameStart = false;
  let gameEnd = false;
  const signs = ["✊", "✋", "✌️"];


  const createSignElement = (sign, type) => {
    const action = document.createElement("i");
    action.className = `signs ${type}-sign`;
    action.dataset.sign = sign === "✊" ? "pierre" : sign === "✋" ? "feuille" : sign === "✌️" ? "ciseaux" : "inconnu";
    action.textContent = sign;
    return action;
  }

  const generateRandomAction = () => signs[Math.floor(Math.random() * signs.length)];

  const verifyGame = () => {
    const playerSign = document.querySelector(".player-sign").textContent;
    const iaSign = document.querySelector(".ia-sign").textContent;

    if (playerSign === iaSign) return null;

    if (
      (playerSign === "✊" && iaSign === "✌️")
      || (playerSign === "✌️" && iaSign === "✋")
      || (playerSign === "✋" && iaSign === "✊")
    ) {
      return true;
    }

    return false;
  };

  const setResultModal = (resultText, headTitle) => {
    const resultModal = document.createElement("div");
    resultModal.id = "resultModal";
    resultModal.className = "result-modal result-show";

    const resultParagraph = document.createElement("p");
    resultParagraph.className = "result";
    resultParagraph.textContent = resultText;

    const reloadButton = document.createElement("button");
    reloadButton.id = "reloadGame";
    reloadButton.textContent = "Rejouer ?";

    resultModal.append(resultParagraph, reloadButton);
    boardGamePlay.appendChild(resultModal);

    const mainHeadTitle = document.querySelector(".main-head-title");
    mainHeadTitle.textContent = headTitle;

    reloadButton.addEventListener("click", () => {
      gameEnd = false;
      mainHeadTitle.textContent = "Pierre - Feuille - Ciseaux";
      resultModal.remove();
      document.querySelector("#launchGameModal").classList.add("launch-game-show");
    });
  }

  const endGame = (playerWon) => {
    gameStart = false;
    gameEnd = true;

    switch (playerWon) {
      case true:
        setResultModal("🎯 Victoire 🎯", "🎉🎉🎉");
        break;
      case false:
        setResultModal("💀 Défaite 💀", "☠️☠️☠️");
        break;
      default:
        setResultModal("✖️ Match nul ✖️", "❌❌❌");
        break;
    }
  }

  const createComputerElements = () => {
    const iaSigns = document.createElement("div");
    iaSigns.className = "ia-signs";

    const description = document.createElement("p");
    description.className = "ia-signs-description";
    description.textContent = "Action de l'ordinateur";

    const action = createSignElement(generateRandomAction(), "ia");
    description.textContent = action.dataset.sign;

    iaSigns.append(description, action);
    boardGamePlay.appendChild(iaSigns);

    const mainHeadTitle = document.querySelector(".main-head-title");
    let countdownInit = 3;
    const countdown = setInterval(() => {
      mainHeadTitle.textContent = countdownInit;
      countdownInit--;
    }, 1000);

    setTimeout(() => {
      clearInterval(countdown);
      mainHeadTitle.textContent = "0";
      endGame(verifyGame());
    }, 4000);
  }

  const createPlayerElements = () => {
    const playerSigns = document.createElement("div");
    playerSigns.className = "player-signs";

    const description = document.createElement("p");
    description.className = "player-signs-description";
    description.textContent = "Choisir votre action";

    playerSigns.appendChild(description);
    boardGamePlay.appendChild(playerSigns);

    signs.forEach(sign => {
      const action = createSignElement(sign, "player");
      playerSigns.appendChild(action);

      action.addEventListener("click", e => {
        e.preventDefault();
        description.textContent = e.target.dataset.sign;
        description.classList.add("freeze");

        document.querySelectorAll(".player-sign").forEach(action => {
          if (action != e.target) action.remove();
          action.style.pointerEvent = "none";
        });

        if (!document.querySelector(".ia-sign")) {
          createComputerElements();
        }
      });

      action.addEventListener("mouseover", () => {
        if (!description.classList.contains("freeze")) {
          description.textContent = action.dataset.sign;
        }
      });

      action.addEventListener("mouseleave", () => {
        if (!description.classList.contains("freeze")) {
          description.textContent = "Choisir votre action";
        }
      });

    });
  }

  const cleanBoardGamePlay = () => {
    boardGamePlay.innerHTML = "";
  }

  document.querySelector("#loadGame").addEventListener("click", e => {
    e.preventDefault();

    if (!gameStart) {
      document.querySelector("#launchGameModal").classList.remove("launch-game-show");
      cleanBoardGamePlay();
      createPlayerElements();
    }

    gameStart = !gameStart;

  });

});