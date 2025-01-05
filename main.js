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
})