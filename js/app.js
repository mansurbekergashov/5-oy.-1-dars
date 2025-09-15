const elCardTemplate = document.getElementById("cardTemp");
const elContainer = document.getElementById("container");
const elLoading = document.getElementById("loading");
const elError = document.getElementById("error");
const elForm = document.getElementById("form");
const elEditBtn = document.getElementById("editBtn");
const elAddBtn = document.getElementById("addBtn");
const elPrev = document.getElementById("prev");
const elNext = document.getElementById("next");
const elAddNewCar = document.getElementById("addNewCar");
const elUp = document.getElementById("up");


const limit = 20;
let skip = 5;


let editID = null;


// INIT
function init() {
    elLoading.style.display = "block";
    fetch(`https://json-api.uz/api/project/fn43/cars?skip=${skip}&limit=${limit}`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            ui(res.data);
        })
        .catch(() => {
            elError.classList.remove("hidden");
        })
        .finally(() => {
            elLoading.style.display = "none";
        })
}


// DELETE
function deleteEl(id) {
    elContainer.innerHTML = null;
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


// GET
function getById(id) {
    fetch(`https://json-api.uz/api/project/fn43/cars/${id}`)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            fill(res)
        })
        .catch(() => {
        })
        .finally(() => {
        })
}


// ADD
function addEl(newEl) {
    elContainer.innerHTML = null;
    fetch(`https://json-api.uz/api/project/fn43/cars`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEl),
        })
        .then((res) => {
            alert("Ma'lumot muvaffaqiyatli qo'shildi")
            init();
        })
        .catch(() => {
            console.log("Xatolik");

        })
        .finally(() => {
        })
}


// EDIT
function editEl(editedEl) {
    elContainer.innerHTML = null;
    fetch(`https://json-api.uz/api/project/fn43/cars/${editedEl.id}`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedEl),
        })
        .then((res) => {
            alert("Ma'lumot muvaffaqiyatli yangilandi")
            init();
        })
        .catch(() => {

        })
        .finally(() => {
        })
}


// FILL
function fill(obj) {
    elForm.name.value = obj.name;
    elForm.description.value = obj.description;
    elForm.category.value = obj.category;
    elForm.brand.value = obj.brand;
    elForm.price.value = obj.price;

}


init();

// UI
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
        const elEditBtn = clone.querySelector(".edit-btn");

        elTitle.innerText = element.name;
        elDescription.innerText = element.description;
        elCategory.innerText = element.category;
        elPrice.innerText = `Narxi: $${element.price}`;
        elBrand.innerText = element.brand;
        elDeleteBtn.id = element.id;
        elEditBtn.id = element.id;

        elContainer.append(clone);
    });
};



document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("delete-btn")) {
        const id = evt.target.id;
        deleteEl(id)
    }

    if (evt.target.classList.contains("edit-btn")) {
        elForm.classList.remove("hidden");
        elUp.classList.remove("hidden");
        getById(evt.target.id);
        editID = evt.target.id;
        elAddBtn.style.display = "none";
        elEditBtn.style.display = "inline";

    }
});


elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(elForm);
    const result = {};
    formData.forEach((value, key) => {
        result[key] = value;
    });

    if (evt.submitter.id === "addB") {
        addEl(result)
    }

    if (evt.submitter.id === "editBtn") {
        if (editID) {
            result.id = editID;
            editEl(result);
            editID = null;
            elForm.classList.remove("hidden");
            elUp.classList.remove("hidden");
        }
    }

    elForm.reset();

});


// PAGINATION
elNext.addEventListener("click", () => {
    elContainer.innerHTML = "";
    skip += limit;
    init();

});

elNext.addEventListener("click", () => {
    elContainer.innerHTML = "";
    if (skip > 0) {
        skip -= limit;
        init();
    }

});



// ADD NEW CAR

elAddNewCar.addEventListener("click", ()=>{
    elForm.classList.remove("hidden");
    elUp.classList.remove("hidden");
});

elUp.addEventListener("click",()=>{
    elForm.classList.add("hidden")
    elUp.classList.add("hidden")
})