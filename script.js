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
            boardSpotsClone.textContent = 'X'
            theGameBoard.push(boardSpotsClone);
        };

        // return the array
        return theGameBoard;
    };
    
    const addGrid = () => {
        // create and retrieve array and create container to append to
        theGameBoard = createGameBoard();
        const container = document.getElementById('gameboard');
        /*let marker = document.createElement('div');
        marker.classList.add('marker');
        marker.textContent = 'XO';*/
        
        // append
        for(let i = 0; i < theGameBoard.length; i++) {
            //markerClone = marker.cloneNode();
            //theGameBoard[i].appendChild(markerClone);
            container.appendChild(theGameBoard[i]);
        }
    }

    return {
        addGrid
        };
})();

gameBoard.addGrid();