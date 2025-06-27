const { response } = require("express");

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
   
   submitButton.addEventListener("click", async (event) => {
      if (processStage === 0) {
         enteredUserName = inputField.value;
         if (enteredPassword == null) {
            alert("You must enter a username!!");
            return;
         }
         try {
            const userNameAttempt = await fetch('http://localhost:5000/getUserName', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ username: enteredUserName })
            });
            if (userNameAttempt.ok) {
               const data = await userNameAttempt.json();
               alert("Success! We found a username in our system that matches.")
            } else {
               const error = await userNameAttempt.json();
               alert("There wasn't a username in our system with that name."); 
            }
         } catch (err) {
            console.log(err);
         }
      popUpWindow.style.visibility = "hidden";
      overlay.style.visibility = "hidden"; 
      emperorText.textContent = "Very well. Do you know the secret code?";
      setTimeout(() => {
            nameLabel.textContent = "Enter your secret code below.";
            inputField.value = "";
            inputField.type = "password";
            submitButton.textContent = "CONFIRM";
            popUpWindow.style.visibility = "visible";
            overlay.style.visibility = "visible"; 
         }, 4000); 
         processStage = 1;
       } else if (processStage === 1) {
         enteredPassword = inputField.value;

         if (enteredPassword === "") {
            alert("Please enter a password.");
            return;
         }
         console.log(enteredPassword);
         processStage = 2;
      } else if (processStage === 2) {
         try {
            const loginAttempt = await fetch('http://localhost:5000/login', {
               method: 'POST',
               credentials: 'include',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({ username: enteredUserName, password: enteredPassword })
            });
            const loginResponse = await response.json();
            if (loginResponse.ok) {
               popUpWindow.style.visibility = "hidden";
               overlay.style.visibility = "hidden"; 
               emperorText.textContent = "Congratulations, I do know you. Welcome in";
               setTimeout(() => {
                  window.location.href = "RomanEmpireMainPage.html";
               }, 4000); 
            } else {
               return response.status(400).json({Error: "There was an error with logging in."});
            }
         } catch(err) {
            return response.status(400).json({err});
         }
      }
   });
});