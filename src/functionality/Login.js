document.addEventListener("DOMContentLoaded", () => {
   const popUpWindow = document.getElementById("loginPopup");
   const overlay = document.getElementById("overlay");
   const submitButton = document.getElementById("nextButton");
   const inputField = document.getElementById("enterField");
   const emperorText = document.getElementById("EmperorSpeech")
   let processStage = 0;
   let enteredUserName = "";
   let enteredPassword = "";

   setTimeout(() => {
      popUpWindow.style.visibility = "visible";
      overlay.style.visibility = "visible";
   }, 1000); //make it five once page is completely working
   
   submitButton.addEventListener("click", () => {
       if (processStage === 0) {
         enteredUserName = inputField.value;
         if (enteredPassword == null) {
            alert("You must enter a username!");
            return;
         }
         //maybe add some sort of check to verify that there is a username that exists within our system with the one entered.
         setTimeout(() => {
            popUpWindow.style.visibility = "hidden";
            overlay.style.visibility = "hidden"; 
            emperorText.style.textContent = "Very well. Do you know the secret code?"
         }, 8000);
         popUpWindow.style.visibility = "visible";
         overlay.style.visibility = "visible"; 
         nameLabel.textContent = "Now your password, citizen.";
         inputField.value = "";
         inputField.type = "password";
         submitButton.textContent = "CONTINUE";
         processStage = 1;
       } else if (processStage === 1) {
         enteredPassword = inputField.value;

         if (enteredPassword === "") {
            alert("Please enter a password.");
            return;
         }
         console.log(enteredPassword);
         submitButton.textContent = "CONFIRM"
         processStage = 2;
      } else if (processStage === 2) {
         //then, in processStage 2, perform the fetch request to login on the backend using the stored values from input.
         //Display some sort of confirmation and redirect the user to the main page.
      }
   });
});