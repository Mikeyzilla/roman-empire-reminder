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
   }, 1000); //make it five once page is completely working
   
   submitButton.addEventListener("click", async (event) => {
       if (processStage === 0) {
         enteredUserName = inputField.value;
         if (enteredPassword == null) {
            alert("You must enter a username!!");
            return;
         }
         //maybe add some sort of check to verify that there is a username that exists within our system with the one entered.
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
               //hide the modal first, then show the text. 
               emperorText.textContent = "Congratulations, I do know you. Welcome in";
               //Wait a few seconds, then redirect the user to the main page.
            }
         } catch(err) {

         }
      }
   });
});