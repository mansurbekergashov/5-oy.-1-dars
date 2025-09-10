const elCardTemplate = document.getElementById("cardTemplate");
const elContainer = document.getElementById("container");
const elLoading = document.getElementById("loading");
const elError = document.getElementById("error");




fetch("https://json-api.uz/api/project/fn43/cars")
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        ui(res);
    })
    .catch(() => {
        console.log("Xatolik");
        elError.classList.remove("hidden");
    })
    .finally(() => {
        elLoading.remove()
    })

    
function ui(todos) {
    todos.forEach(element => {
        const clone = elCardTemplate.cloneNode(true).content;
        const elTitle = clone.querySelector("h2");
        const elButton = clone.querySelector("button");

        elTitle.innerText = element.title;
        elButton.innerText = element.completed ? "Ha" : "Yo'q";

        elContainer.append(clone);
    });
};