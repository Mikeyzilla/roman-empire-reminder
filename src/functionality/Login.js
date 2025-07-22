document.addEventListener("DOMContentLoaded", () => {
  const popUpWindow = document.getElementById("loginPopup");
  const overlay = document.getElementById("overlay");
  const submitButton = document.getElementById("nextButton");
  const inputField = document.getElementById("enterField");
  const emperorText = document.getElementById("EmperorSpeech");
  const nameLabel = document.getElementById("nameLabel");

  let processStage = 0;
  let enteredUserName = "";
  let enteredPassword = "";

  
  setTimeout(() => {
    popUpWindow.style.visibility = "visible";
    overlay.style.visibility = "visible";
  }, 4000);

  submitButton.addEventListener("click", async () => {
    if (processStage === 0) {
     
      enteredUserName = inputField.value.trim();
      if (!enteredUserName) {
        alert("You must enter a username!");
        return;
      }

      try {
        const userNameAttempt = await fetch("http://localhost:5000/getUserName", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: enteredUserName })
        });

        if (userNameAttempt.ok) {
          alert("Success! We found a username in our system.");
        } else {
          alert("There wasn't a username in our system with that name.");
          return;
        }
      } catch (err) {
        console.error("Error checking username:", err);
        alert("Network error—please try again.");
        return;
      }

     
      popUpWindow.style.visibility = "hidden";
      overlay.style.visibility = "hidden";
      emperorText.textContent = "Very well. Do you know the secret code?";

      setTimeout(() => {
        nameLabel.textContent = "Enter your secret code below:";
        inputField.value = "";
        inputField.type = "password";
        submitButton.textContent = "LOGIN";
        popUpWindow.style.visibility = "visible";
        overlay.style.visibility = "visible";
      }, 4000);

      processStage = 1;

    } else if (processStage === 1) {
    
      enteredPassword = inputField.value;
      if (!enteredPassword) {
        alert("Please enter a password.");
        return;
      }

      try {
        const loginAttempt = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: enteredUserName,
            password: enteredPassword
          })
        });

        if (loginAttempt.ok) {
          const { token } = await loginAttempt.json();   

          localStorage.setItem("romanEmpireToken", token);

          popUpWindow.style.visibility = "hidden";
          overlay.style.visibility = "hidden";
          emperorText.textContent = "Congratulations, I do know you. Welcome in";

          setTimeout(() => {
            window.location.href = "RomanEmpireMainPage.html";
          }, 4000);

        } else {
          const err = await loginAttempt.json();
          alert(err.error || "Login failed—check your credentials.");
        }

      } catch (err) {
        console.error("Login error:", err);
        alert("Network error—please try again.");
      }
    }
  });
});
