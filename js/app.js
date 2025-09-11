const elCardTemplate = document.getElementById("cardTemp");
const elContainer = document.getElementById("container");
const elLoading = document.getElementById("loading");
const elError = document.getElementById("error");



function init() {
    elLoading.style.display = "block";
    fetch("https://json-api.uz/api/project/fn43/cars")
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            ui(res.data);
        })
        .catch(() => {
            console.log("Xatolik");
            elError.classList.remove("hidden");
        })
        .finally(() => {
            elLoading.style.display = "none";
        })
}

init();


function deleteEl(id) {
    elLoading.style.display = "block";
    fetch(`https://json-api.uz/api/project/fn43/cars/${id}`, { method: "DELETE", })
        .then((res) => {
            init();
        })
        .then((res) => {
        })
        .catch(() => {
        })
        .finally(() => {
        })
}

// function openEl(id) {
//     elLoading.style.display = "block";
//     window.open(`https://json-api.uz/api/project/fn43/cars/${id}`, "_blank");

// }



function ui(cars) {
    elContainer.innerHTML = "";
    cars.forEach(element => {
        const clone = elCardTemplate.cloneNode(true).content;
        const elTitle = clone.querySelector("h2");
        const elBrand = clone.querySelector("h3");
        const elDescription = clone.querySelector("p");
        const elCategory = clone.querySelector("mark");
        const elPrice = clone.querySelector("i");
        const elDeleteBtn = clone.querySelector(".delete-btn");
        // const elOpenBtn = clone.querySelector(".open-btn");

        elTitle.innerText = element.name;
        elDescription.innerText = element.description;
        elCategory.innerText = element.category;
        elPrice.innerText = `Narxi: $${element.price}`;
        elBrand.innerText = element.brand;
        elDeleteBtn.id = element.id;
        // elOpenBtn.id = element.id;

        elContainer.append(clone);
    });
};



document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("delete-btn")) {
        const id = evt.target.id;
        deleteEl(id)
    }
});

// document.addEventListener("click", (evt) => {
//     if (evt.target.classList.contains("open-btn")) {
//         const id = evt.target.id;
//         openEl(id)
//     }
// });