addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('#grid-container');
    gridContainer.classList.add('gridContainer');

    for (let i = 1; i <= 256; i++) {
        const gridCell = document.createElement('div');
        gridCell.classlist = 'gridCell';
        gridContainer.appendChild(gridCell);
    }
})