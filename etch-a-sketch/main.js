var grids = 0;
let rainbowMode = false;

const rainbowBtn = document.querySelector('.rainbow-button');
rainbowBtn.addEventListener('click', rainbowToggle);

function rainbowToggle(e) {
    rainbowMode = !rainbowMode;
}
function create_grid(square) {
    const boxSize = 29;
    const containerSize = boxSize * square;
    const containerId = document.getElementById('container');
    containerId.style.width = `${containerSize}px`;
    containerId.style.height = `${containerSize}px`;
    let originalColors = {};
    var alpha = {};
    const container = document.getElementById('container');
    container.innerHTML = '';
    for (let i = 0; i <= square * square; i++) {
        let newDiv = document.createElement('div');
        newDiv.className = 'box';
        let colorRandomized = false;

        function handleMouseover() {
            if (rainbowMode) {
                if (!colorRandomized) {
                    // Randomize RGB values on the first hover
                    let randomColor = getRandomColor();
                    newDiv.style.backgroundColor = randomColor;
                    originalColors[i] = randomColor;
                    if (!alpha[i]) {
                        alpha[i] = 0.1;
                    }
                    colorRandomized = true;
                } else {
                    console.log("second time");
                    let { darkenedColor, al } = darkenColor(originalColors[i], alpha[i]);
                    alpha[i] = al;
                    newDiv.style.backgroundColor = darkenedColor;
                }
            } else {
                newDiv.style.backgroundColor = 'black';
            }
        }

        newDiv.addEventListener('mouseover', handleMouseover);
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
    return `rgb(${r},${g},${b}, 0.1)`;
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

function darkenColor(color, alph) {
    let [r, g, b] = color.match(/\d+/g);
    let al = alph + 0.1;
    let darkenedColor = `rgba(${r},${g},${b}, ${al})`;
    return {darkenedColor, al};
}
  
const restart_btn = document.querySelector('.restart-button');
restart_btn.addEventListener('click', restartGrid);

function restartGrid(e) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    create_grid(grids);
}


