/* logica del juego tateti*/
const board = document.getElementById('board'); /*estoy seleccionando el tablero */
const cells = document.querySelectorAll('[data-cell]'); /*selecciona todas las celdas */
const restartButton = document.getElementById('restartButton'); /* selecciona boton de reinicio */
let currentPlayer = 'X'; /*controla jugador actual*/
let gameActive = true; /* juego activado */
/* They define what type of combinations in the cells can generate a victory 
/Estas son las combinaciones ganadoras winning combinations, definen que tipo de convinaciones en la celdas pueden hacer que se genere una victoria */
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/* controls the click of a cell. If it is marked or the game is over it does nothing.
/controla el clic de una celda. Si está marcado o se acaba el juego no hace nada. 
mark the cell of the current player/Marca la celda del jugador actual
*/
function handleClick(event) {
    const cell = event.target;
    if (cell.textContent !== '' || !gameActive) return;

    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} te gano :D!`);
        gameActive = false;
        return;
    } else if (isDraw()) {
        alert('Empatazo!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    gameActive = true;
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
