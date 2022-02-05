const area = document.querySelector("#area"); // игровая площадь
let move = 0; // переменная хода
let res = ''; // результат
const contentWrapper = document.querySelector('#content'); // в него передается результат
const modalResult = document.querySelector('#modal-result-wrapper'); // модальное окно
const overlay = document.querySelector("#overlay"); // overlay
const button = document.querySelector("#btn-close"); // close button


// проверка, кликнули ли по игровому полю или нет
// далее определение чей ход (X или 0)
area.addEventListener('click', e => {
    if (e.target.className = 'box') {
        move % 2 === 0 ? e.target.innerHTML = 'X' : e.target.innerHTML = '0';
        move ++;
        check(); // проверка результаты игры
    }
})

const check = () => {
    // объявляем переменную в которой будут лежать все box
    const boxes = document.querySelectorAll('.box');
    const arr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]; // выиграшные комбинации
    for(i = 0; i < arr.length; i++) {
      // проверка на номер ячейки
        if (
            boxes[arr[i][0]].innerHTML == "X" &&
            boxes[arr[i][1]].innerHTML == "X" &&
            boxes[arr[i][2]].innerHTML == "X"
        ) {
            res = 'X';
            prepareResult(res);
        } else if (
            boxes[arr[i][0]].innerHTML == "0" &&
            boxes[arr[i][1]].innerHTML == "0" &&
            boxes[arr[i][2]].innerHTML == "0"
        ) {
            res = '0';
            prepareResult(res);
        }
    }
}

// вывод победителя в модальное окно
const prepareResult = (winner) => {
    contentWrapper.innerHTML = `WIN ${winner} !`;
    modalResult.style.display = 'block';
}

// закрытие модального окна
const closeModal = () => {
    modalResult.style.display = "none";
    location.reload(); // перезагрузка страницы
}

// overlay
overlay.addEventListener('click', closeModal);
button.addEventListener('click', closeModal);