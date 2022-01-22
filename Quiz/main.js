const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

// Находим элементы 
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Переменные игры
let score = 0; // количество правильных ответов 
let questionIndex = 0; // текущий вопрос

// очищаем все данные, приравнивая их к пустой строке
function clearPage() {
	headerContainer.innerHTML = "";
  	listContainer.innerHTML = "";
}

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer; // обращаемся к кнопке, для проверки на правильность ответа

// отображаем текущий вопрос
function showQuestion() {
	// вопрос
	const headerTemplate = `<h2 class="title">%title%</h2>`; // шаблон для заголовка 
	const title = headerTemplate.replace("%title%", questions[questionIndex]["question"]); // замена %title% на вопрос

	headerContainer.innerHTML = title; // отображение на странице

	// варианты ответов
	for (answerText of questions[questionIndex]['answers']) {
    const questionTemplate = `<li>
				<label>
					<input type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`; // шаблон для ответов

    const answerHTML = questionTemplate.replace("%answer%", answerText); // замена %answer% на ответ

    listContainer.innerHTML = listContainer.innerHTML + answerHTML; // отображение ответа на странице (чтобы ответ не перезаписывался и выводился на экране только последний, добавляют весь список ответов listContainer)
  }
}

function checkAnswer() {
	
}

