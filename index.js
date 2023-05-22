const pieces = document.querySelector(".pieces");
const puzzle = document.querySelector(".puzzle");
const reset = document.querySelector(".reset");
const endgame = document.querySelector(".endgame");

const pink = [
  "#ffe5ec-0",
  "#ffc2d1-1",
  "#ffb3c6-2",
  "#ff8fab-3",
  "#fb6f92-4",
  "#b9375e-5",
  "#8a2846-6",
  "#602437-7",
  "#522e38-8",
];

let piecesLeft = pink.length;

reset.addEventListener("click", (e) => {
  e.preventDefault();
  location.reload();
});

function createPieces(colors) {
  // shuffle colors array
  const mixedColors = colors.sort(() => Math.random() - 0.5);

  mixedColors.forEach((color) => {
    const piece = document.createElement("div");
    // get hex from colors array
    const bgColor = color.split("-")[0];
    // get id from colors array
    const id = color.split("-")[1];

    piece.setAttribute("draggable", true);
    piece.setAttribute("class", "piece");
    piece.setAttribute("id", id);
    piece.style.backgroundColor = bgColor;
    pieces.appendChild(piece);
  });
}
createPieces(pink);

function createPlaces(colors) {
  const totalSpaces = colors.length;

  for (let i = 0; i < totalSpaces; i++) {
    const place = document.createElement("div");
    place.setAttribute("class", "place");
    place.dataset.id = i;
    puzzle.appendChild(place);
  }
}
createPlaces(pink);

// Pieces handlers
function dragstartHandler(e) {
  e.dataTransfer.setData("id", e.target.id);
}
function dragHandler() {}
function dragEndHandler() {}

// Puzzle handlers
function dragenterHandler() {}
function dragleaveHandler(e) {
  e.target.classList.remove("hover");
}
function dragoverHandler(e) {
  e.preventDefault();
  e.target.classList.add("hover");
}
function dropHandler(e) {
  e.target.classList.remove("hover");

  const id = e.dataTransfer.getData("id");
  const boxIndex = e.target.dataset.id;
  console.log(id, boxIndex);

  if (id === boxIndex) {
    e.target.appendChild(document.getElementById(id));

    piecesLeft--;

    if (piecesLeft === 0) {
      endgame.classList.remove("endgame");
      endgame.classList.add("won");
    }
  }
}

pieces.addEventListener("dragstart", dragstartHandler);
pieces.addEventListener("dragend", dragEndHandler);

puzzle.addEventListener("dragleave", dragleaveHandler);
puzzle.addEventListener("dragenter", dragenterHandler);
puzzle.addEventListener("dragover", dragoverHandler);
puzzle.addEventListener("drop", dropHandler);
