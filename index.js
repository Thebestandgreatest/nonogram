var size = 10;
var vspace = 10;
var boxArray = [];

window.onload = function() {
    grid = document.getElementById('grid-holder')
    drawGrid(10,10);
}

require('electron').ipcRenderer.on('loadPuzzle', (event, message) => {
    console.log(message);
});

function resetGrid() {
    grid.innerHTML = '';
    drawGrid(10,10);
}

function loadPuzzle() {
    
}

function drawGrid(length,width) {
    for (x=0; x<width; x++) {
        var holderArray = [];
        for (y=0; y<length; y++) {
            var box = document.createElement('div');
            box.addEventListener('click', switchState());
            box.style.width = '10px';
            box.style.height = '10px';
            box.style.position = 'absolute';
            box.style.backgroundColor = 'gray';
            box.style.top = (x * 10) + 2 + 'px';
            box.style.left = (y * 10) + 2 + 'px';
            holderArray.push('0');
            grid.appendChild(box);
        }
        boxArray.push(holderArray);
    }
}

function switchState() {
    
}
