document.addEventListener("DOMContentLoaded", () => {
  const thinkDialogue = document.getElementById("thinkDialogue");
  const daysPopUpArea = document.getElementById("daysPopUpArea");
  const overlay = document.getElementById("overlay");
  const enterDayBox = document.getElementById("enterBox");
  const setDayButton = document.getElementById("setButton");
  const backHome = document.getElementById("MainLink");

  setTimeout(() => {
    thinkDialogue.textContent = "I'm in the perfect place to set a reminder! All I have to do is enter the amount of days I want to set before the next time I log in!";
    thinkDialogue.style.top = "24%";
    thinkDialogue.style.right = "26%";
    thinkDialogue.style.fontSize = "17px";
  }, 4000);

  setTimeout(() => {
    daysPopUpArea.style.visibility = "visible";
    overlay.style.visibility = "visible";
  }, 8000);

  backHome.addEventListener("click", () => {
    window.location.href = "RomanEmpireMainPage.html";
  });

  setDayButton.addEventListener("click", async () => {
    const remainingDays = enterDayBox.value;

    const token = localStorage.getItem("romanEmpireToken");

    if (!token) {
      alert("You're not logged in!");
      window.location.href = "index.html";
      return;
    }

    try {
      const setRemainingDaysAttempt = await fetch("http://localhost:5000/setRemainingDays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ numberOfDays: remainingDays })
      });

      if (setRemainingDaysAttempt.ok) {
        const setRemainingResponse = await setRemainingDaysAttempt.json();
        daysPopUpArea.style.visibility = "hidden";
        overlay.style.visibility = "hidden";
        alert("Reminder set successfully for " + remainingDays + " days!");
        thinkDialogue.textContent = "Perfect! Now that it's set, as long as I log in before that time, I'll keep being reminded about our awesome Empire!";
        setTimeout(() => {
          thinkDialogue.textContent = "I can't imagine what'd happen if I missed the reminder though....";
          thinkDialogue.style.top = "26%";
          thinkDialogue.style.right = "27%";
        }, 6000);
      } else {
        if (setRemainingDaysAttempt.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("romanEmpireToken");
          window.location.href = "index.html";
        } else {
          alert("Failed to set reminder. Please try again.");
        }
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error—please try again.");
    }
  });
});


