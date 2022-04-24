// Аккордeон

const contents = document.querySelectorAll('.program-line__content');

contents.forEach((elem, index) => {
    const title = elem.querySelector('.program-line__title');
    const descr = elem.querySelector('.program-line__descr');

    descr.style.transition = 'height 0.3s';
    descr.style.overflow = 'hidden';

    title.addEventListener('click', () => {
         contents.forEach((cont, i) => {
           const descrN = cont.querySelector(
             ".program-line__descr"
           );
           if (i === index) {
             descrN.style.height = descrN.scrollHeight + 'px';
             return;
           } else {
             descrN.style.height = 0;
             descrN.classList.remove("active");
           }
         });
        descr.classList.toggle('active');
    })
})