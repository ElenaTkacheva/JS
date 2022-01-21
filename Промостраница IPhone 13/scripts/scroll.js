const links = document.querySelectorAll(".header-menu__item a");

seamless.polyfill(); // метод для скролла в сафари

links.forEach((element) => {
    element.addEventListener('click', (event) => {
        event.preventDefault();

        const id = element.getAttribute('href').substring(1);
        const section = document.getElementById(id);
        
        if(section) {
            seamless.elementScrollIntoView(section, {
              behavior: "smooth",
              block: "start",
            });
        } else {
            seamless.elementScrollIntoView(
              document.querySelector("#characteristics"),
              {
                behavior: "smooth",
                block: "center",
                inline: "center",
              }
            );
        }
        
    }) 
})

