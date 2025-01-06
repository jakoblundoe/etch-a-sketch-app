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
    generateColor();

    function generateNewGrid(rowSize) {

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
            const colorCode = generateColor();
            let opacityValue = 100;
            let opacityInitFlag = false;

            cellID.addEventListener('mouseover', () => {
                if (cellID.classList.contains('transition-out')) {
                    cellID.classList.replace('transition-out', 'transition-in');
                } else {
                    cellID.classList.add('transition-in');
                }
                cellID.style['background-color'] = colorCode;
                if (!opacityInitFlag) {
                    cellID.style['opacity'] = opacityValue;
                    opacityInitFlag = true;
                } else {
                    if (opacityValue > 0) {
                        opacityValue = opacityValue - 10;
                        cellID.style['filter'] = `brightness(${opacityValue}%)`;
                    }
                }
            })
            cellID.addEventListener('mouseout', () => {
                cellID.classList.replace('transition-in', 'transition-out');
                cellID.style.removeProperty('background-color');
                cellID.style.removeProperty('filter');
            })
        }
    }
})

// GENERATOR COLOR FROM PREDEFINED COLOR PALETTE
function generateColor () {
    const colorPalette = [
        '#B5C4DE',
        '#E2E6E6',
        '#CACFD2',
        '#A9B4C0'
    ]
    return colorPalette[randomInt(colorPalette.length, 0)];
}

function calcCellAmount (input) {
    return input*input;
}

function calcCellWidth (input) {
    return 100/input;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}