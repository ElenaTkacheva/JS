// Inputs Ranges
const rangeTl = document.getElementById('tlr');
const rangeTr = document.getElementById('trr');
const rangeBl = document.getElementById('blr');
const rangeBr = document.getElementById('brr');

// Inputs Results
const resultTl = document.getElementById('result-tlr');
const resultTr = document.getElementById('result-trr');
const resultBl = document.getElementById('result-blr');
const resultBr = document.getElementById('result-brr');


const input = document.querySelectorAll('.input');
const cube = document.getElementById('cube');

const total = document.getElementById('totalResult');
const btn = document.getElementById('btn');


const changeRadius = () => {
    resultTl.innerHTML = rangeTl.value;
    resultTr.innerHTML = rangeTr.value;
    resultBl.innerHTML = rangeBl.value;
    resultBr.innerHTML = rangeBr.value;

    cube.style.borderRadius = rangeTl.value + 'px ' + rangeTr.value + 'px ' + rangeBr.value + 'px ' + rangeBl.value + 'px';
}

const totalResult = () => {
    total.innerHTML = rangeTl.value + ' ' + rangeTr.value + ' ' + rangeBr.value + ' ' + rangeBl.value + ';';
}

for(node of input) {
    node.addEventListener('input', changeRadius);
}

btn.addEventListener('click', totalResult);