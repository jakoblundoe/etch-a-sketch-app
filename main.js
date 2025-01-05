let cellNumber = 4096;

addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('#grid-container');
    const resetBtn = document.querySelector('#generate-grid-btn');

    resetBtn.addEventListener('click', () => {
        let gridDensity = window.prompt("Specify grid density by entering number of squares per row:")
        cellNumber = calcCellAmount(gridDensity);
        console.log(cellNumber);
        gridContainer.replaceChildren();
        generateNewGrid();
    })

    generateNewGrid()

    function generateNewGrid() {
        for (let i = 1; i <= cellNumber; i++) {
            const gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            gridCell.setAttribute(`cell-id`, String(i));
            gridContainer.appendChild(gridCell);
        }

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