// создание переменных
const requestUrl = "https://api.tvmaze.com/search/shows?q=palace";
const dataWrapper = document.getElementById('data-wrapper');

// создание шаблона
const createTemplate = (data) => {

    // создание переменной genres
    let genres = [];
    // проверка, есть ли вообще genres
    if(data.show.genres.length) {
        genres = data.show.genres.reduce((acc, item) => {
            return acc + ', ' + item;
        })
    } else {
        genres = 'unknown';
    }


    return `
        <div class="data-item">
            <div class="image">
                <img src="${
                  data.show.image ? data.show.image.medium : " "
                }" alt="">
            </div>
            <div class="title"><span>Title: </span>${data.show.name}</div>
            <div><span>Score: </span>${
              data.show.rating.average ? data.show.rating.average : "unknown"
            }</div>
            <div><span>Genres: </span>${genres}</div>
            <div><span>Language: </span>${data.show.language}</div>
            <div>${data.show.summary ? data.show.summary : "unknown"}</div>
        </div>
    `;
}


// запрос на сервер
fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
        if(data) {
            data.forEach(item => {
                dataWrapper.innerHTML += createTemplate(item);
                console.log(data);
            });
        }
    })