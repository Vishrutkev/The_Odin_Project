var grids = 0;
let rainbowMode = false;

const rainbowBtn = document.querySelector('.rainbow-button');
rainbowBtn.addEventListener('click', rainbowToggle);

function rainbowToggle(e) {
    rainbowMode = !rainbowMode;
}
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
            let colorRandomized = false;
            newDiv.addEventListener('mouseover', () => {
                if(rainbowMode){
                    if (!colorRandomized) {
                        // Randomize RGB values on the first hover
                        let randomColor = getRandomColor();
                        newDiv.style.backgroundColor = randomColor;
                        colorRandomized = true; // Set the flag to true after randomizing once
                      }
                }else {
                    newDiv.style.backgroundColor = 'black';
                }
                
              });
            container.appendChild(newDiv);
          }
    const gridNumber = document.querySelector('.grid-number');
    gridNumber.textContent = ` (${square})`;
    grids = square;
}

create_grid(16);

function getRandomColor() {
    const randomRGB = () => Math.floor(Math.random() * 256);
    const r = randomRGB();
    const g = randomRGB();
    const b = randomRGB();
    return `rgb(${r},${g},${b})`;
  }

const button = document.querySelector('.button');
button.addEventListener('click', buttonClicked);

function buttonClicked(e) {
    let input = prompt('number of squares per side for the new grid (max 100): ');
    if(input <= 0) {
        alert('Please Enter a positive Num!')
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


