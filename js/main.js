var output = document.querySelector('.btn-output');
var calcArea = document.querySelector('.calc-area');

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
    var str = output.textContent.split('');
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
    .addEventListener('click', function(e) {
        if (e.target.classList.contains('btn')) {
            e.target.classList.add('clicked')
            setTimeout(function() {
                e.target.classList.remove('clicked')
            }, 300)
        }
    });

document.querySelectorAll('.btn-number')
    .forEach(function(num) {
        num.addEventListener('click', function() {
            if (this.classList.contains('btn-doubleZero') && output.textContent.length === 0) {
                return;
            }
            if (this.classList.contains('btn-zero') && output.textContent.length === 1) {
                return;
            }
            if (output.textContent.length === 1 && output.textContent[0] === '0') {
                output.textContent = output.textContent.slice(1);
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
    var arrCharCodeOperation = [47, 42, 45, 43, 13, 46];
    var arrCharCodeCalculate = [48, 46, 13, 49, 50, 51, 52, 53, 54, 43, 55, 56, 57, 47, 42, 45];
    
    function checkOperation(arr) {
        return arr.some(function(item) {
            return e.charCode === item;
        })
    }
    function checkCharCodeNumbers(arr) {
        return arr.some(function(item) {
            return e.charCode === item;
        }) 
    }
    if(!checkCharCodeNumbers(arrCharCodeCalculate)) {
        return;
    }
    if(!checkOperation(arrCharCodeOperation)) {
        output.textContent += String.fromCharCode(e.charCode);
    }
    switch(true) {
        case e.charCode === 43: plus();
        break;
        case e.charCode === 45: minus();
        break;
        case e.charCode === 42: multiply();
        break;
        case e.charCode === 47: division();
        break;
        case e.charCode === 46: point();
        break;
        case e.charCode === 13: equal();
        break;
    }
    var data = document.querySelector('.btn[data="' + e.charCode + '"]');
    
    data.classList.add('clicked');
    setTimeout(function() {
        data.classList.remove('clicked')
    }, 300);
})