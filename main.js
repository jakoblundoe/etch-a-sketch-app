let cellNumber = 256;

addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('#grid-container');
    const resetBtn = document.querySelector('#generate-grid-btn');
    let mouseBtnPressed = false;

    window.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
            console.log('mousebutton pressed');
            mouseBtnPressed = true;
        }
        e.preventDefault();
    })
    window.addEventListener('mouseup', (e) => {
        if (e.button === 0) {
            console.log('mousebutton released');
            mouseBtnPressed = false;
        }
    })

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
            let brightnessValue = 100;
            let brightnessInitFlag = false;
            let timeoutID;

            cellID.addEventListener('mouseover', () => {
                if (mouseBtnPressed) {
                    if (cellID.classList.contains('transition-out')) {
                        cellID.classList.replace('transition-out', 'transition-in');
                    } else {
                        cellID.classList.add('transition-in');
                    }
                    cellID.style['background-color'] = colorCode;
                    if (!brightnessInitFlag) {
                        cellID.style['opacity'] = brightnessValue;
                        brightnessInitFlag = true;
                    } else {
                        if (brightnessValue > 12) {
                            brightnessValue = brightnessValue - 8;
                            cellID.style['filter'] = `brightness(${brightnessValue}%)`;
                        }
                    }
                    if (timeoutID) {
                        clearTimeout(timeoutID);
                    }
                }
            })
            cellID.addEventListener('mouseout', () => {
                cellID.classList.replace('transition-in', 'transition-out');
                cellID.style.removeProperty('background-color');
                cellID.style.removeProperty('filter');

                timeoutID = setTimeout(function () {
                    console.log('timeoutID', timeoutID);
                    brightnessValue = 100;
                    console.log('reset-brightness');
                }, 20000);
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