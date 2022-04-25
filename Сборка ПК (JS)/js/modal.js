const modal = () => {
  const modalBtn = document.querySelector(".modal__button");
  const modal = document.querySelector(".modal");
  const modalInner = modal.querySelector(".modal__inner");
  const courseBtn = document.querySelector(".course__button");

  // Добавление позиции relative для родителя, чтобы спозиционировать крестик правильно
  modalInner.style.position = "relative";

  // Добавляем крестик на модальное окно
  const addCloseBtn = () => {
    const closeBtn = document.createElement("div");

    // Стили для закрывающего крестика
    closeBtn.classList.add("close-button");
    closeBtn.innerHTML = "&times";
    closeBtn.style.position = "absolute";
    closeBtn.style.right = "20px";
    closeBtn.style.top = "10px";
    closeBtn.style.whidth = "50px";
    closeBtn.style.height = "50px";
    closeBtn.style.fontSize = "50px";
    closeBtn.style.padding = "5px";
    closeBtn.style.display = "flex";
    closeBtn.style.justifyContent = "center";
    closeBtn.style.alignItems = "center";
    closeBtn.style.cursor = "pointer";

    // Вставка крестика в modalInner перед другими элементами
    modalInner.append(closeBtn);

    // Закрытие окна на крестик
    closeBtn.addEventListener("click", () => {
      modal.style.display = "";
    });
  };

  // Появление модального окна по кнопке "Оставить заявку"
  modalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
  // Появление модального окна по кнопке "Заказать курс"
  courseBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
  // Закрытие модального окна по клику вне зоны модального окна
  modal.addEventListener("click", (event) => {
    const modalContent = event.target.closest(".modal__inner");

    if (!modalContent) {
      modal.style.display = "";
    }
  });
  addCloseBtn();
};

modal();



