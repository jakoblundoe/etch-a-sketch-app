addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('#grid-container');

    for (let i = 1; i <= 256; i++) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('gridCell');
        gridContainer.appendChild(gridCell);
    }
})