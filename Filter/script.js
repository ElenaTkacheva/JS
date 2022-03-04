const list = document.querySelector('.list');
const items = document.querySelectorAll('.blocks__item');
const listItems = document.querySelectorAll('.list__item');

function filter() {
    list.addEventListener('click', event => {
        const targetId = event.target.dataset.id;
        const target = event.target;

        if(target.classList.contains('list__item')){
            listItems.forEach((listItem) =>
              listItem.classList.remove("active")
            );
            target.classList.add("active");
        }

        switch (targetId) {
          case "all":
              getItems('blocks__item');
            break;
          case "winter":
            getItems(targetId);
            break;
          case "spring":
            getItems(targetId);
            break;
          case "summer":
            getItems(targetId);
            break;
          case "fall":
            getItems(targetId);
            break;
        }
    })
}

filter();

function getItems(className) {
    items.forEach((item) => {
      if (item.classList.contains(className)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
}