var grids = 0;
function create_grid(square) {
    const boxSize = 29; // Set the size of each box
    const containerSize = boxSize * square; // Calculate the size of the container based on the number of boxes
    const containerId = document.getElementById('container');
    containerId.style.width = `${containerSize}px`;
    containerId.style.height = `${containerSize}px`;
    const container = document.getElementById('container');
    container.innerHTML = '';
        for (var i = 0; i <= square * square; i++) {
            let newDiv = document.createElement('div');
            newDiv.className = 'box';
            newDiv.addEventListener('mouseover', () => {
                newDiv.classList.add('hovered'); // Toggle the 'hovered' class
            });
            container.appendChild(newDiv);
          }
    const gridNumber = document.querySelector('.grid-number');
    gridNumber.textContent = ` (${square})`;
    grids = square;
}

create_grid(16);

const button = document.querySelector('.button');
button.addEventListener('click', buttonClicked);

function buttonClicked(e) {
    let input = prompt('number of squares per side for the new grid (max 100): ');
    if(input <= 0) {
        alert('Cmon are you that dumb!')
        input = prompt('number of squares per side for the new grid (max 100): ');
    }
    create_grid(input || 16);
}

const restart_btn = document.querySelector('.restart-button');
restart_btn.addEventListener('click', restartGrid);

function restartGrid(e) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    create_grid(grids);
}


