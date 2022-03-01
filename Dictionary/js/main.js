// объявление переменных
const engWord = document.getElementById('eng'),
      rusWord = document.getElementById('rus'),
      inputs = document.getElementsByClassName('input'),
      addButton = document.getElementById('add-word-btn'),
      table = document.getElementById('table');

let words;
let btnsDelete;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));


// шаблон разметки добавления слов
const addWordToTable = index => {
    table.innerHTML += `
        <tr class="tr">
            <td class="eng-word">${words[index].english}</td>
            <td class="rus-word">${words[index].russian}</td>
            <td><button class="btn-delete"></button></td>
        </tr>
    `
}

words.forEach((element, i) => {
    addWordToTable(i);
});

// добавление слов в таблицу
addButton.addEventListener('click', () => {
    if(
        engWord.value.length < 1 ||
        rusWord.value.length < 1 ||
        !isNaN(engWord.length) ||
        !isNaN(rusWord.length)
    ) {
        for(let key of inputs) {
            key.classList.add('error');
        }
    } else {
        for (let key of inputs) {
          key.classList.remove("error");
        }
        words.push(new CreateWord(engWord.value, rusWord.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length-1);
        engWord.value = "";
        rusWord.value = "";
    }
})


// функция-конструктор
function CreateWord(english, russian) {
    this.english = english;
    this.russian = russian;
}

// нахождение того ряда слов, который надо удалить
const deleteWord = e => {
    const rowIndex = e.target.parentNode.parentNode.rowIndex;
    e.target.parentNode.parentNode.parentNode.remove();
    words.splice(rowIndex, 1);
    // изменение local storage после удаления слов
    localStorage.removeItem('words');
    localStorage.setItem("words", JSON.stringify(words));
}


// проверка, есть ли кнопка удаления слов
const addEventDelete = () => {
    if(words.length > 0) {
        btnsDelete = document.querySelectorAll('.btn-delete');
        for(let btn of btnsDelete) {
            btn.addEventListener('click', e => {
                deleteWord(e);
            })
        }
    }
}

addEventDelete();