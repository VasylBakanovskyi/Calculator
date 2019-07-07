const output = document.querySelector('.btn-output');
const calcArea = document.querySelector('.calc-area');

function mathOperation() {
    calcArea.textContent = output.textContent;
    calcArea.removeAttribute('class');
    output.textContent = '';
};
function plus() {
    mathOperation();
    calcArea.classList.add('calc-area', 'plus');
};
function minus() {
    mathOperation();
    calcArea.classList.add('calc-area', 'minus');
};
function division() {
    mathOperation();
    calcArea.classList.add('calc-area', 'division');
};
function multiply() {
    mathOperation();
    calcArea.classList.add('calc-area', 'multiply');
};
function getSquare() {
    mathOperation();
    calcArea.classList.add('calc-area', 'getSquare');
};
function getSqrt() {
    mathOperation();
    calcArea.classList.add('calc-area', 'getSqrt');
};
function point() {
    let str = output.textContent.split('');
    str = str.some(function(point) {
        return point === '.'
    })
    if (str) {
        return;
    }
    if (output.textContent.length === 0) {
        output.textContent = '0.';
    } else {
        output.textContent += '.'
    }  
}
function equal() {
    switch(true) {
        case calcArea.classList.contains('plus'): output.textContent = +calcArea.textContent + +output.textContent;
        break;
        case calcArea.classList.contains('minus'): output.textContent = +calcArea.textContent - +output.textContent;
        break;
        case calcArea.classList.contains('division'): output.textContent = +calcArea.textContent / +output.textContent;
        break;
        case calcArea.classList.contains('multiply'): output.textContent = +calcArea.textContent * +output.textContent;
        break;
        case calcArea.classList.contains('getSquare'): output.textContent = Math.pow(+calcArea.textContent, +output.textContent);
        break;
        case calcArea.classList.contains('getSqrt'): output.textContent = (calcArea.textContent < 0) ? '0' : Math.pow(+calcArea.textContent, 1/+output.textContent);
        break;
    }
    calcArea.textContent = ''
}

document.querySelector('.calculator')
    .addEventListener('click', e => {
        const el = e.target;
        if (el.classList.contains('btn')) {
            el.classList.add('clicked')
            setTimeout(function() {
                el.classList.remove('clicked')
            }, 300)
        }
    });

document.querySelectorAll('.btn-number')
    .forEach(function(num) {
        num.addEventListener('click', function() {
            if (this.classList.contains('btn-zero') && output.textContent.length === 0) {
                return;
            }
            if (output.textContent.length === 1 && output.textContent[0] === '0') {
                output.textContent.slice(1);
            }
            if (output.textContent.length === 13) {
                return;
            }
            output.textContent += this.textContent;
        })
    });

document.querySelector('.btn-point')
    .addEventListener('click', point);

document.querySelector('.btn-clear')
    .addEventListener('click', function() {
        output.textContent = '';
        calcArea.textContent = '';
    });

document.querySelector('.btn-plus')
    .addEventListener('click', plus);

document.querySelector('.btn-minus')
    .addEventListener('click', minus);

document.querySelector('.btn-division')
    .addEventListener('click', division);

document.querySelector('.btn-multiply')
    .addEventListener('click', multiply);

document.querySelector('.btn-square')
    .addEventListener('click', getSquare);

document.querySelector('.btn-sqrt')
    .addEventListener('click', getSqrt);

document.querySelector('.btn-equal')
    .addEventListener('click', equal);
    
document.addEventListener('keypress', function(e) {
    const arrOperationBtns = [47, 42, 45, 43, 13, 46];
    const arrCalculatorBtns = [48, 46, 13, 49, 50, 51, 52, 53, 54, 43, 55, 56, 57, 47, 42, 45];
    const el = e.charCode;

    function checkCharCode(arr) {
        return arr.some(function(item) {
            return el === item;
        }) 
    }
    if(!checkCharCode(arrCalculatorBtns)) {
        return;
    }
    if(!checkCharCode(arrOperationBtns)) {
        output.textContent += String.fromCharCode(el);
    }
    if (el == '48' && output.textContent.length === 1) {
        output.textContent = output.textContent.slice(1);
    }
    switch(true) {
        case el === 43: plus();
        break;
        case el === 45: minus();
        break;
        case el === 42: multiply();
        break;
        case el === 47: division();
        break;
        case el === 46: point();
        break;
        case el === 13: equal();
        break;
    }
    const data = document.querySelector(`.btn[data="${el}"]`);
    console.log(data)
    data.classList.add('clicked');
    setTimeout(function() {
        data.classList.remove('clicked')
    }, 300);
})