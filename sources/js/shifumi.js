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
      });
    });
  }

  const cleanBoardGamePlay = () => {
    boardGamePlay.innerHTML = "";
  }

  document.querySelector("#loadGame").addEventListener("click", e => {
    e.preventDefault();

    if(!gameStart){
      document.querySelector("#launchGameModal").classList.remove("launch-game-show");
      cleanBoardGamePlay();
      createPlayerElements();
    }

    gameStart = !gameStart;

  });
  
});