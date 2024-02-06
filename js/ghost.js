'use strict'

const GHOST = '👻'
var gGhosts = []
var gDeadGhosts = []


var gIntervalGhosts

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) return
        gameOver()
        return
    }


    // DONE: moving from current location:
    // DONE: update the model 
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)


    // DONE: Move the ghost to new location:
    // DONE: update the model 
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    const color = gPacman.isSuper ? 'blue' : ghost.color
    return `<span style="background-color:${color};">${GHOST}</span>`


}

function killGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currLocation = gGhosts[i].location
        if (currLocation.i === location.i && currLocation.j === location.j) {
            const deadGhost = gGhosts.splice(i, 1)[0]
            checkGhostCellContent(deadGhost)
            gDeadGhosts.push(deadGhost)
        }
    }
}
function checkGhostCellContent(ghost) {
    if (ghost.currCellContent === FOOD) {
        handleFood()
        ghost.currCellContent = EMPTY
    }
}

function reviveGhosts() {
    for (var i = 0; i < gDeadGhosts.length; i++) {
        const currGhost = gDeadGhosts[i]
        gGhosts.push(currGhost)
    }
    gDeadGhosts = []
}

function renderGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const currGhost = gGhosts[i]
        renderCell(currGhost.location, getGhostHTML(currGhost))
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
