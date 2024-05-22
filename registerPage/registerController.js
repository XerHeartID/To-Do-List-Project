document.getElementById("registerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    const registerButton = document.querySelector("#register-button");

    registerButton.onclick = () => {
        localStorage.setItem("username", username.value);
        localStorage.setItem("password", password.value);

        alert("User Succesfully Registered");
        window.location.href = "index.html";

        console.log("user registered!");
        console.log(eachUsers);
    }
})