// форма открытия модального окна

const sendForm = () => {
  const btnOpenModal = document.querySelector(".card-details__button_delivery"); // кнопка "Купить с доставкой"
  const cardDetailsTitle = document.querySelector(".card-details__title"); // название продукта на странице
  const modal = document.querySelector(".modal"); // модальное окно
  const modalTitle = document.querySelector(".modal__title"); // название в модальном окне
  const modalClose = document.querySelector(".modal__close"); // кнопка для закрытия модального окна
  const modalForm = document.querySelector("form"); // получение формы из модального окна

  btnOpenModal.addEventListener("click", () => {
    modal.style.display = "flex";
    modalTitle.textContent = cardDetailsTitle.textContent; // переопределение названия в модальном окне на название товара со страницы
  });

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  }); // закрытие модального окна

  modalForm.addEventListener("submit", (event) => {
    event.preventDefault(); // отмена перезагрузки страницы при нажатии submit

    const labels = modal.querySelectorAll(".modal__label"); // получение всех labels формы

    const sendMessage = {}; // создаем пустой объект

    labels.forEach((label) => {
      const span = label.querySelector("span");
      const input = label.querySelector("input");
      sendMessage[span.textContent] = input.value;
    });

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(sendMessage), // добавляем наш объект и переводим его в формат JSON
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      console.log("Отправлено!");
    });
  }); // post запрос (метод Fetch с post запросом)
}

sendForm();