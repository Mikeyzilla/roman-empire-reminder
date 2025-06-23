document.addEventListener("DOMContentLoaded", () => {
    const userNameField = document.getElementById("RomanID");
    const passwordField = document.getElementById("RomanPassword");
    const soldierDialogue = document.getElementById("dialogueBubble");
    const whereSignedIs = document.getElementById("signedArea");
    const stamp = document.getElementById("MoveOnButton");


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

    stamp.addEventListener("click", (e) => {
        e.preventDefault(); 

        if (userNameField.value.length >= 1 && passwordField.value.length >= 1) {
            whereSignedIs.textContent = "SIGNED";

            setTimeout(() => {
                window.location.href = "RomanEmpireMainPage.html";
            }, 2000);
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

        checkIfSigned();
    };

    const handlePasswordInput = () => {
        if (!userInteracted) {
            userInteracted = true;
            clearTimeout(introTimeout);
        }

        checkIfSigned();
    };

    userNameField.addEventListener("input", handleUsernameInput);
    passwordField.addEventListener("input", handlePasswordInput);
});

