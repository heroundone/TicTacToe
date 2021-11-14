const gameBoard = (() => {
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
        addGrid
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
        theGameBoard.forEach((index) => index.addEventListener('click', () => {
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
            if(tracker >= 7) {
                let check = checkForWinner(theGameBoard);
                if(check != false) {
                    let winner = document.getElementById('winner');
                    winner.textContent = check;
                }
            }
        }))
    };

    const checkForWinner = (theGameBoard) => {
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
        return false;
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


    return {
        addClickToMark
    };
})();

gameBoard.addGrid();
displayController.addClickToMark();

