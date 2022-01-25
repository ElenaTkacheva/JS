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
	let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']) {
    	const questionTemplate = `<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`; // шаблон для ответов

    	const answerHTML = questionTemplate
      			.replace("%answer%", answerText)
      			.replace("%number%", answerNumber); // замена %answer% на ответ и потом меняем метку %number% на ответ

    	listContainer.innerHTML = listContainer.innerHTML + answerHTML; // отображение ответа на странице (чтобы ответ не перезаписывался и выводился на экране только последний, добавляют весь список ответов listContainer)
    	answerNumber++;
  	}
}

// Функция проверки правильности ответа на вопрос
function checkAnswer() {

  	// находим выбранную радио кнопку
  	const checkedRadio = listContainer.querySelector(
    	'input[type="radio"]:checked'
  	);

  	// Если ответ не выбран - функция завершает свою работу
  	if (!checkedRadio) {
    	submitBtn.blur(); // вывод кнопки из фокуса
    	return;
  	}

	  // Узнаем номер ответа пользователя
  	const userAnswer = parseInt(checkedRadio.value); 

	  // Если ответ верен - увеличиваем счет
	  if (userAnswer === questions[questionIndex]['correct']) {
		  score++;
	  }

	  // проверяем бы ли этот вопрос последним
	  if (questionIndex !== (questions.length -1)) {
			questionIndex++; // увеличиваем индекс
			clearPage(); // очищаем страницу
			showQuestion(); // показываем следующий вопрос
			return; // функция завершила свою работу
	  	} else {
      		clearPage(); // очищаем страницу
		  	showResults(); // показываем результаты
    	}
} 

// Показываем результаты на странице
function showResults () {
	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`;

	// Формирование title и message
	let title, message;

	// Варианты заголовков и текстов
	if (score === questions.length) {
		title = "Поздравляем!!!! 🎓";
		message = "Вы ответили верно на все вопросы! 👍🔥";
	} else if ((score * 100)/ questions.length >= 50) {
		title = "Неплохой результат! 😉";
		message = "Вы дали более половины правильных ответов 👍";
	} else {
		title = "Стоит постараться 🙃";
		message = "Пока у вас меньше половины правильных ответов 🥺";
	}

	// Результат
	let result = `${score} из ${questions.length}`;

	// Финальный ответ, подставляем данные в шаблон 
	const finalMessage = resultsTemplate
								.replace('%title%', title)
								.replace('%message%', message)
								.replace('%result%', result);


	// Вывод результата на экран
	headerContainer.innerHTML = finalMessage;

	// Меняем кнопку на "Играть снова"
	submitBtn.blur();
	submitBtn.innerText = "Начать заново";
	submitBtn.onclick = () => history.go();
	
}

