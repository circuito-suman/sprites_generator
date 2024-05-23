// script.js

const matrix = document.getElementById('matrix');
let buttons = [];

// Function to generate the matrix
function generateMatrix() {
    matrix.innerHTML = '';
    buttons = [];
    const rows = document.getElementById('rows').value;
    const columns = document.getElementById('columns').value;

    // To create the grid of buttons
    for (let r = 0; r < rows; r++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let c = 0; c < columns; c++) {
            const button = document.createElement('button');
            button.classList.add('led-button');
            button.addEventListener('click', () => toggleLed(button, r, c));
            row.appendChild(button);
            buttons.push(button);
        }
        matrix.appendChild(row);
    }
    updateByteOutput();
}

// Function to toggle the LED state
function toggleLed(button, row, col) {
    button.classList.toggle('on');
    updateByteOutput();
}

// Function to update the byte output
function updateByteOutput() {
    const rows = document.getElementById('rows').value;
    const columns = document.getElementById('columns').value;
    const binaryOutput = document.getElementById('outputFormat').checked;
    const wholeRowOutput = document.getElementById('wholeRowOutput').checked;
    const brightness = document.getElementById('brightness').value;

    let byteOutput = '';
    let matrixData = [];
    let brightnessBits = Math.min(Math.max(Math.floor(brightness / 4), 0), 63); // Scale brightness to 0-63

    if (wholeRowOutput) {
        // Generate as a whole row bits
        for (let r = 0; r < rows; r++) {
            let rowBits = 0;
            for (let c = 0; c < columns; c++) {
                const index = r * columns + c;
                if (buttons[index].classList.contains('on')) {
                    rowBits |= (1 << c);
                }
            }
            matrixData.push(rowBits);
        }

        if (binaryOutput) {
            matrixData.forEach(row => {
                byteOutput += row.toString(2).padStart(8, '0') + ' ';
            });
            byteOutput += brightnessBits.toString(2).padStart(6, '0');
        } else {
            matrixData.forEach(row => {
                byteOutput += row.toString(16).padStart(2, '0');
            });
            byteOutput += brightnessBits.toString(16).padStart(2, '0');
        }
    } else {
        // Generate individual row data
        for (let r = 0; r < rows; r++) {
            let byte = 0;
            for (let c = 0; c < columns; c++) {
                const index = r * columns + c;
                if (buttons[index].classList.contains('on')) {
                    byte |= (1 << c);
                }
            }
            if (binaryOutput) {
                byteOutput += '0b' + byte.toString(2).padStart(8, '0').split('').reverse().join('') + ', ';
            } else {
                byteOutput += '0x' + byte.toString(16).padStart(2, '0') + ', ';
            }
        }
    }

    document.getElementById('byteOutput').value = byteOutput;
}

// Start matrix generation
generateMatrix();
