const gameBoard = (() => {
    const addSubmitEvent = () => {
        let names = document.querySelectorAll('.submit');
        let newNames = Array.from(names);
        newNames.forEach(index => index.addEventListener('click', (e) => {
            updateNames(e);
        if(Player1.updatedName != '' && Player2.updatedName != '') {
            gameBoard.addGrid();
            displayController.addClickToMark();
        }
        }))
    }
    
    function updateNames(event) {
        let name = event.target.previousElementSibling.value;
        let span = event.target.parentNode;
        let player = event.target.parentNode.previousElementSibling;
        let id = player.getAttribute('id');
        if(name != '') {
            if(id === 'player1') {
                Player1.updatedName = name;
                let updatedName = Player1.updatedName;               
                player.textContent = `${updatedName}` + "(X's)";
                span.style.display = 'none';
            }
            else {
                Player2.updatedName = name;
                let updatedName = Player2.updatedName;
                player.textContent = `${updatedName}` + "(O's)";
                span.style.display = 'none';
            }
        }  
        else{
            if(id === 'player1') {
                Player1.updatedName = 'Player 1';
                player.textContent = "Player 1" + "(X's)";
                span.style.display = 'none';
            }
            else {
                Player2.updatedName = 'Player 2';
                player.textContent = "Player 2" + "(O's)";
                span.style.display = 'none';
            }
        }
    }
    const createGameBoard = () => {
        // create the gameboard elements
        let theGameBoard = [];
        let sizeOfBoard = 9;
        let boardSpots = document.createElement('div');
        let boardSpotsWidth = Math.floor(100 / Math.sqrt(sizeOfBoard));
        boardSpots.classList.add('boardSpots');
        boardSpots.style.width = boardSpotsWidth + '%';
        boardSpots.style.height = boardSpotsWidth + '%';

        // create array to contain elements of gameBoard
        for (let i = 0; i < sizeOfBoard; i++) {
            let boardSpotsClone = boardSpots.cloneNode();
            theGameBoard.push(boardSpotsClone);
        };

        // create scorekeeper
        

        // return the array
        return theGameBoard;
    };
    
    const addGrid = () => {
        // create and retrieve array and create container to append to
        theGameBoard = createGameBoard();
        const container = document.getElementById('gameboard');
        
        // append
        theGameBoard.forEach((index) => container.appendChild(index));
    }

    return {
        addGrid,
        createGameBoard,
        addSubmitEvent
        };
})();

