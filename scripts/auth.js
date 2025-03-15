async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        displayError("Username and password are required!");
        return;
    }

    try {
        
        const users = [
    { "username": "admin", "password": "admin123" },
    { "username": "user1", "password": "password1" },
    { "username": "user2", "password": "password2" }
];

        const validUser = users.find(user => user.username === username && user.password === password);

        if (validUser) {
            localStorage.setItem("authUser", username);
            window.location.href = "dashboard.html";
        } else {
            displayError("Invalid credentials! Please try again.");
        }
    } catch (error) {
        console.error("Error loading users:", error);
        displayError("Authentication failed. Please try again later.");
    }
}

function logout() {
    localStorage.removeItem("authUser");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const authUser = localStorage.getItem("authUser");
    if (!authUser && window.location.pathname !== "/index.html") {
        window.location.href = "index.html";
    }
});

function displayError(message) {
    const errorMessage = document.getElementById("error-message");
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.color = "red";
    }
}
