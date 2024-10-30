function createPlayer(name, symbol) {
    return { name, symbol }
}

function createBoard() {
    const boardArray = [null, null, null,
                        null, null, null,
                        null, null, null
    ]
    function drawMark(index, symbol) {
        if (boardArray[index] !== null) {
            console.log('Impossible')
            return
        }
        boardArray[index] = symbol
    }
    function printBoard(){
        console.log(boardArray)
    }
    function getCase(index){
        return boardArray[index]
    }
    return {drawMark, printBoard, getCase}
}


























// ------------------------------------ TesTing ------------------------------- //

const playerX = createPlayer('player x', 'x')
const playerO = createPlayer('player o', 'o')

console.log(playerO, playerX)

const board = createBoard()

console.log(board);

board.printBoard()

board.drawMark(2, playerO.symbol)

board.printBoard()

console.log(board.getCase(1));



