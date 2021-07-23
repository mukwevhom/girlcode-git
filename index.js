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

let squares = document.querySelectorAll(".square");
let selectedSquare = {
    x: [],
    o: []
}
let stopGame = false
let scores = {
    player: 0,
    computer: 0
}

squares.forEach((square, i) => {
    square.addEventListener('click', e => {
        let isPicked = e.currentTarget.classList.contains('x') || e.currentTarget.classList.contains('o')
        
        if(!isPicked && !stopGame) {
            e.currentTarget.classList.add('x')
            selectedSquare.x.push(i)
            checkScore()
            computerTurn()
        }
        
    })
})

function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function computerTurn () {
    let randomSquareNumber = Math.floor(Math.random() * 9)
    let isPicked = selectedSquare.x.includes(randomSquareNumber) || selectedSquare.o.includes(randomSquareNumber)

    if(selectedSquare.x.length + selectedSquare.o.length === 9 ) {
        stopGame = true
        alert("It's a draw")
        return
    }
        

    if(stopGame) {
        return
    }

    if(!isPicked) {
        await sleep(1000)
        squares[randomSquareNumber].classList.add('o')
        selectedSquare.o.push(randomSquareNumber)
        checkScore()
    } else {
        computerTurn()
    }
    
}

async function checkScore () {
    let winner = ""
    if(selectedSquare.x.length >= 3) {
        let won = winningCombinations.some(winningCombination => winningCombination.every(e => selectedSquare.x.includes(e)))

        if(won) {
            winner = 'Player'
            scores.player++
            stopGame = true
        }
    }
    if(selectedSquare.o.length >= 3) {
        let won = winningCombinations.some(winningCombination => winningCombination.every(e => selectedSquare.o.includes(e)))

        if(won) {
            winner = 'Computer'
            scores.computer++
            stopGame = true
        }
    }

    if(stopGame) {
        await sleep(1000)
        alert(`${winner} Won`)
        document.getElementById('player-score').innerHTML = scores.player
        document.getElementById('computer-score').innerHTML = scores.computer
    }
}

document.getElementById("restart-game").addEventListener('click', e => {
    squares.forEach(square => {
        square.classList.remove("o", "x")
    })
    selectedSquare = {
        x: [],
        o: []
    }
    stopGame = false
})