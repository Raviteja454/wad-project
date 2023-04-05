let users = [];

// Load users from JSON file
fetch("users.json")
    .then(response => response.json())
    .then(data => users = data);

// Function to sign in a user
function signIn(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Check if user exists and password is correct
    let user = users.find(user => user.username === username && user.password === password);
    if (user) {
        // Save current user to JSON file
        user.isLoggedIn = true;
        saveUsersToJSON();

        // Redirect to home page
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password.");
    }
}

// Function to sign up a user
function signUp(event) {
    event.preventDefault();

    let newUsername = document.getElementById("new-username").value;
    let newPassword = document.getElementById("new-password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    // Check if username is available
    if (users.some(user => user.username === newUsername)) {
        alert("Username already taken.");
        return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Add new user to array and save to JSON file
    let newUser = {
        username: newUsername,
        password: newPassword,
        isLoggedIn: true
    };
    users.push(newUser);
    saveUsersToJSON();

    // Redirect to home page
    window.location.href = "home.html";
}

// Function to save users array to JSON file
function saveUsersToJSON() {
    fetch("save-users.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(users)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}
