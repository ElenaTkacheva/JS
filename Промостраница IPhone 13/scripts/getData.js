const getData = () => {

    const list = document.querySelector(".cross-sell__list"); // массив карточек товаров
    const btn = document.querySelector(".cross-sell__add"); // кнопка "Показать еще"

    let stack = 4; // по скольку карточек будет выводится за один раз
    let count = 1; // круг (тур) вывода карточек

    const render = (data) => {
        list.innerHTML = '';

        data.forEach(item => {
            list.insertAdjacentHTML(
              "beforeend",
              `
                <li>
					<article class="cross-sell__item">
						<img class="cross-sell__image" src="./${item.photo}" alt="${item.id}">
						<h3 class="cross-sell__title">${item.name}</h3>
						<p class="cross-sell__price">${item.price}₽</p>
						<button type="button" class="button button_buy cross-sell__button">Купить</button>
					</article>
				</li>
            `
            );
        })
    }

    const sliceArray = (data, index) => {
        return data.slice(0, index); // отрезание data вывода
    }

    const changeData = (data) => {
        const newStack = stack * count;
        render(sliceArray(data, newStack)); // изменение data вывода по 4 карточки

        if (data.length > newStack) {
            count++;
        } else {
            btn.style.display = 'none'; // убирать кнопку "Показать еще"
        } // проверка вывода данных
    } // прием массива данных

    const getGoods = () => {
        fetch("/cross-sell-dbase/dbase.json")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Данные были получены с ошибкой!");
                }
            })
            .then((data) => {
                changeData(data);
            })
            .catch((error) => {
                console.error(error.message); // передача в fetch всего массива данных
            });
            // .finally(() => {
                // console.log('finally'); // этот метод отрабатывается в любом случае (есть ошибка или нет)
            // })
    };

    btn.addEventListener('click', getGoods);

    getGoods();
}

getData();