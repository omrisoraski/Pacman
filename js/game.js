'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍭'
const CHERRY = '🍒'


// Model
var gGame
var gBoard
var gCherryInterval


function onInit() {

    gGame = {
        score: 0,
        isOn: true,
        isVictory: false,
        foodCount: 0
    }


    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')



    gCherryInterval = setInterval(addCherry, 5000)
    closeModal()

    // moveGhosts()
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }
    createPowerFood(board)
    return board
}

function createPowerFood(board) {
    board[1][1] = POWER_FOOD
    board[1][board[0].length - 2] = POWER_FOOD
    board[board.length - 2][1] = POWER_FOOD
    board[board.length - 2][board[0].length - 2] = POWER_FOOD
    gGame.foodCount -= 4
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // DONE: update model and dom
    // if (!diff) {
    //     gGame.score = 0
    // } else {
    //     gGame.score += diff
    // }
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')


    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    const msg = gGame.isVictory ? 'You Won🏆' : 'Game Over😎'
    openModal(msg)

}



function addCherry() {
    const emptyLocation = getEmptyLocation(gBoard)
    if (!emptyLocation) return
    gBoard[emptyLocation.i][emptyLocation.j] = CHERRY
    renderCell(emptyLocation, CHERRY)
}

function getEmptyLocation(board) {
    const emptyLocations = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyLocations.push({ i, j })
            }
        }
    }
    if (!emptyLocations.length) return null
    const randIdx = getRandomIntInclusive(0, emptyLocations.length - 1)
    return emptyLocations[randIdx]
}

function checkVictory() {
    if (gGame.foodCount === 0) {
        gGame.isVictory = true
        gameOver()
    }
}

function openModal(msg) {
    const elModal = document.querySelector('.modal')
    const elSpan = elModal.querySelector('.msg')
    elSpan.innerText = msg
    elModal.style.display = 'block'
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function playSound() {
    const sound = new Audio('sound/pacf.mp3')
    sound.play()
}

function playCandySound() {
    const sound = new Audio('sound/candy.mp3')
    sound.play()
}

function playCherrySound() {
    const sound = new Audio('sound/cherry.mp3')
    sound.play()
}

function playGhostSound() {
    const sound = new Audio('sound/ghost.mp3')
    sound.play()
}