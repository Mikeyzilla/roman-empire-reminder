document.addEventListener("DOMContentLoaded", () => {
  const thinkDialogue = document.getElementById("thinkDialogue");
  const daysPopUpArea = document.getElementById("daysPopUpArea");
  const overlay = document.getElementById("overlay");
  const enterDayBox = document.getElementById("enterBox");
  const setDayButton = document.getElementById("setButton");

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

  setDayButton.addEventListener("click", async () => {
    const remainingDays = enterDayBox.value;
    try {
      const setRemainingDaysAttempt = await fetch('http://localhost:5000/setRemainingDays', {
        method: "POST",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
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
        alert("Failed to set reminder. Please try again.");
      }
    } catch (err) {
      console.log(err);
    }
  });
});

