
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
            return 1
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

        const playerxWins = document.getElementById('player1-wins')
        const playeroWins = document.getElementById('player2-wins')
        const draw = document.getElementById('draw')

    
    
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
                if (player.symbol === 'x') {
                    playerxWins.textContent = Number(playerxWins.textContent) + 1
                } else {
                    playeroWins.textContent = Number(playeroWins.textContent) + 1
                }
                return true;
              }
            }
            return false;
          }

        function checkDraw() {
            if (round === maxRound) {
                draw.textContent = Number(draw.textContent) + 1
                return
            }
        }
    
        function playRound(ix, iy) {
            checkDraw()
            if (players[0].turn === true) {
                if (gameBoard.drawMark(ix, iy, players[0].symbol) === 1) {
                    return
                }
                round++
                if (checkWinner(players[0], gameBoard) === true) {
                    return
                }
                checkDraw()
                players[0].toggleTurn()
                players[1].toggleTurn()
            } else {
                console.log(players[1].name + players[1].symbol + players[1].turn);
                if (gameBoard.drawMark(ix, iy, players[1].symbol) === 1) {
                    return
                }
                round++
                if (checkWinner(players[1], gameBoard) === true) {
                    return
                }
                players[1].toggleTurn()
                players[0].toggleTurn()
                checkDraw()
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
        // Remove old event listeners to prevent duplicates
        const newBox = box.cloneNode(true)
        box.parentNode.replaceChild(newBox, box)
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

const startButton = document.querySelector('#newGame')
startButton.addEventListener('click', () => {
    createDisplay()
})

const resetButton = document.querySelector('#reset')
resetButton.addEventListener('click', () => {
    location.reload()
})

// create new game when a win or a draw is registred

const infoElem = document.querySelector('.info-container');
const observer = new MutationObserver((mutations) => {
  console.log('Mutations detected:', mutations);
  mutations.forEach((mutation) => {
    console.log('Mutation type:', mutation.type);
    if (mutation.type === 'childList' || mutation.type === 'characterData') {
      console.log('Calling createDisplay...');
      createDisplay();
    }
  });
});

observer.observe(infoElem, {
  childList: true,
  characterData: true,
  subtree: true
});


