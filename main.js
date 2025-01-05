let cellNumber = 256;

addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('#grid-container');
    const resetBtn = document.querySelector('#generate-grid-btn');

    resetBtn.addEventListener('click', () => {
        let gridDensity = window.prompt("Specify grid density by entering number of squares per row:")
        if (gridDensity <= 0 || gridDensity === null || gridDensity > 100) {
            cellNumber = 256;
            gridContainer.replaceChildren();
            generateNewGrid(Math.sqrt(cellNumber));
        } else {
            cellNumber = calcCellAmount(gridDensity);
            gridContainer.replaceChildren();
            generateNewGrid(Math.sqrt(cellNumber));
        }
    })

    generateNewGrid(Math.sqrt(cellNumber));

    function generateNewGrid(rowSize) {
        console.log(rowSize);


        // GRID CREATION
        for (let i = 1; i <= cellNumber; i++) {
            const gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            gridCell.setAttribute(`cell-id`, String(i));
            gridCell.style.width = `calc(${calcCellWidth(rowSize)}% - 2px)`;
            gridContainer.appendChild(gridCell);
        }

        //HOVER FEATURE
        for (let i = 1; i <= cellNumber; i++) {
            const cellID = document.querySelector(`[cell-id="${i}"]`);
            cellID.addEventListener('mouseover', () => {
                if (cellID.classList.contains('transition-out')) {
                    cellID.classList.replace('transition-out', 'transition-in');
                } else {
                    cellID.classList.add('transition-in');
                }
                cellID.classList.add('pixel-hover');
            })
            cellID.addEventListener('mouseout', () => {
                cellID.classList.replace('transition-in', 'transition-out');
                cellID.classList.remove('pixel-hover');
            })
        }
    }
})


function calcCellAmount (input) {
    return input*input;
}

function calcCellWidth (input) {
    return 100/input;
}