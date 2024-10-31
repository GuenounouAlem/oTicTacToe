
// Player Object //

function createPlayer(name, symbol, turn = true) {

    function toggleTurn() {
        this.turn = !this.turn
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



// ------- Display ------- //


function createDisplay() {
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
                alert(player.name + ' WINS');
                round = maxRound
                return true;
              }
            }
            return false;
          }
    
        function playRound(ix, iy) {
            if (round === maxRound) {
                alert("DRAW")
                return
            }
            if (players[0].turn === true) {
                
                gameBoard.drawMark(ix, iy, players[0].symbol)
                round++
                checkWinner(players[0], gameBoard)
                players[0].toggleTurn()
                players[1].toggleTurn()
            } else {
                console.log(players[1].name + players[1].symbol + players[1].turn);
                gameBoard.drawMark(ix, iy, players[1].symbol)
                round++
                checkWinner(players[1], gameBoard)
                players[1].toggleTurn()
                players[0].toggleTurn()
            }
    
            gameBoard.getBoard().forEach(row => {
                console.log(row);       
        })
        }
    
        return { checkWinner, playRound, gameBoard}
    }
    const newGame = createGame()
    const idArray = ['00', '01', '02', '10', '11', '12', '20', '21', '22']

    idArray.forEach(id => {
        const box = document.getElementById(id)
        box.innerHTML = ''
    })
    
    idArray.forEach(id => {
        document.getElementById(id).addEventListener('click', () => {
            const x = id[0]
            const y = id[1]
            newGame.playRound(x, y)
            let box = document.getElementById(id)
            box.innerHTML = newGame.gameBoard.getCase(x, y)
        })
    })
}
























// ------------------------------------ TesTing ------------------------------- //

// let newGame = createGame()

// while (true) {
//     let x = prompt('x position ?')
//     let y = prompt('y position ?')
//     newGame.playRound(Number(x), Number(y))
// }

const startButton = document.querySelector('button')
startButton.addEventListener('click', () => {
    createDisplay()
})


