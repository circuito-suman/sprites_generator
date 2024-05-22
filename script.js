const matrix = document.getElementById('matrix');
let buttons = [];

function generateMatrix() {
    matrix.innerHTML = ''; // Clear any existing matrix
    buttons = []; // Reset the buttons array
    const rows = document.getElementById('rows').value; // Get the number of rows from the input
    const columns = document.getElementById('columns').value; // Get the number of columns from the input
    matrix.style.gridTemplateRows = `repeat(${rows}, auto)`; 
    matrix.style.gridTemplateColumns = `repeat(${columns}, auto)`;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const button = document.createElement('button'); // Create a new button element
            button.classList.add('led-button'); // Add the 'led-button' class to the button
            button.addEventListener('click', () => toggleLed(button, r, c)); // Add an event listener for the 'click' event to toggle the LED state
            matrix.appendChild(button); // Append the button to the matrix container
            buttons.push(button); // Add the button to the buttons array
        }
    }
    updateByteOutput(); 
}

function toggleLed(button, row, col) {
    button.classList.toggle('on'); // Toggle the 'on' class for the button
    updateByteOutput(); // Update the byte output whenever a button is toggled
}

function reverseBits(byte) {
    let binaryString = byte.toString(2).padStart(8, '0'); // Convert byte to binary string and pad to 8 bits
    let reversedString = binaryString.split('').reverse().join(''); // Reverse the binary string
    return parseInt(reversedString, 2); // Convert the reversed binary string back to an integer
}

function updateByteOutput() {
    const rows = document.getElementById('rows').value; // Get the number of rows
    const columns = document.getElementById('columns').value; // Get the number of columns
    let byteOutput = ''; 
    const isBinaryOutput = document.getElementById('outputFormat').checked; // Check the state of the output format toggle

    for (let r = 0; r < rows; r++) {
        let byte = 0; 
        for (let c = 0; c < columns; c++) {
            const index = r * columns + c; // Calculate the index of the button in the buttons array
            if (buttons[index].classList.contains('on')) { 
                byte |= (1 << c); // Set the corresponding bit in the byte
            }
        }
        if (isBinaryOutput) {
            byte = reverseBits(byte); // Reverse the bits in the byte
            byteOutput += '0b' + byte.toString(2).padStart(8, '0') + ', '; // Append the binary byte to the output string
        } else {
            byteOutput += '0x' + byte.toString(16).padStart(2, '0') + ', '; // Append the hexadecimal byte to the output string
        }
    }

    document.getElementById('byteOutput').value = byteOutput.slice(0, -2); // Set the value of the byte output textarea, removing the trailing comma and space
}

//start the generation
generateMatrix();
