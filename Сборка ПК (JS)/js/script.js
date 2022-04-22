// Аккордeон

const contents = document.querySelectorAll('.program-line__content');

contents.forEach((elem, index) => {
    const title = elem.querySelector('.program-line__title');
    const descr = elem.querySelector('.program-line__descr');

    title.addEventListener('click', () => {
         contents.forEach((cont, i) => {
           const descrN = cont.querySelector(
             ".program-line__descr"
           );
           if (i === index) {
             return;
           } else {
             descrN.classList.remove("active");
           }
         });
        descr.classList.toggle('active');
    })
})