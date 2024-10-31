
// Player Object //

function createPlayer(name, symbol, turn = true) {

    function toggleTurn() {
        turn = !turn
    }
    return { name, symbol, turn, toggleTurn }
}



// Game Board Object //

function createBoard() {
    const boardArray = [[null, null, null],
                        [null, null, null],
                        [null, null, null]
    ]
    function drawMark(ix, iy, symbol) {
        if (boardArray[iy][ix] !== null) {
            console.log('Impossible')
            return
        }
        boardArray[iy][ix] = symbol
    }
    function getCase(ix ,iy){
        return boardArray[iy][ix]
    }
    function getBoard() {
        return boardArray
    }
    return {drawMark, getBoard, getCase}
}

// Game Object //

function createGame() {

    let round = 0
    const maxRound = 9
    const gameBoard = createBoard()
    const players = [createPlayer('playerX', 'x'), createPlayer('playerO', 'o', false)]


    function checkWinner(player, gameBoard) {
        const winningCombinations = [
          // rows
          [[0, 0], [0, 1], [0, 2]],
          [[1, 0], [1, 1], [1, 2]],
          [[2, 0], [2, 1], [2, 2]],
          // columns
          [[0, 0], [1, 0], [2, 0]],
          [[0, 1], [1, 1], [2, 1]],
          [[0, 2], [1, 2], [2, 2]],
          // diagonals
          [[0, 0], [1, 1], [2, 2]],
          [[0, 2], [1, 1], [2, 0]],
        ];
      
        for (const combination of winningCombinations) {
          if (combination.every(([x, y]) => gameBoard.getCase(x, y) === player.symbol)) {
            console.log(player.name + ' WINS');
            round = maxRound
            return true;
          }
        }
        return false;
      }

    function playRound(ix, iy) {

        console.log(gameBoard.getBoard());
        

        if (round > maxRound) {
            console.log('game ended')
            return
        }
        if (players[0].turn) {
            gameBoard.drawMark(ix, iy, players[0].symbol)
            round++
            checkWinner(players[0], gameBoard)
            players[0].toggleTurn()
            players[1].toggleTurn()
        } else {
            gameBoard.drawMark(ix, iy, players[1].symbol)
            round++
            checkWinner(players[1], gameBoard)
            players[1].toggleTurn()
            players[0].toggleTurn()
        }
    }

    return { checkWinner, playRound}
}


























// ------------------------------------ TesTing ------------------------------- //

let newGame = createGame()

while (true) {
    let x = prompt('x position ?')
    let y = prompt('y position ?')
    newGame.playRound(Number(x), Number(y))
}



