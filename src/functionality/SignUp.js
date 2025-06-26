document.addEventListener("DOMContentLoaded", () => {
    const userNameField = document.getElementById("RomanID");
    const passwordField = document.getElementById("RomanPassword");
    const soldierDialogue = document.getElementById("dialogueBubble");
    const whereSignedIs = document.getElementById("signedArea");
    const stamp = document.getElementById("MoveOnButton");
    const passwordStrengthLabel = document.getElementById("passwordStrengthLabel")
    const userNameStrengthLabel = document.getElementById("userNameStrengthLabel")

    let userInteracted = false;

    const introTimeout = setTimeout(() => {
        if (!userInteracted) {
            soldierDialogue.textContent = "Join the Legion! Give me your name!";
            soldierDialogue.style.top = "24%";
            soldierDialogue.style.left = "16%";
            soldierDialogue.style.width = "165px";
            soldierDialogue.style.fontSize = "15px";
        }
    }, 5000);

    const checkIfSigned = () => {
        if (userNameField.value.length >= 1 && passwordField.value.length >= 1) {
            soldierDialogue.textContent = "Excellent work! Click the stamp below and get out of my sight!";
            soldierDialogue.style.top = "27%";
            soldierDialogue.style.width = "180px";
            soldierDialogue.style.fontSize = "13px";
            whereSignedIs.textContent = "SIGNED";
        }
    };

    stamp.addEventListener("click", async (event) => {
        event.preventDefault(); 

        if (userNameField.value.length >= 1 && passwordField.value.length >= 1) {

            try {
                const newUserName = userNameField.value;
                const newPassword = passwordField.value;
            
                const response = await fetch('http://localhost:5000/register', { //fetch needs the exact url not relative url
                    method: 'POST',
                    credentials: 'include', //needs this for sessions, makes it so that the cookies are being sent enabling server to keep track of log in
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: newUserName, password: newPassword }) //we had to change new user name to user name and new password to just password because that's what backend was expecting
                });

                const data = await response.json();

                if (response.ok) {
                    whereSignedIs.textContent = "SIGNED";
                    setTimeout(() => {
                        window.location.href = "RomanEmpireMainPage.html";
                    }, 2000);
                } else {
                    alert('Registration failed: ' + data.message || data.error);
                }
            } catch (err) {
                alert('Error: ' + err.message);
            }
        } else {
            soldierDialogue.textContent = "Halt! You forgot your name and / or password!";
            soldierDialogue.style.top = "28%";
            soldierDialogue.style.left = "14%";
            soldierDialogue.style.width = "200px";
        }
    });


   const handleUsernameInput = () => {
        if (!userInteracted) {
            userInteracted = true;
            clearTimeout(introTimeout);
        }

        if (userNameField.value.length >= 1) {
            soldierDialogue.textContent = "Very good recruit! Now Augustus requires your password!";
            soldierDialogue.style.top = "26%";
            soldierDialogue.style.left = "13%";
            soldierDialogue.style.width = "180px";
            soldierDialogue.style.fontSize = "15px";
        }

        strongUserNameChecker();
        checkIfSigned();
    };


    const handlePasswordInput = () => {
        if (!userInteracted) {
            userInteracted = true;
            clearTimeout(introTimeout);
        }

        if (strongPasswordChecker() == true && strongUserNameChecker() == true) {
            checkIfSigned();
        }

    };

    const strongUserNameChecker = () => {
        const userName = userNameField.value;
        if (userName.length <= 7) {
            userNameStrengthLabel.textContent = "Your name must be at least 8 characters long!"
            return false;
        } else {
            userNameStrengthLabel.textContent = "That's a great name!"
            userNameStrengthLabel.style.color = "Green";
            return true;
        }
    }

    const strongPasswordChecker = () => {
        const password = passwordField.value;

        if (password.length < 9) {
            passwordStrengthLabel.textContent = "You need a password that contains at least 9 characters";
            return false;
        } else if (!/[!@\$,%&*]/.test(password)) {
            passwordStrengthLabel.textContent = "Your password needs at least one special character (!, @, $, %, &, *)";
            return false;
        } else if (!/[A-Z]/.test(password)) {
            passwordStrengthLabel.textContent = "Your password needs at least one uppercase character";
            return false;
        } else {
            passwordStrengthLabel.textContent = "Your password is stronger than Arnold!";
            passwordStrengthLabel.style.color = "Green";
            return true;
        }
    };



    userNameField.addEventListener("input", handleUsernameInput);
    passwordField.addEventListener("input", handlePasswordInput);
});


