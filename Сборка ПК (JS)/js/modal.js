"use strict";

const modalBtn = document.querySelector(".modal__button");
const modal = document.querySelector(".modal");
const courseBtn = document.querySelector(".course__button");
const modalInner = modal.querySelector(".modal__inner");

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

modalInner.style.position = "relative";

// Новый элемент крестик
const xBtn = document.createElement("div");
xBtn.innerHTML =
  '<span class="iconify" data-icon="emojione-monotone:cross-mark"></span>';
xBtn.style.cssText = `
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

// Вставка крестика в modalInner перед другими элементами
modalInner.prepend(xBtn);

// Закрытие окна на крестик
xBtn.addEventListener("click", () => {
  modal.style.display = "";
});



