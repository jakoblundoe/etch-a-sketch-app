addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('#grid-container');

    for (let i = 1; i <= 256; i++) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridCell.setAttribute(`cell-id`, String(i));
        gridContainer.appendChild(gridCell);
    }

    for (let i = 1; i <= 256; i++) {
        const cellID = document.querySelector(`[cell-id="${i}"]`);
        console.log(cellID);
        cellID.addEventListener('mouseover', () => {
            cellID.classList.add('pixel-hover');
        })
        cellID.addEventListener('mouseout', () => {
            cellID.classList.remove('pixel-hover');
        })
    }
})