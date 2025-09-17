const elForm = document.getElementById("form");
const elMessageBox = document.getElementById("messageBox");




function login(obj) {
    fetch("https://json-api.uz/api/project/fn43/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            return res.json();

        })
        .then((res) => {
            localStorage.setItem("token", res.access_token);
            location.href = "/index.html";
        })
        .catch(() => {
            console.log("Xatolik");
        })
        .finally(() => {

        })
}


function validation(obj) {
    if (obj.username.trim() === "") {
        return {
            target: "username",
            message: "Iltimos login kiriting"
        }
    }

    if (obj.password.trim() === "") {
        return {
            target: "password",
            message: "Iltimos parol kiriting"
        }
    }

    return false;
}



elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const formData = new FormData(elForm);
    const result = {};

    formData.forEach((value, key) => {
        result[key] = value;
    });


    const check = validation(result);

    if (check) {
        elForm[check.target].focus();
        const p = document.createElement("p");
        p.innerText = check.message;

        elMessageBox.append(p);

        setTimeout(() => {
            p.remove()

        }, 2000);
    } else {
        login(result)
    }

});