const displayController = (() => {
    // keeps track of which marker('x' or 'o') to use
    let tracker = 2;

    // check subarrays in 'checkForWinner' function against these two arrays
    let compareArray1 = [];
    let compareArray2 = [];
    for(let i = 0; i < 3; i++) {
        compareArray1.push('X');
        compareArray2.push('O');
    }
    let xCompareArray = compareArray1.join('');
    let yCompareArray = compareArray2.join('');

    // add event listener to each spot on the gameboard
    const addClickToMark = () => {
        let boardspots = document.querySelectorAll('.boardSpots');
        let theGameBoard = Array.from(boardspots);
        console.log(theGameBoard);
        theGameBoard.forEach(index => {
            index.addEventListener('click', () => {
                monitorGame(index, theGameBoard);
            }) 
        });
    };

    const monitorGame = (index, theGameBoard) => {
            // check if the spot has been marked, if not then go ahead and mark it
            if(index.textContent === '') {
                if((tracker % 2) === 0) {
                    index.textContent = 'X';
                    tracker ++;
                }
                else {
                    index.textContent = 'O';
                    tracker ++;
                };
            };
            // minimum 5 moves needed for there to be a winner, tracker will be at least 7
            if(tracker >= 7) {
                let check = checkForWinner(theGameBoard);
                if(check != false) {
                    let winner = document.getElementById('winner');
                    winner.style.fontSize = '20px';
                    if(check === 'X has won') {
                        let arrayCheck = check.split(' ');
                        let newArray = arrayCheck.slice(1)
                        newArray.unshift(Player1.updatedName);
                        let newCheck = newArray.join(' ');
                        winner.textContent = newCheck;
                        Player1.wins = Player1.updateWins();
                        console.log(Player1);
                    }
                    else if(check === 'O has won') {
                        let arrayCheck = check.split(' ');
                        let newArray = arrayCheck.slice(1);
                        newArray.unshift(Player2.updatedName);
                        let newCheck = newArray.join(' ');
                        winner.textContent = newCheck;
                        Player2.wins = Player2.updateWins();
                    }
                    else {
                        winner.textContent = check;
                    }

                    // delete gameboard
                    deleteGameBoard(theGameBoard);
                    
                    // create scorekeeper
                    scorekeeper = document.getElementById('scorekeeper');
                    let player1 = Player1.updatedName;
                    let player2 = Player2.updatedName;
                    scorekeeper.textContent = `(${Player1.updatedName}: ${Player1.wins})` + ' ' + `(${Player2.updatedName}: ${Player2.wins})`;

                    // add play again button, resets gameboard
                    let playAgainButton = document.createElement('button');
                    playAgainButton.style.marginLeft = '10px';
                    playAgainButton.textContent = 'Play Again';
                    playAgainButton.addEventListener('click', function() {
                        // reset tracker and game
                        tracker = 2;
                        resetGame();
                    });
                    winner.appendChild(playAgainButton);
                };
            };
    };

    const checkForWinner = (theGameBoard) => {
        // checks horizontally, vertically, and diagonally
        let check = [];
        let checkH = checkHorizontal(theGameBoard);
        check.push(checkH);
        let checkV = checkVertical(theGameBoard);
        check.push(checkV);
        let checkD = checkDiagonal(theGameBoard);
        check.push(checkD);
        for(let i = 0; i < check.length; i++) {
            if(check[i] != false) {
                return check[i];
            }
        }; 
        // check for tie
        if(tracker != 11) {
            return false;
        } 
        else {
            return 'TIE';
        }
    }

    function checkHorizontal(theGameBoard) {
        for(let i = 0; i < theGameBoard.length; i += 3) {
            let testArray = [];
            for(let j = i; j < i + 3; j++) {
                testArray.push(theGameBoard[j].textContent);
            }
            let concatTestArray = testArray.join('');
            console.log(concatTestArray);
            console.log(xCompareArray);
            console.log(yCompareArray);
            if(concatTestArray === xCompareArray) {
                return 'X has won';
            }
            else if(concatTestArray === yCompareArray) {
                return 'O has won';
            }
            else {
                testArray.length = 0;
                continue;
            }
        }
        return false;
    }

    function checkVertical(theGameBoard) {
        for(let i = 0; i < 3; i ++) {
            let testArray = [];
            for(let j = i; j < i + 7; j += 3) {
                testArray.push(theGameBoard[j].textContent);
            }
            let concatTestArray = testArray.join('');
            if(concatTestArray === xCompareArray) {
                return 'X has won';
            }
            else if(concatTestArray === yCompareArray) {
                return 'O has won';
            }
            else {
                testArray.length = 0;
                continue;
            }
        }
        return false;
    }

    function checkDiagonal(theGameBoard) {
        for(let i = 0; i < 3; i += 2) {
            let testArray = [];
            if(i === 0) {
                for(let j = i; j < theGameBoard.length; j += 4) {
                    testArray.push(theGameBoard[j].textContent);
                }
            }
            else {
                for(let j = i; j <= i + 4 ; j += 2) {
                    testArray.push(theGameBoard[j].textContent);
                }
            }
            let concatTestArray = testArray.join('');
            if(concatTestArray === xCompareArray) {
                return 'X has won';
            }
            else if(concatTestArray === yCompareArray) {
                return 'O has won';
            }
            else {
                testArray.length = 0;
                continue;
            }
        }
        return false;
    }
    function deleteGameBoard(theGameBoard) {
        theGameBoard.forEach(index => {
            index.remove();
        });
    };

    function resetGame() {
        // recreate the gameboard and add event listeners again
        gameBoard.addGrid();
        displayController.addClickToMark();
        
        // clear winner announcement
        let winner = document.querySelector('#winner');
        winner.textContent = '';
    }

    return {
        addClickToMark
    };
})();

const Player = (name) => {
    let updatedName = '';
    let wins = 0;
    const updateWins = () => {
        wins += 1;
        return wins;
    }

    return {updatedName, wins, updateWins};
}
const Player1 = Player('Player 1');
const Player2 = Player('Player 2');
gameBoard.addSubmitEvent();




