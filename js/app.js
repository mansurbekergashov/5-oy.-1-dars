const elCardTemplate = document.getElementById("cardTemp");
const elContainer = document.getElementById("container");
const elLoading = document.getElementById("loading");
// const elError = document.getElementById("error");




fetch("https://json-api.uz/api/project/fn43/cars")
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        ui(res.data);
    })
    .catch(() => {
        console.log("Xatolik");
        // elError.classList.remove("hidden");
    })
    .finally(() => {
        elLoading.remove()
    })


function ui(cars) {
    cars.forEach(element => {
        const clone = elCardTemplate.cloneNode(true).content;
        const elTitle = clone.querySelector("h2");
        const elBrand = clone.querySelector("h3");
        const elDescription = clone.querySelector("p");
        const elCategory = clone.querySelector("mark");
        const elPrice = clone.querySelector("i");

        elTitle.innerText = element.name;
        elDescription.innerText = element.description;
        elCategory.innerText = element.category;
        elPrice.innerText = element.price;
        elBrand.innerText = element.brand;

        elContainer.append(clone);
    });
};