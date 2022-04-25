const sendForm = () => {
  const form = document.querySelector(".modal");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = form.querySelector("input[type=text]");
    const tel = form.querySelector("input[type=tel]");
    const email = form.querySelector("input[type=email]");

    // Объект, который ввели в форму клиенты
    const sendObject = {
      name: text.value,
      phone: tel.value,
      email: email.value,
    };
    // Метод работы с сервисными запросами
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(sendObject),
      headers: {
        "Conten-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Not found");
        }
        return response.json();
      })
      .then((json) => console.log(json))
      .catch((error) => {
        alert("Error, data not found");
      })
      .finally(() => {
        form.reset();
      });
  });
};

sendForm();
